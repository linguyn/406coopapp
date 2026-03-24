import { USER_DETAILS } from './constants.js';

// TODO: move validation to schemas eventually so you can just call the validation from the schema
// TODO: name should be a mandatory param, at least for students

/**
 * @function hasValidEmail
 * @description Validates an email using regex
 * @param {String} email - An email
 * @returns {boolean} True if the email passes the regex check
 */

export function hasValidEmail(email) {
    return email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * @function hasValidPassword
 * @description Validates a password
 * @param {String} password - A password
 * @returns {boolean} True if the password passes the length check
 */

function hasValidPassword(password) {
    return password && password.trim().length >= 8 && password.trim().length <= 32;
}

/**
 * @function hasValidStudentId
 * @description Validates a studentId
 * @param {String} studentId - A studentId
 * @returns {boolean} True if the studentId passes the regex and length check
 */

function hasValidStudentId(studentId) {
    const isNumber = (string) => /^\d+$/.test(string);
    return studentId.trim().length === 9 && isNumber(studentId);
}

/**
 * @function hasValidName
 * @description Validates a name
 * @param {String} name 
 * @returns {boolean} True if the name passes the regex and length check
 */

function hasValidName(name) {
    const isName = (string) => /^[a-zA-Z\-\s']+$/.test(string);
    return name.trim().length > 0 && isName(name);
}

/**
 * @function isValidOptional
 * @description Checks if an option is provided, if it is, it validates its format using the provided test function
 * @param {String} option - a parameter to validate
 * @param {function} testFunc - the function to test the option
 * @returns {boolean} True if option is not provided or option passes format check 
 */

function isValidOptional(option, testFunc) {
    return !option || testFunc(option);
} 

/**
 * @function isValidStudent
 * @description Ensures mandatory fields are present and fields have the valid format
 * @param {Object} studentData - contains all the student registration fields
 * @param {String} studentData.email
 * @param {String} studentData.password
 * @param {String} studentData.studentId
 * @param {String} [supervisorData.name] - optional
 * @returns {boolean} True if all parameters are valid
 */

export function isValidStudent({email, password, studentId, name}) {
    if (!hasValidEmail(email) || !hasValidPassword(password) || !hasValidStudentId(studentId)) { return false; }

    const hasValidOptional = isValidOptional(name, hasValidName);

    return hasValidOptional;
}

/**
 * @function isValidCoordinator
 * @description Ensures mandatory fields are present and fields have the valid format
 * @param {Object} coordinatorData - contains all the coordinator registration fields
 * @param {String} coordinatorData.email
 * @param {String} coordinatorData.password
 * @param {String} [coordinatorData.name] - optional
 * @returns {boolean} True if all parameters are valid
 */

export function isValidCoordinator({email, password, name}) {
    if (!hasValidEmail(email) || !hasValidPassword(password)) { return false; }

    const hasValidOptional = isValidOptional(name, hasValidName);

    return hasValidOptional;
}

/**
 * @function isValidSupervisor
 * @description Ensures mandatory fields are present and fields have the valid format
 * @param {Object} supervisorData - contains all of the supervisor registration fields
 * @param {String} supervisorData.email
 * @param {String} supervisorData.password
 * @param {String} supervisorData.company
 * @param {String} [supervisorData.location] - optional
 * @param {String} [supervisorData.jobTitle] - optional
 * @param {String} [supervisorData.name] - optional
 * @returns {boolean} True if all parameters are valid
 */

export function isValidSupervisor({email, password, company, location, jobTitle, name}) {
    // does existence and format checks
    if (!hasValidEmail(email) || !hasValidPassword(password) || !hasValidName(company)) { return false; }

    // ensures all options are valid
    const hasValidOptionals = [
        isValidOptional(name, hasValidName),
        isValidOptional(location, hasValidName),
        isValidOptional(jobTitle, hasValidName)
    ].every(optional => optional);

    return hasValidOptionals;
}

/**
 * @function isValidLoginAttempt
 * @description Validates login fields
 * @param {String} email - Login email
 * @param {String} password - Login password
 * @returns {boolean} True if all parameters are valid
 */

export function isValidLoginAttempt(email, password) {
    return hasValidEmail(email) && hasValidPassword(password);
}

/**
 * @function isValidStatusUpdate
 * @description Validates status fields
 * @param {String} status - new status
 * @param {String} callerId - calling user id
 * @returns {boolean} True if all parameters are valid
 */

export function isValidStatusUpdate(status) {
    return status && USER_DETAILS.studentStatuses.includes(status);
}

/**
 * @function hasValidReason
 * @description Validates reason to apply (150 words max)
 * @param {String} reason - the reason to apply
 * @returns {boolean} True if the reason is valid
 */

export function hasValidReason(reason) {
    return reason && reason.trim().split(/\s+/).length <= 150;
}