//TODO: move validation to schemas eventually so you can just call the validation from the schema

function hasValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function hasValidPassword(password) {
    return password.length >= 8 && password.length <= 32;
}

function hasValidStudentId(studentId) {
    const isNumber = (string) => /^\d+$/.test(string);
    return studentId.length === 9 && isNumber(studentId);
}

export function isValidStudent(loginInfo) {
    const hasFields = loginInfo.studentId && loginInfo.password && loginInfo.email;
    return hasFields && hasValidEmail(loginInfo.email) && hasValidPassword(loginInfo.password) && hasValidStudentId(loginInfo.studentId);
}

export function isValidSupervisor(loginInfo) {
    const hasFields = loginInfo.email && loginInfo.password;
    return hasFields && hasValidEmail(loginInfo.email) && hasValidPassword(loginInfo.password);
}

export function isValidCoordinator(loginInfo) {
    const hasFields = loginInfo.email && loginInfo.password;
    return hasFields && hasValidEmail(loginInfo.email) && hasValidPassword(loginInfo.password);
}