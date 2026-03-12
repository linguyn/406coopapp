import { isValidLoginAttempt } from '../validate.js';
import { HTTPError } from '../errors.js';
import { findUserInDatabase, getUserFromDatabase } from '../database-services.js';
import express from 'express';
import { USER_OPERATIONS } from '../user-operations.js';

export const authRouter = express.Router();

/**
 * @api {POST} /api/auth/login
 * @description Checks if the user's login matches a user in the database
 * @body {String} email - The user's unique email
 * @body {String} password - The user's unique password
 * @success {200} {Object} - Returns the user
 * @error {400} {Object} - Error message if login information is invalid
 * @error {401} {Object} - Error message if login information does not match a user
 * @error {500} {Object} - Internal error message
 */

authRouter.post('/login', (req, res, next) => {
    const loginInfo = req.body;
    try {
        if (!isValidLoginAttempt(loginInfo)) { throw new HTTPError("Invalid login credentials", 400); }

        const user = getUserFromDatabase(loginInfo.email);

        if (user.password !== loginInfo.password) { throw new HTTPError("Login information does not match", 400); }

        return res.status(200).json(user);
    } catch (error) { 
        next(error);
    }
});

/**
 * @api {POST} /api/auth/register
 * @description Adds a new user to the database
 * @success {200} {Object} - Returns the user
 * @error {400} {Object} - Error message if invalid registration details
 * @error {409} {Object} - Error message if user already exists
 * @error {500} {Object} - Internal error message
 */


authRouter.post('/register', (req, res, next) => {
    const registerInfo = req.body;
    try {
        const role = registerInfo.role;
        const roleOperations = USER_OPERATIONS[role];
        if (!role || !roleOperations) { throw new HTTPError("User type missing or invalid", 400); }
        // TODO: add isBasicUser fuction?
        // if (!isBasicUser(registerInfo)) { throw new HTTPError("Missing fields or invalid credentials", 400); }
        if (findUserInDatabase(registerInfo.email)) { throw new HTTPError("User already exists", 409); }

        const validationFunction = roleOperations.validate;
        if (!validationFunction(registerInfo)) { throw new HTTPError("Missing fields or invalid credentials", 400); }

        const registerFunction = roleOperations.add;
        const user = registerFunction(registerInfo);
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});