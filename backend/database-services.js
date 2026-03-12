import { HTTPError } from "./errors.js";

// TEMP REPRESENTATION OF USERS

export let tempUsers = [
        {
            studentId: '123456789',
            email: 'student@example.com',
            password: 'password123',
            role: 'student'
        },
        {
            studentId: '423456789',
            email: 'aaaatudent@example.com',
            password: 'password123',
            role: 'student'
        },
        {
            studentId: '323456789',
            email: 'ffftudent@example.com',
            password: 'password123',
            role: 'student'
        },
        {
            email: 'supervisor@example.com',
            password: 'password123',
            role: 'supervisor'
        },
        {
            email: 'aaaasupervisor@example.com',
            password: 'password123',
            role: 'supervisor'
        },
        {
            email: 'ffffffsupervisor@example.com',
            password: 'password123',
            role: 'supervisor'
        },
        {
            email: 'coordinator@example.com',
            password: 'password123',
            role: 'coordinator'
        },
        {
            email: 'aaaacoordinator@example.com',
            password: 'password123',
            role: 'coordinator'
        },
        {
            email: 'ffffffcoordinator@example.com',
            password: 'password123',
            role: 'coordinator'
        }
]

export function addCoordinatorToDatabase({email, password}) {
    tempUsers.push({
        email: email,
        password: password,
        role: "coordinator"
    });
    return getUserFromDatabase(email);
}

export function addSupervisorToDatabase({email, password}) {
    tempUsers.push({
        email: email,
        password: password,
        role: "supervisor"
    });
    return getUserFromDatabase(email);
}

export function addStudentToDatabase({email, password, studentId}) {
    tempUsers.push({
        studentId : studentId,
        email: email,
        password: password,
        role: "student"
    });
    return getUserFromDatabase(email);
}

export function findUserInDatabase(email) {
    const isUser = tempUsers.some(user => user.email === email);
    return isUser;
}

// should eventually be asynchronous when using database
export function getUserFromDatabase(email) {
    const user = tempUsers.find(user => user.email === email);
    if (!user) {
        throw new HTTPError("User doesn't exist", 401);
    }
    return user;
}

export function updateUserStatus(user, newStatus) {
    user.status = newStatus;
    return user;
}