import { tempUsers, getUserFromDatabase, updateUserStatus } from '../database-services.js';
import express from 'express';
import { HTTPError } from '../errors.js'
import { isValidStatusUpdate } from '../validate.js';

export const userRouter = express.Router();

/**
 * @api {GET} /api/user/list
 * @description Retrieves a filtered list of users with optional sorting
 * @query {String} role - The type of users. Options: "students", "supervisors", or "coordinators"
 * @query {String} [sortBy] - The sorting criteria. Options: "studentId", "email", "name"
 * @query {String} [order=asc] - The sorting direction. Options: "asc" or "desc"
 * @success {200} {Array} sortedUsers - The filtered and sorted list of users
 * @error {500} {Object} - Internal error message
 * @example
 * GET /users?role=students&sortBy=studentId&order=desc
 */

userRouter.get('/list', (req, res) => {
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
 * @api {PATCH} - /api/user/student/:id/status
 * @description - Updates a student's status
 * @param id - Student id
 * @body {String} status - New student status
 * @body {String} callerId - Calling user id
 * @success {200} {Object} - Return the updated student
 * @error {400} {Object} - Error message if status information is invalid
 * @error {401} {Object} - Error message if id does not match an existing user
 * @errpr {403} {Object} - Error message if the calling user id does not have permission
 * @error {500} {Object} - Internal error message
 */

userRouter.patch('/student/:id/status', (req, res, next) => {
    const statusInfo = req.body;
    const studentId = req.params.id;

    try {
        const caller = getUserFromDatabase(statusInfo.callerId);
        if (!isValidStatusUpdate(statusInfo, caller.role)) { throw new HTTPError("Invalid status update", 400); }
        const user = getUserFromDatabase(studentId);
        updateUserStatus(user, statusInfo);
        return res.status(200).json(user);
    } catch(error) {
        next(error);
    }
});

userRouter.patch('/security', (req, res) => {
    // TODO: update user email/password/other sensitive info

});

userRouter.patch('/:id/profile', (req, res) => {
    // TODO: update user profile info

});

/**
 * @api {GET} - /api/user/:id
 * @param id - User id
 * @success - Returns the user's information
 * @error {401} {Object} - Error message if the user doesn't exist
 */

userRouter.get('/:id', (req, res, next) => {
    // TODO: get general user information i.e. name, email, id, status, role, etc.
    try {
        const user = getUserFromDatabase(req.params.id);
        return res.status(200).json(user);
    } catch(error) { 
        next(error); 
    }
})