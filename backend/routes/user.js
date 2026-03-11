import { tempUsers, getUserFromDatabase, updateUserStatus } from '../database-services.js';
import express from 'express';
import { HTTPError } from '../errors.js'
import { isValidStatusUpdate } from '../validate.js';
import { userDetails } from '../constants.js';

export const userRouter = express.Router();

/**
 * @api {GET} /users
 * @description Retrieves a filtered list of users with optional sorting
 * @query {String} role - The type of users. Options: "students", "supervisors", or "coordinators"
 * @query {String} [sortBy] - The sorting criteria. Options: "studentId", "email", "name"
 * @query {String} [order=asc] - The sorting direction. Options: "asc" or "desc"
 * @success {200} {Array} sortedUsers - The filtered and sorted list of users
 * @error {500} {Object} - Internal error message
 * @example
 * GET /users?role=students&sortBy=studentId&order=desc
 */

userRouter.get('/', (req, res) => {
    // TODO: validate queries more rigorously
    const role = req.query.role;
    // TODO: nothing preventing you from sorting by studentId for non-students
    const sortBy = req.query.sortBy;
    let order = req.query.order;

    if (!role) { throw new HTTPError('User type not specified', 400); }

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
})

/**
 * @api {PATCH} - Updates a user's status
 * @param id - User id
 * @body {String} status - New user status
 * @success {200} {Object} - Return the updated user
 * @error {400} {Object} - Error message if status information is invalid
 * @error {401} {Object} - Error message if id does not match an existing user
 * @error {500} {Object} - Internal error message
 */

userRouter.patch('/:id/status', (req, res) => {
    const statusInfo = req.body;
    const id = req.params.id;
    try {
        if (!isValidStatusUpdate(statusInfo)) { throw new HTTPError("Invalid status update", 400); }
        const user = getUserFromDatabase(id);
        if (user.role !== userDetails.roles.coordinator || user.role !== userDetails.roles.admin) { throw new HTTPError("Lacking permissions", 403); }
        updateUserStatus(user, statusInfo);
        return res.status(200).json(user);
    } catch(error) {
        next(error);
    }
});

userRouter.patch('/security', (req, res) => {
    // TODO: update user email/password/other sensitive info
});

userRouter.patch('/profile', (req, res) => {
    // TODO: update user profile info
});

userRouter.get('/:id/status', (req, res) => {

})