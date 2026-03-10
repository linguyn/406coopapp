import {isValidLoginAttempt, isValidStudent, isValidCoordinator, isValidSupervisor} from '../validate.js';
import { NotFoundError, ValidationError, ConflictError } from '../errors.js';
import { findUserInDatabase, addStudentToDatabase, addCoordinatorToDatabase, addSupervisorToDatabase } from '../database-services.js';
import express from 'express';

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
        const email = loginInfo.email;
        const password = loginInfo.password;
        if (!isValidLoginAttempt(email, password)) { throw new ValidationError("Invalid login credentials"); }

        const user = getUserFromDatabase(email);

        if (user.password !== password) { throw new ValidationError("Login information does not match"); }

        return res.status(200).json(user);
    } catch (error) { 
        if (error instanceof NotFoundError) { return res.status(401).json(error.message); }
        else if (error instanceof ValidationError) { return res.status(400).json(error.message); }
        // should not be error.message for safety (the unknown error message may contain sensitive data)
        else { return res.status(500).json("Error occurred while logging in"); }
    }
});


const userTypeFunctions = {
    student : {
        validate : isValidStudent,
        add : addStudentToDatabase
    },
    supervisor : {
        validate : isValidSupervisor,
        add : addSupervisorToDatabase
    },
    coordinator : {
        validate : isValidCoordinator,
        add : addCoordinatorToDatabase
    }
};

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
        if (!userType || !userTypeFunctions[userType]) { throw new ValidationError("User type missing or invalid"); }
        // TODO: should perform basic validation
        if (!isBasicUser(registerInfo)) { throw new ValidationError("Missing fields or invalid credentials"); }
        if (findUserInDatabase(registerInfo.email)) { throw new ConflictError("User already exists"); }

        const validationFunction = userTypeFunctions[userType].validate;
        if (!validationFunction(registerInfo)) { throw new ValidationError("Invalid something something"); }

        const registerFunction = userTypeFunctions[userType].add;
        const user = registerFunction(registerInfo);
        return res.status(200).json(user);
    } catch (error) {
        if (error instanceof ConflictError) { return res.status(409).json(error.message); }
        else if (error instanceof ValidationError) { return res.status(400).json(error.message); }
        else { return res.status(500).send('Error occurred while registering'); }
    }
});