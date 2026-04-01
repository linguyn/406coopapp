import express from 'express';
import { HTTPError } from '../errors.js'
import { validateStatusUpdate, validateListRequest, validatePermissions } from '../middleware/validation.js';
import { authenticateToken } from '../server.js';
import { USER_DETAILS, LIST_CRITERIA } from '../constants.js';
import Student from '../models/Student.js';
import Coordinator from '../models/Coordinator.js';
import Supervisor from '../models/Supervisor.js';
import { UserListItemResponse } from '../response-classes/UserListItemResponse.js';

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

userRouter.get('/list', authenticateToken, validateListRequest, async (req, res, next) => {
    let { role, searchStr = "", sortBy = "firstName", order = "asc" } = req.query;

    // don't fail if optional params are malformed, just assign them to default values
    if (!LIST_CRITERIA.sorting.includes(sortBy)) { sortBy = "firstName"; }
    if (!LIST_CRITERIA.order.includes(order)) { order = "asc"; }

    try {
        const exactFilters = extractExactFilters(role, req.query);
        const fuzzyFilters = USER_DETAILS.fuzzyFilters[role];

        // todo: separate filtering from database interaction so we can include filtered queries and sorting together
        const filterQuery = getFilterQuery(searchStr, exactFilters, fuzzyFilters);

        const Model = getModelByRole(role);
        const filteredSortedUsers = await Model.find(filterQuery).sort({ [sortBy] : order });

        const sanitizedUsers = filteredSortedUsers.map((user) => {
            return UserListItemResponse.createUserListItemResponse(user);
        });
        
        return res.status(200).json(sanitizedUsers);
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
 * @function getFilteredUsers
 * @description Retrieves a filtered list of users from the database. The filters are given by exactFilters, which
 *  contains the user fields (key/value) to exactly match and fuzzyFilterKeys, which is a list of user fields to try to fuzzy match with searchStr
 * @param {String} role - the user role type, which group of users to retrieve
 * @param {String} searchStr - the search query to match with certain user fields
 * @param {Object} exactFilters - user fields with specific values that have to exactly match a user
 * @param {Array} fuzzyFilterKeys - the list of user fields that are allowed to be matched with the searchStr
 * @returns a filtered list of users
 */

function getFilterQuery(searchStr, exactFilters, fuzzyFilterKeys) {
    const query = { ...exactFilters };

    const hasSearch = searchStr && searchStr.trim().length > 0;

    if (hasSearch && fuzzyFilterKeys.length > 0) {
        // create a regex for the search string set to ignore case
        const searchRegex = new RegExp(searchStr, "i");

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
 * @body {String} status - New student status. Options: "applying", "applied", "waitlisted", "rejected", etc.
 * @success {200} {Object} - Returns the updated student information
 * @error {400} {Object} - Invalid or missing status information
 * @error {401} {Object} - Student doesn't exist or missing authorization header
 * @errpr {403} {Object} - Forbidden, the calling user does not have permission
 * @error {500} {Object} - Internal server error
 */

userRouter.patch('/:role/:userId', authenticateToken, validateUserUpdate, async (req, res, next) => {
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
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedInfo) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updatedInfo);
    } catch (error) {
        console.error("PATCH Route Error:", error);
        return res.status(500).json({
            error: "something went wrong in userRouter.patch",
            details: error.message
        });
    }
});

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
            throw new HTTPError("Invalid role type");
    }
    const user = await Model.findOne({email: email});
    return user;
}

userRouter.get('/:role', authenticateToken, async(req, res) =>{
    try{
        const { role } = req.params;
        const { email } = req.body;

        const user = await getUserByEmail(role, email);

        if (!user) return res.status(404).json({message: "User not found"});
        res.status(200).json(user);
    } catch(error){
        return res.status(500).json({error: "something went wrong in userRouter.get",
            details: error.message
        });
    }
}); 

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

        res.status(200).json({message: "User deleted successfully!", deletedUser: user});
    
    } catch(error){
        console.error("DELETE Route Error:", error);
        return res.status(500).json({error: "something went wrong in userRouter.delete",
            details: error.message
        });
    }
});