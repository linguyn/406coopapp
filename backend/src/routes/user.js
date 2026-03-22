import { tempUsers, getUserById, updateUserStatus, getSafeUser } from '../database-services.js';
import express from 'express';
import { HTTPError } from '../errors.js'
import { validateStatusUpdate } from '../auth-middleware.js';
import { authenticateToken } from '../server.js';

export const userRouter = express.Router();

/**
 * @api {GET} /api/user/list
 * @description Retrieves a filtered list of users with optional sorting
 * @query {String} role - The type of users. Options: "students", "supervisors", or "coordinators"
 * @query {String} [sortBy] - The sorting criteria. Options: "studentId", "email", "name"
 * @query {String} [order] - The sorting direction. Options: "asc" or "desc"
 * @success {200} {Array} sortedUsers - The filtered and sorted list of users
 * @error {500} {Object} - Internal server error
 * @example
 *      GET /api/user/list?role=students&sortBy=studentId&order=desc
 */

userRouter.get('/list', authenticateToken, (req, res, next) => {
    // TODO: validate queries more rigorously
    const role = req.query.role;
    // TODO: nothing preventing you from sorting by studentId for non-students
    const sortBy = req.query.sortBy;
    let order = req.query.order;

    if (!role) { throw new HTTPError('User role not specified', 400); }

    // TODO: return safeUsers
    const filteredUsers = tempUsers.filter(user => user.role === role);

    if (!sortBy) {
        // no sorting specified just return an unsorted copy
        return res.status(200).json(filteredUsers);
    }
    
    if (order === "desc") {
        order = -1;
    } else {
        order = 1;
    }

    try {
        const sortedUsers = filteredUsers.toSorted((user1, user2) => {
            if (user1[sortBy] < user2[sortBy]) { return -1*order }
            if (user1[sortBy] > user2[sortBy]) { return 1*order }
            return 0;
        })

        return res.status(200).json(sortedUsers);
    } catch (error) { next(error); }
});

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

userRouter.patch('/student/:id/status', authenticateToken, validateStatusUpdate, (req, res, next) => {
    const { status } = req.body;

    try {
        const user = req.targetUser;
        updateUserStatus(user, status);

        const safeUser = getSafeUser(user);
        return res.status(200).json(safeUser);
    } catch(error) {
        next(error);
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

userRouter.get('/:id', authenticateToken, (req, res, next) => {
    // TODO: implement general user information i.e. name, email, id, status, role, etc.
    try {
        const user = getUserById(req.params.id);
        const safeUser = getSafeUser(user);
        return res.status(200).json(safeUser);
    } catch(error) { 
        next(error); 
    }
});