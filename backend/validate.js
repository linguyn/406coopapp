//TODO: move validation to schemas eventually so you can just call the validation from the schema

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
 * @param {Object} loginInfo - A student's loginInfo
 * @returns {boolean} True if the loginInfo contains the valid fields
 */

export function isValidStudent(loginInfo) {
    const hasFields = loginInfo.studentId && loginInfo.password && loginInfo.email;
    return hasFields && hasValidEmail(loginInfo.email) && hasValidPassword(loginInfo.password) && hasValidStudentId(loginInfo.studentId);
}

/**
 * @function isValidSupervisor
 * @description Validates the fields of a supervisor
 * @param {Object} loginInfo - A supervisor's loginInfo
 * @returns {boolean} True if the loginInfo contains the valid fields
 */

export function isValidSupervisor(loginInfo) {
    const hasFields = loginInfo.email && loginInfo.password;
    return hasFields && hasValidEmail(loginInfo.email) && hasValidPassword(loginInfo.password);
}

/**
 * @function isValidCoordinator
 * @description Validates the fields of a coordinator
 * @param {Object} loginInfo - A coordinator's loginInfo
 * @returns {boolean} True if the loginInfo contains the valid fields
 */

export function isValidCoordinator(loginInfo) {
    const hasFields = loginInfo.email && loginInfo.password;
    return hasFields && hasValidEmail(loginInfo.email) && hasValidPassword(loginInfo.password);
}