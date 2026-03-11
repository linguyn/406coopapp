import { isValidLoginAttempt } from '../validate.js';
import { HTTPError } from '../errors.js';
import { findUserInDatabase } from '../database-services.js';
import express from 'express';
import { userDetails } from '../constants.js';

export const authRouter = express.Router();

/**
 * @api {POST} /login
 * @description Checks if the user's login matches a user in the database
 * @body {String} email - The user's unique email
 * @body {String} password - The user's unique password
 * @success {200} {Object} - Returns the user
 * @error {400} {Object} - Error message if login information is invalid
 * @error {401} {Object} - Error message if login information does not match a user
 * @error {500} {Object} - Internal error message
 */

authRouter.post('/login', (req, res) => {
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
 * @api {POST} /register
 * @description Adds a new user to the database
 * @success {200} {Object} - Returns the user
 * @error {400} {Object} - Error message if invalid registration details
 * @error {409} {Object} - Error message if user already exists
 * @error {500} {Object} - Internal error message
 */


authRouter.post('/register', (req, res) => {
    const registerInfo = req.body;
    try {
        const userType = registerInfo.userType;
        if (!userType || !userTypeFunctions[userType]) { throw new HTTPError("User type missing or invalid", 400); }
        // TODO: should perform basic validation
        // TODO: add isBasicUser fuction?
        if (!isBasicUser(registerInfo)) { throw new HTTPError("Missing fields or invalid credentials", 400); }
        if (findUserInDatabase(registerInfo.email)) { throw new HTTPError("User already exists", 409); }

        const validationFunction = userDetails.operations[userType].validate;
        if (!validationFunction(registerInfo)) { throw new HTTPError("Missing fields or invalid credentials", 400); }

        const registerFunction = userDetails.operations[userType].add;
        const user = registerFunction(registerInfo);
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});