import { getUserById, updateUserStatus, getSafeUser, getSanitizedUsers, getFilteredUsers } from '../database-services.js';
import express from 'express';
import { HTTPError } from '../errors.js'
import { validateStatusUpdate, validateListRequest } from '../validation-middleware.js';
import { authenticateToken } from '../server.js';
import { USER_DETAILS, LIST_CRITERIA } from '../constants.js';

export const userRouter = express.Router();

/**
 * @api {GET} /api/user/list
 * @description Retrieves a search/query-filtered list of all users of a certain role with optional sorting
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
        // TODO: should validate the filters and clean up this logic
        const exactFilters = extractExactFilters(role, req.query);
        const fuzzyFilters = USER_DETAILS.fuzzyFilters[role];
        const filteredUsers = getFilteredUsers(role, searchStr, exactFilters, fuzzyFilters);

        const safeUserOptions = USER_DETAILS.safeFields[role];
        const sanitizedUsers = getSanitizedUsers(filteredUsers, safeUserOptions);
        
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