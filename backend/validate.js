import { USER_DETAILS } from './constants.js';
import { HTTPError } from './errors.js';
import { findUserInDatabase, getUserByEmail, getUserById, getSafeUser, addStudentToDatabase, addCoordinatorToDatabase, addSupervisorToDatabase } from './database-services.js';

// TODO: move validation to schemas eventually so you can just call the validation from the schema
// Note: although some functions look redundant, eventually the tests will change to make them different

/**
 * @function hasValidEmail
 * @description Validates an email using regex
 * @param {String} email - An email
 * @returns {boolean} True if the email passes the regex check
 */

function hasValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * @function hasValidPassword
 * @description Validates a password
 * @param {String} password - A password
 * @returns {boolean} True if the password passes the length check
 */

function hasValidPassword(password) {
    return password.length >= 8 && password.length <= 32;
}

/**
 * @function hasValidStudentId
 * @description Validates a studentId
 * @param {String} studentId - A studentId
 * @returns {boolean} True if the studentId passes the regex (type) and length check
 */

function hasValidStudentId(studentId) {
    const isNumber = (string) => /^\d+$/.test(string);
    return studentId.length === 9 && isNumber(studentId);
}

/**
 * @function isValidStudent
 * @description Validates the fields of a student
 * @param {String} email - A student's email
 * @param {String} password - A student's password
 * @param {String} studentId - A student's studentId
 * @returns {boolean} True if all parameters are valid
 */

export function isValidStudent({email, password, studentId}) {
    const hasFields = email && password && studentId;
    return hasFields && hasValidEmail(email) && hasValidPassword(password) && hasValidStudentId(studentId);
}

/**
 * @function isValidCoordinator
 * @description Validates the fields of a coordinator
 * @param {String} email - A coordinator's email
 * @param {String} password - A coordinator's password
 * @returns {boolean} True if all parameters are valid
 */

export function isValidCoordinator({email, password}) {
    const hasFields = email && password;
    return hasFields && hasValidEmail(email) && hasValidPassword(password);
}

/**
 * @function isValidSupervisor
 * @param {String} email - A supervisor's email
 * @param {String} password - A supervisor's password
 * @returns {boolean} True if all parameters are valid
 */

export function isValidSupervisor({email, password}) {
    const hasFields = email && password;
    return hasFields && hasValidEmail(email) && hasValidPassword(password);
}

/**
 * @function isValidLoginAttempt
 * @description Validates login fields
 * @param {String} email - Login email
 * @param {String} password - Login password
 * @returns {boolean} True if all parameters are valid
 */

export function isValidLoginAttempt(email, password) {
    const hasFields = email && password;
    return hasFields && hasValidEmail(email) && hasValidPassword(password);
}

/**
 * @function isValidStatusUpdate
 * @description Validates status fields
 * @param {String} status - new status
 * @param {String} callerId - calling user id
 * @returns {boolean} True if all parameters are valid
 */

export function isValidStatusUpdate({status}) {
    const hasFields = status;
    return hasFields && USER_DETAILS.studentStatuses.includes(status);
}




export function validateLogin(req, res, next) {
    const {email, password} = req.body;

    try {
        if (!isValidLoginAttempt(email, password)) { throw new HTTPError("Invalid login credentials", 400); }

        const user = getUserByEmail(email);

        // TODO: update when database implemented
        if (user.password !== password) { throw new HTTPError("Login information does not match", 400); }

        const safeUser = getSafeUser(user);

        // user is valid, can safely update the user field in req for further use
        req.user = safeUser;
        next();
    } catch(error) {
        next(error);
    }
    
};

export function validateRegister(req, res, next) {
    const {email, role} = req.body;
    try {
        const roleOperations = USER_OPERATIONS[role];
        if (!role || !roleOperations) { throw new HTTPError("User type missing or invalid", 400); }
        // TODO: add isBasicUser fuction?
        // if (!isBasicUser(registerInfo)) { throw new HTTPError("Missing fields or invalid credentials", 400); }
        if (findUserInDatabase(email)) { throw new HTTPError("User already exists", 409); }

        if (!roleOperations.validate(req.body)) { throw new HTTPError("Missing fields or invalid credentials", 400); }
        
        next();
    } catch (error) {
        next(error);
    }
}

export function validateStatusUpdate(req, res, next) {
    // the user that made this request
    const caller = req.user;
    const { status } = req.body;

    if (caller.role !== USER_DETAILS.roles.coordinator && caller.role !== USER_DETAILS.roles.admin) { throw new HTTPError("Missing permissions", 403); }
    if (!isValidStatusUpdate(status)) { throw new HTTPError("Missing fields or invalid update", 400); }
    try {
        // the user we are modifying
        const user = getUserById(req.params.id);
        req.targetUser = user;
        next();
    } catch(error) {
        next(error);
    }
}

export function validateLogout(req, res, next) {
    const cookie = req.cookies.refreshToken;
    try {
        if (!cookie) { throw new HTTPError("Missing cookie or already logged out", 400); }
        next();
    } catch (error) { next(error); }
}

export const USER_OPERATIONS = {
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
}