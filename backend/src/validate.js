import { USER_DETAILS } from './constants.js';

// TODO: move validation to schemas eventually so you can just call the validation from the schema
// TODO: create hasStrongPassword validation (low priority)
// TODO: better name regex (low priority)

/**
 * @function isValidEmail
 * @description Validates an email using regex
 * @param {String} email - An email
 * @returns {boolean} True if the email passes the regex check
 */

function isValidEmail(email) {
    const isEmail = (string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(string);
    return isEmail(email);
}

/**
 * @function isValidPassword
 * @description Validates a password
 * @param {String} password - A password
 * @returns {boolean} True if the password passes the length check
 */

function isValidPassword(password) {
    const minLength = USER_DETAILS.fieldConstraints.minPasswordLength;
    const maxLength = USER_DETAILS.fieldConstraints.maxPasswordLength;
    return password.length >= minLength && password.length <= maxLength;
}

/**
 * @function isValidStudentId
 * @description Validates a studentId using regex
 * @param {String} studentId - A studentId
 * @returns {boolean} True if the studentId passes the regex check
 */

function isValidStudentId(studentId) {
    const length = USER_DETAILS.fieldConstraints.lengthStudentId;
    // this regex verifies the studentId consists of exactly 9 digits
    const regex = new RegExp(`^\\d{${length}}$`);
    return regex.test(studentId);
}

/**
 * @function isValidName
 * @description Validates a name
 * @param {String} name 
 * @returns {boolean} True if the name passes the regex check
 */

function isValidName(name) {
    const isName = (string) => /^[a-zA-Z][a-zA-Z\-\s']*[a-zA-Z]$/.test(string);
    return isName(name);
}

/**
 * @function isValidOptional
 * @description Checks if an option is provided, if it is, it validates its format using the provided test function
 * @param {String} option - a parameter to validate
 * @param {function} testFunc - the function to test the option
 * @returns {boolean} True if option is not provided or option passes format check 
 */

function isValidOptional(option, testFunc) {
    return option === null || testFunc(option);
} 

function isValidUser(email, password, firstName, lastName) {
    return (isValidEmail(email) && isValidPassword(password) && isValidName(firstName) && isValidName(lastName));
}

/**
 * @function isValidStudent
 * @description Checks if required student fields follow the valid format
 * @param {Object} studentData - contains all of the student registration fields
 * @param {String} studentData.email
 * @param {String} studentData.password
 * @param {String} studentData.studentId
 * @param {String} studentData.firstName
 * @param {String} studentData.lastName
 * @returns {boolean} True if all parameters are valid
 */

export function isValidStudent({email, password, studentId, firstName, lastName}) {
    if (!isValidUser(email, password, firstName, lastName)) { return false; }
    return isValidStudentId(studentId);
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

export function isValidCoordinator({email, password, firstName, lastName}) {
    return isValidUser(email, password, firstName, lastName);
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

export function isValidSupervisor({email, password, company, location, jobTitle, firstName, lastName}) {
    if (!isValidUser(email, password, firstName, lastName) || !isValidName(company)) { return false; }

    // ensures all optionals are valid
    const hasValidOptionals = [
        isValidOptional(location, isValidName),
        isValidOptional(jobTitle, isValidName)
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

export function isValidLogin(email, password) {
    return isValidEmail(email) && isValidPassword(password);
}

/**
 * @function isValidStatusUpdate
 * @description Validates status fields
 * @param {String} status - new status
 * @param {String} callerId - calling user id
 * @returns {boolean} True if all parameters are valid
 */

export function isValidStatusUpdate(status) {
    return USER_DETAILS.studentStatuses.includes(status);
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