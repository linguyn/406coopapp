import express from 'express';
import { validateUserUpdate, validateListRequest, validatePermissions } from '../middleware/validation.js';
import { authenticateToken } from '../server.js';
import { USER_DETAILS, LIST_CRITERIA } from '../constants.js';
import Student from '../models/Student.js';
import Coordinator from '../models/Coordinator.js';
import Supervisor from '../models/Supervisor.js';
import Application from '../models/Application.js';
import { UserListItemResponse } from '../response-classes/UserListItemResponse.js';
import { UserResponse } from '../response-classes/UserResponse.js';
import Application from '../models/Application.js';

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
 *           enum:
 *             - student
 *             - supervisor
 *         description: Specifies which type of users to get 
 *         required: true
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           example: email
 *           default: firstName
 *           enum:
 *             - firstName
 *             - lastName
 *             - email
 *             - createdAt
 *             - applications
 *             - status
 *             - studentId
 *             - program
 *             - year
 *             - gpa
 *             - company
 *             - status
 *             - jobTitle
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
 *           enum:
 *             - asc
 *             - desc
 *         description: Specifies the list sorting order
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           example: applied
 *           enum:
 *             - applying
 *             - applied
 *             - offered
 *             - rejected
 *             - waitlisted
 *             - probation
 *             - searching
 *             - placed
 *             - active
 *             - inactive
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
        
        // Populate assignedApplication for students
        if (role === 'student') {
            await Model.populate(filteredSortedUsers, 'assignedApplication');
        }

        const sanitizedUsers = filteredSortedUsers.map((user) => {
            return UserListItemResponse.createUserListItemResponse(user);
        });
        
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
 * @api {PATCH} - /api/user/:role/:id
 * @description - Updates a user's information
 * @param id - Student id
 * @success {200} {Object} - Returns the updated student information
 * @error {400} {Object} - Invalid or missing status information
 * @error {401} {Object} - Student doesn't exist or missing authorization header
 * @errpr {403} {Object} - Forbidden, the calling user does not have permission
 * @error {500} {Object} - Internal server error
 */

userRouter.patch('/:role/:userId', authenticateToken, validateUserUpdate, async (req, res, next) => { //change this path to remove :userId as it would not be known to
    try {
        const { role, userId } = req.params;

        let Model;

        switch (role.toLowerCase()) {
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
                return res.status(400).json({ message: "Invalid type" });
        }

        const updatedInfo = await Model.findByIdAndUpdate(
            userId,
            req.update,
            {
                new: true,
                runValidators: true
            }
        );
        
        // TODO: return a cleaned version of updatedInfo

        if (!updatedInfo) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({
            user : updatedInfo
        });
    } catch (error) {
        console.error("PATCH Route Error:", error);
        return res.status(500).json({
            error: "something went wrong in userRouter.patch",
            details: error.message
        });
    }
});


/**
 * @api {GET} - /api/user/:id
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

userRouter.get('/:role/:email', authenticateToken, async(req, res) =>{
    try{
        const { role, email } = req.params;

        const user = await getUserByEmail(role, email);

        if (!user) return res.status(404).json({message: "User not found"});

        const sanitizedUser = UserResponse.createUserResponse(user);
        console.log("before if statement");
        
        if (user.role === "student") { const apps = await Application.find({assignedStudent: user._id});
            console.log("in the right path");
            return res.status(200).json({user: sanitizedUser, applications: apps});
   
        };
        
        return res.status(200).json(sanitizedUser);
    } catch(error){
        return res.status(500).json({error: "something went wrong in userRouter.get",
            details: error.message
        });
    }
}); 

export async function getUserByEmail(role, email) { //Can be moved to database services at a later time. Make sure to update all imports if moved. 
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
            return false;
    }
    
    const user = await Model.findOne({email: email});
    if (user && role === "student") { 
        await user.populate('assignedApplication');
    }
    return user;
}

userRouter.delete('/:role', authenticateToken, validatePermissions, async(req, res) => {
    try{
        const { role } = req.params;
        const { email } = req.body;

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
        const user = await Model.findOneAndDelete({email: email});

        if (!user) 
            return res.status(404).json({message: "User has already been deleted or does not exist."});

        return res.status(200).json({message: "User deleted successfully!", deletedUser: user});
    
    } catch(error){
        console.error("DELETE Route Error:", error);
        return res.status(500).json({error: "something went wrong in userRouter.delete",
            details: error.message
        });
    }
});