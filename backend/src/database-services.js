import { HTTPError } from "./errors.js";

// TEMP REPRESENTATION OF USERS AND APPLICATIONS

export let tempUsers = [
        {
            studentId: '123456789',
            name : "alex",
            email: 'student@example.ca',
            password: 'password123',
            role: 'student',
            status : "searching",
            id: '1741766400000'
        },
        {
            studentId: '423456789',
            name : "anjani",
            email: 'aaaatudent@example.ca',
            password: 'password123',
            role: 'student',
            status : "searching",
            id: '1741766400001'
        },
        {
            studentId: '323456789',
            name : "linh",
            email: 'ffftudent@example.com',
            password: 'password123',
            role: 'student',
            status : "searching",
            id: '1741766400002'
        },
        {
            email: 'supervisor@example.ca',
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
            email: 'ffffffsupervisor@example.net',
            password: 'password123',
            role: 'supervisor',
            id: '1741766400005'
        },
        {
            email: 'coordinator@example.com',
            name : "jinwoo",
            password: 'password123',
            role: 'coordinator',
            id: '1741766400006'
        },
        {
            email: 'aaaacoordinator@example.com',
            password: 'password123',
            name : "elijah",
            role: 'coordinator',
            id: '1741766400007'
        },
        {
            email: 'ffffffcoordinator@example.com',
            password: 'password123',
            name:"trump",
            role: 'coordinator',
            id: '1741766400008'
        }
]

export let tempApplications = [
    {
        firstName: "Michael",
        lastName: "Scott",
        studentId: "123456789",
        schoolEmail: "michael.scott@example.com",
        eligibility: true,
        reasonToApply: "I'm the most creative boss.",
        portfolioLink: "https://www.example.com/portfolio/michael-scott"
    },
]

export function addCoordinatorToDatabase({email, password, name = "None"}) {
    const id = Date.now();
    tempUsers.push({
        email: email,
        password: password,
        name: name,
        role: "coordinator",
        id: id
    });
    return getUserById(id);
}

export function addSupervisorToDatabase({email, password, company, location = "None", name = "None", jobTitle = "None"}) {
    const id = Date.now();
    tempUsers.push({
        email: email,
        password: password,
        role: "supervisor",
        company : company,
        name : name,
        location : location,
        jobTitle : jobTitle,
        id: id
    });
    return getUserById(id);
}

export function addStudentToDatabase({email, password, studentId, name = "None"}) {
    const id = Date.now();
    tempUsers.push({
        studentId : studentId,
        email: email,
        password: password,
        role: "student",
        name : name,
        id: id
    });
    return getUserById(id);
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

// TODO: needs to be updated to match getSanitizedUsers logic
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

export function getFilteredUsers(role, searchStr, exactFilters, fuzzyFilterKeys) {
    // filters to consider: name, studentId, email, status, program, company, role
    // fuzzy: name, studentId, email, company
    // exact (provided as queries): status, program, role, date (of applicant submission/student placement)
    const searchKey = searchStr.toLowerCase();
    let hasSearch = false;
    if (searchKey.trim().length > 0) { hasSearch = true; }

    const filteredUsers = tempUsers.filter((user) => {
        if (user.role !== role) { return false; }
        for (const key in exactFilters) {
            if (user[key] !== exactFilters[key]) { return false; }
        }
    
        if (hasSearch) {
            // tries to find a match among the fuzzy filters i.e. name, studentId, company, etc.
            const match = fuzzyFilterKeys.some((key) => {
                if (user[key].includes(searchKey)) { 
                    return true;
                }
                return false;
            }); 
            if (!match) { return false; }
        }
        return true;
    });
    
    return filteredUsers;
}

export function getSanitizedUsers(users, options) {
    const sanitizedUsers = users.map((user) => {
        const safeUser = options.reduce((acc, key) => {
            acc[key] = user[key];
            return acc;
        }, {});

        return safeUser;
    });

    return sanitizedUsers;
}