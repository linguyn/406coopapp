import { HTTPError } from "./errors.js";

// TEMP REPRESENTATION OF USERS

export let tempUsers = [
        {
            studentId: '123456789',
            email: 'student@example.com',
            password: 'password123',
            role: 'student',
            id: '1741766400000'
        },
        {
            studentId: '423456789',
            email: 'aaaatudent@example.com',
            password: 'password123',
            role: 'student',
            id: '1741766400001'
        },
        {
            studentId: '323456789',
            email: 'ffftudent@example.com',
            password: 'password123',
            role: 'student',
            id: '1741766400002'
        },
        {
            email: 'supervisor@example.com',
            password: 'password123',
            role: 'supervisor',
            id: '1741766400003'
        },
        {
            email: 'aaaasupervisor@example.com',
            password: 'password123',
            role: 'supervisor',
            id: '1741766400004'
        },
        {
            email: 'ffffffsupervisor@example.com',
            password: 'password123',
            role: 'supervisor',
            id: '1741766400005'
        },
        {
            email: 'coordinator@example.com',
            password: 'password123',
            role: 'coordinator',
            id: '1741766400006'
        },
        {
            email: 'aaaacoordinator@example.com',
            password: 'password123',
            role: 'coordinator',
            id: '1741766400007'
        },
        {
            email: 'ffffffcoordinator@example.com',
            password: 'password123',
            role: 'coordinator',
            id: '1741766400008'
        }
]

export function addCoordinatorToDatabase({email, password}) {
    tempUsers.push({
        email: email,
        password: password,
        role: "coordinator",
        id: Date.now()
    });
    return getUserByEmail(email);
}

export function addSupervisorToDatabase({email, password}) {
    tempUsers.push({
        email: email,
        password: password,
        role: "supervisor",
        id: Date.now()
    });
    return getUserByEmail(email);
}

export function addStudentToDatabase({email, password, studentId}) {
    tempUsers.push({
        studentId : studentId,
        email: email,
        password: password,
        role: "student",
        id: Date.now()
    });
    return getUserByEmail(email);
}

export function findUserInDatabase(email) {
    const isUser = tempUsers.some(user => user.email === email);
    return isUser;
}

// should eventually be asynchronous when using database
export function getUserByEmail(email) {
    const user = tempUsers.find(user => user.email === email);
    if (!user) {
        throw new HTTPError("User doesn't exist", 401);
    }
    return user;
}

export function getUserById(id) {
    const user = tempUsers.find(user => user.id === id);
    if (!user) {
        throw new HTTPError("User doesn't exist", 401);
    }
    return user;
}

export function getSafeUser(user) {
    const safeUser = {
            id : user.id,
            name : user.name,
            email : user.email,
            role : user.role
            // add more fields here in future if needed
    };
    return safeUser;
}

export function updateUserStatus(user, newStatus) {
    user.status = newStatus;
    return user;
}