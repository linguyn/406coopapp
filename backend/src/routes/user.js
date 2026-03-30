import { getUserById, updateUserStatus, getSanitizedUser, getSanitizedUsers, getFilteredUsers } from '../database-services.js';
import express from 'express';
import { HTTPError } from '../errors.js'
import { validateStatusUpdate, validateListRequest } from '../middleware/validation.js';
import { authenticateToken } from '../server.js';
import { USER_DETAILS, LIST_CRITERIA } from '../constants.js';
import { UserResponse } from '../classes/UserResponse.js';
import Student from '../models/Student.js';
import Coordinator from '../models/Coordinator.js';
import Supervisor from '../models/Supervisor.js';

export const userRouter = express.Router();

/**
 * @api {GET} /api/user/list
 * @description Retrieves a filtered list of all users of a certain role based on queries with optional sorting
 * @query {String} role - The type of users. Options: "student", "applicant", "supervisor", or "coordinator"
 * @query {String} [searchStr] - Matches the search query to some searchable parameters (e.g. name, email, company, etc.)
 * @query {String} [sortBy] - The sorting criteria. Options: "email", "name"
 * @query {String} [order] - The sorting direction. Options: "asc", "desc"
 * @success {200} {Array} sortedUsers - The filtered and sorted list of users
 * @error {500} {Object} - Internal server error
 * @example
 *      GET /api/user/list?role=student&sortBy=studentId&order=desc&searchStr=.com
 */

userRouter.get('/list', authenticateToken, validateListRequest, (req, res, next) => {
    const { role, searchStr = "", sortBy = "name", order = "asc" } = req.query;

    // don't fail if optional params are malformed, just assign them to default values
    if (!LIST_CRITERIA.sorting.includes(sortBy)) { sortBy = "name"; }
    if (!LIST_CRITERIA.order.includes(order)) { order = "asc"; }

    try {
        // TODO: should validate the filters
        const exactFilters = extractExactFilters(role, req.query);
        const fuzzyFilters = USER_DETAILS.fuzzyFilters[role];
        const filteredUsers = getFilteredUsers(role, searchStr, exactFilters, fuzzyFilters);

        const sanitizedUsers = getSanitizedUsers(filteredUsers, USER_DETAILS.safeFields[role]);
        
        let reverse;
        if (order === "desc") { reverse = -1; }
        else { reverse = 1; }

        const sortedUsers = sanitizedUsers.toSorted((user1, user2) => {
            if (user1[sortBy] < user2[sortBy]) { return -1*reverse }
            if (user1[sortBy] > user2[sortBy]) { return 1*reverse }
            return 0;
        });

        return res.status(200).json(sortedUsers);
    } catch (error) { 
        next(error);
    }
});

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
 * @api {PATCH} - /api/user/student/:id/status
 * @description - Updates a student's status
 * @param id - Student id
 * @body {String} status - New student status. Options: "applying", "applied", "waitlisted", "rejected", etc.
 * @success {200} {Object} - Returns the updated student information
 * @error {400} {Object} - Invalid or missing status information
 * @error {401} {Object} - Student doesn't exist or missing authorization header
 * @errpr {403} {Object} - Forbidden, the calling user does not have permission
 * @error {500} {Object} - Internal server error
 */

userRouter.patch('/:role/:userId', authenticateToken, validateStatusUpdate, async(req, res, next) => {
   try{
   
        const { status, role, userId } = req.params;

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
        const updatedInfo = await Model.findByIdAndUpdate(
            userId,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );


        if (!updatedInfo){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json(updatedInfo);
    } catch(error){
        console.error("PATCH Route Error:", error);
        return res.status(500).json({error: "something went wrong in userRouter.patch",
            details: error.message
        });
    }
});

//Code below left commented to come back to if we want to use it. 
//     try {
//         const user = req.targetUser;
//         updateUserStatus(user, status);

//         const safeUser = getSanitizedUser(user, USER_DETAILS.safeFields[user.role]);
//         return res.status(200).json(safeUser);
//     } catch(error) {
//         next(error);
//     }
// });

userRouter.patch('/security', authenticateToken, (req, res) => {
    // TODO: update user email/password/other sensitive info

});

userRouter.patch('/:id/profile', authenticateToken, (req, res) => {
    // TODO: update user profile info

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
 * /api/user/{userId}:
 *   get:
 *     summary: Gets a user by id and returns a complete response depending on the user role
 *     tags: 
 *       - User
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *           example: 69c8b64485f072ea7f76da74
 *         required: true
 *         description: The user's unique identifier
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

// userRouter.get('/:userId', authenticateToken, (req, res, next) => {
//     try {
//         const id = req.params.userId;
//         if (!id) { throw new HTTPError("Missing userId parameter or invalid format", 422); }
//         const user = getUserById(id);
//         const safeUser = UserResponse.createUserResponse(user);
//         return res.status(200).json(safeUser);
//     } catch(error) { 
//         next(error); 
//     }
// });

userRouter.get('/:role/:userId', authenticateToken, async(req, res) =>{
    try{

        const {role, userId} = req.params;
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
        

        const document = await Model.findById(req.params.userId);

        if (!document) return res.status(404).json({message: "User not found"});
        res.status(200).json(document);
    } catch(error){
        return res.status(500).json({error: "something went wrong in userRouter.get",
            details: error.message
        });
    }
}); 