import express from 'express';
import { validateUserUpdate, validateListRequest, validatePermissions } from '../middleware/validation.js';
import { authenticateToken } from '../server.js';
import { USER_DETAILS, LIST_CRITERIA } from '../constants.js';
import Student from '../models/Student.js';
import Coordinator from '../models/Coordinator.js';
import Supervisor from '../models/Supervisor.js';
import Application from '../models/Application.js';
import ProgressForm from '../models/ProgressForm.js';
import Reflection from '../models/Reflection.js';
import { UserListItemResponse } from '../response-classes/UserListItemResponse.js';
import { UserResponse } from '../response-classes/UserResponse.js';
import { HTTPError } from '../errors.js'

export const userRouter = express.Router();

/**
 * @api {GET} /api/user/list
 * @description Retrieves a filtered list of all users of a certain role based on queries, with optional sorting
 * @query {String} role - The type of users. Options: "student" or "supervisor"
 * @query {String} [searchStr] - Matches the search query to some searchable parameters (e.g. firstName, lastName, email, company, etc.)
 * @query {String} [sortBy] - The sorting criteria.
 * @query {String} [order] - The sorting order. Options: "asc", "desc"
 * @success {200} {Array} sanitizedUsers - The filtered and sorted list of users
 * @error {500} {Object} - Internal server error
 * @example
 *      GET /api/user/list?role=student&sortBy=studentId&order=desc&searchStr=.com
 */

/**
 * @swagger
 * /api/user/list:
 *   get:
 *     summary: Gets a list of users
 *     description: Applies filters and sorting criteria from the path queries to the database and returns a list of sanitized users depending on their role. The main queries are role, sortBy, searchStr, and order. The rest of the queries specify fields with values that must exactly match those of the user. E.g. "status=applied" returns users who have the status value set to "applied".
 *     tags:
 *       - User
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           example: student
 *           enum: [student, supervisor]
 *         description: Specifies which type of users to get 
 *         required: true
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           example: email
 *           default: firstName
 *           enum: [firstName, lastName, email, createdAt, applications, status, studentId, program, year, gpa, company, status, jobTitle]
 *         description: Sort the list of users based on this value
 *       - in: query
 *         name: searchStr
 *         schema:
 *           type: string
 *           example: john
 *           default: ""
 *         description: Specifies a search string to filter the list of users
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           example: desc
 *           default: asc
 *           enum: [asc, desc]
 *         description: Specifies the list sorting order
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           example: applied
 *           enum: [applying, applied, offered, rejected, waitlisted, probation, searching, placed, active, inactive]
 *         description: Filters for an exact status (active and inactive belong to supervisor)
 *       - in: query
 *         name: program
 *         schema:
 *           type: string
 *           example: Computer Science
 *         description: Filters for an exact program (belongs to student/applicant)
 *       - in: query
 *         name: createdAt
 *         schema:
 *           type: string
 *           example: N/A
 *         description: Filters for an exact date
 *       - in: query
 *         name: gpa
 *         schema:
 *           type: string
 *           example: 3.22
 *         description: Filters for an exact gpa (belongs to student/applicant)
 *       - in: query
 *         name: year
 *         schema:
 *           type: number
 *           example: 2
 *           enum: [1, 2, 3, 4, 5]
 *         description: Filters for an exact year (belongs to student/applicant)
 *       - in: query
 *         name: location 
 *         schema:
 *           type: string
 *           example: Palo Alto
 *         description: Filters for an exact location
 *       - in: query
 *         name: isApplicant
 *         schema:
 *           type: boolean
 *           example: false
 *           enum: [true, false]
 *         description: Filters for applicant or student (belongs to student/applicant)
 *       - in: query
 *         name: jobTitle
 *         schema:
 *           type: string
 *           example: Consultant
 *         description: Filters for an exact job (belongs to supervisor)
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/StudentListRes'
 *                 - $ref: '#/components/schemas/ApplicantListRes'
 *                 - $ref: '#/components/schemas/SupervisorListRes'
 *             examples:
 *               student:
 *                 $ref: '#/components/examples/StudentListResEx'
 *               applicant:
 *                 $ref: '#/components/examples/ApplicantListResEx'
 *               supervisor:
 *                 $ref: '#/components/examples/SupervisorListResEx'
 *       500:
 *         description: Internal server error
 */

userRouter.get('/list', authenticateToken, validateListRequest, async (req, res, next) => {
    let { role, searchStr = "", sortBy = "firstName", order = "asc" } = req.query;

    // don't fail if optional params are malformed, just assign them to default values
    if (!(LIST_CRITERIA.sorting[role].includes(sortBy) || LIST_CRITERIA.sorting.general.includes(sortBy))) { sortBy = "firstName"; }
    if (!LIST_CRITERIA.order.includes(order)) { order = "asc"; }

    try {
        const exactFilters = extractExactFilters(role, req.query);
        const fuzzyFilters = USER_DETAILS.fuzzyFilters[role];

        const filterQuery = getFilterQuery(searchStr, exactFilters, fuzzyFilters);

        const Model = getModelByRole(role);
        const filteredSortedUsers = await Model.find(filterQuery).sort({ [sortBy] : order });

        const userPromises = filteredSortedUsers.map(async (user) => {
            const sanitizedUser = UserListItemResponse.createUserListItemResponse(user);

            if (user.role !== "student") {
                return {
                    user: sanitizedUser
                }
            } else {
                const applications = await Application.find({assignedStudent: user._id});
                const progressForms = await ProgressForm.find({assignedStudent: user._id});
                const reflections = await Reflection.find({assignedStudent: user._id});
                return {
                    user: sanitizedUser, 
                    applications : applications, 
                    progressForms : progressForms, 
                    reflections: reflections
                };
            }
        });

        const sanitizedUsers = await Promise.all(userPromises);
        
        return res.status(200).json(sanitizedUsers);
    } catch (error) {
        next(error);
    }
});

export function getModelByRole(role) {
    let Model;
    switch(role.toLowerCase()){
        case 'student':
            Model = Student;
            break;
        case 'coordinator':
            Model = Coordinator;
            break;
        case 'supervisor':
            Model = Supervisor;
            break;
        default:
            return res.status(400).json({message: "Invalid type"});
    }
    return Model;
}

// TODO: move this to a more appropriate place
function extractExactFilters(role, query) {
    const exactFilters = {};
    const allowedFilters = USER_DETAILS.exactFilters[role];
    allowedFilters.forEach((key) => {
        const queryValue = query[key];
        if (queryValue) {
            exactFilters[key] = queryValue;
        }
    });
    return exactFilters;
}

/**
 * @function getFilterQuery
 * @description Creates a query object for use on the database based on the provided search string, exact, and fuzzy filter options
 * @param {String} searchStr - the search string filter used to match users
 * @param {Object} exactFilters - the list of field filters used to exactly match fields in users
 * @param {Array} fuzzyFilterKeys - the list of field filters that are allowed to be matched with the search string filter
 * @returns a database query object
 */

function getFilterQuery(searchStr, exactFilters, fuzzyFilterKeys) {
    const query = { ...exactFilters };

    const hasSearch = searchStr && searchStr.trim().length > 0;

    if (hasSearch && fuzzyFilterKeys.length > 0) {
        // create a regex for the search string set to ignore case
        const searchRegex = new RegExp(searchStr.trim(), "i");

        query.$or = fuzzyFilterKeys.map((key) => {
            return { [key]: searchRegex }
        });
    }

    return query;
}

/**
 * @api {PATCH} - /api/user/:role/:userId
 * @description - Updates a user's information
 * @param id - Student id
 * @success {200} {Object} - Returns the updated student information
 * @error {400} {Object} - Invalid or missing status information
 * @error {401} {Object} - Student doesn't exist or missing authorization header
 * @errpr {403} {Object} - Forbidden, the calling user does not have permission
 * @error {500} {Object} - Internal server error
 */

/**
 * @swagger
 * /api/user/{role}/{userId}:
 *   patch:
 *     summary: Updates an existing user's information
 *     description: Finds a user by role and id and updates the fields specified
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: role
 *         schema:
 *           type: string
 *           example: student
 *           enum: [student, supervisor, coordinator]
 *         required: true
 *         description: The role of the user whose fields are being updated
 *       - in: path
 *         name: userId
 *         schema:
 *         required: true
 *         description: The object id of the user whose fields are being updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - $ref: '#/components/schemas/StudentSelfUpdateReq'
 *               - $ref: '#/components/schemas/SupervisorSelfUpdateReq'
 *               - $ref: '#/components/schemas/CoordinatorSelfUpdateReq'
 *               - $ref: '#/components/schemas/CoordinatorOnStudentUpdateReq'
 *               - $ref: '#/components/schemas/CoordinatorOnSupervisorUpdateReq'
 *           examples:
 *             studentSelf:
 *               $ref: '#/components/examples/StudentSelfUpdateReqEx'
 *             supervisorSelf:
 *               $ref: '#/components/examples/SupervisorSelfUpdateReqEx'
 *             coordinatorSelf:
 *               $ref: '#/components/examples/CoordinatorSelfUpdateReqEx'
 *             coordinatorOnStudent:
 *               $ref: '#/components/examples/CoordinatorOnStudentUpdateReqEx'
 *             coordinatorOnSupervisor:
 *               $ref: '#/components/examples/CoordinatorOnSupervisorUpdateReqEx'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/StudentRes'
 *                 - $ref: '#/components/schemas/SupervisorRes'
 *                 - $ref: '#/components/schemas/CoordinatorRes'
 *             examples:
 *               student:
 *                 $ref: '#/components/examples/StudentResEx'
 *               supervisor:
 *                 $ref: '#/components/examples/SupervisorResEx'
 *               coordinator:
 *                 $ref: '#/components/examples/CoordinatorResEx'
 *       400:
 *         description: Invalid role
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

userRouter.patch('/:role/:userId', authenticateToken, validateUserUpdate, async (req, res, next) => {
    try {
        const { role, userId } = req.params;

        const Model = getModelByRole(role);

        const updatedInfo = await Model.findByIdAndUpdate(
            userId,
            req.update,
            {
                new: true,
                runValidators: true
            }
        );
        
        const sanitizedUser = UserResponse.createUserResponse(updatedInfo);

        if (!updatedInfo) {
            throw new HTTPError("User not found", 404);
        }
        return res.status(200).json({
            user : sanitizedUser
        });
    } catch (error) {
        next(error);
    }
});


/**
 * @api {GET} - /api/user/:role/:email
 * @description Retrieves the user's information
 * @param id - User's id
 * @success {200} {Object} - Returns the user's information
 * @error {401} {Object} - User doesn't exist or missing authorization header
 */

/**
 * @swagger
 * /api/user/{role}/{email}:
 *   get:
 *     summary: Gets a user by role and email and returns a complete response depending on the role
 *     tags: 
 *       - User
 *     parameters:
 *       - in: path
 *         name: role
 *         schema:
 *           type: string
 *           example: student
 *           enum: [student, supervisor, coordinator]
 *         required: true
 *         description: The user's role
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *           example: jinwoo@sung.com
 *         required: true
 *         description: The user's email
 *     responses:
 *       200:
 *         description: Successfully retrieved the user
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/StudentRes' 
 *                 - $ref: '#/components/schemas/SupervisorRes' 
 *                 - $ref: '#/components/schemas/CoordinatorRes' 
 *             examples:
 *               student:
 *                 $ref: '#/components/examples/StudentResEx'
 *               supervisor:
 *                 $ref: '#/components/examples/SupervisorResEx'
 *               coordinator:
 *                 $ref: '#/components/examples/CoordinatorResEx'
 *       401:
 *         description: Missing the authorization header. Please include a valid access token
 *       404:
 *         description: User not found
 *       422:
 *         description: Missing userId parameter or invalid format
 *       500:
 *         description: Internal server error
 */

userRouter.get('/:role/:email', authenticateToken, async(req, res, next) =>{
    try{
        const { role, email } = req.params;

        const user = await getUserByEmail(role, email);

        if (!user) throw new HTTPError("User not found", 404);

        const sanitizedUser = UserResponse.createUserResponse(user);
        
        if (user.role === "student") {
            const applications = await Application.find({assignedStudent: user._id});
            const progressForms = await ProgressForm.find({assignedStudent: user._id});
            const reflections = await Reflection.find({assignedStudent: user._id});
            return res.status(200).json({user: sanitizedUser, applications : applications, progressForms : progressForms, reflections: reflections});
        }
        
        return res.status(200).json(sanitizedUser);
    } catch(error){
        next(error);
    }
}); 

export async function getUserByEmail(role, email) { //Can be moved to database services at a later time. Make sure to update all imports if moved. 
    const Model = getModelByRole(role);
    
    const user = await Model.findOne({email: email});
    return user;
}

export async function getUserByEmailAllRoles(email) {
    const normalizedEmail = String(email || "").trim().toLowerCase();
    if (!normalizedEmail) {
        return null;
    }

    const [student, supervisor, coordinator] = await Promise.all([
        Student.findOne({ email: normalizedEmail }),
        Supervisor.findOne({ email: normalizedEmail }),
        Coordinator.findOne({ email: normalizedEmail })
    ]);

    return student || supervisor || coordinator || null;
}

userRouter.delete('/:role', authenticateToken, validatePermissions, async(req, res, next) => {
    try{
        const { role } = req.params;
        const { email } = req.body;

        const Model = getModelByRole(role);

        const user = await Model.findOneAndDelete({email: email});

        if (!user) {
            throw new HTTPError("User has already been deleted or does not exist.", 404);
        }

        return res.status(200).json({message: "User deleted successfully!", deletedUser: user});
    } catch(error){
        next(error);
    }
});