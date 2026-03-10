import { tempUsers } from '../database-services.js';
import express from 'express';

export const usersRouter = express.Router();

/**
 * @api {GET} /users
 * @description Retrieves a filtered list of users with optional sorting
 * @query {String} userType - The type of users. Options: "students", "supervisors", or "coordinators"
 * @query {String} [sortBy] - The sorting criteria. Options: "studentId", "email", "name"
 * @query {String} [order=asc] - The sorting direction. Options: "asc" or "desc"
 * @success {200} {Array} sortedUsers - The filtered and sorted list of users
 * @error {500} {Object} - Internal error message
 * @example
 * GET /users?userType=students&sortBy=studentId&order=desc
 */

usersRouter.get('/users', (req, res) => {
    // TODO: validate queries more rigorously
    const userType = req.query.userType;
    // TODO: nothing preventing you from sorting by studentId for non-students
    const sortBy = req.query.sortBy;
    let order = req.query.order;

    if (!userType) {
        return res.status(400).json('User type not specified');
    }

    const filteredUsers = tempUsers.filter(user => user.userType === userType);

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
    } catch (error) { return res.status(500).json('Error occurred while retrieving users'); }
})