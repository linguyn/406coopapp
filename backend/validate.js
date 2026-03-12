import { USER_DETAILS } from './constants.js';

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

export function isValidLoginAttempt({email, password}) {
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

export function isValidStatusUpdate({status}, role) {
    const hasFields = status;
    const hasPermission = role === USER_DETAILS.roles.coordinator || role === USER_DETAILS.roles.admin;
    return hasFields && hasPermission && USER_DETAILS.studentStatuses.includes(status);
}