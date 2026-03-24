import { HTTPError } from "./errors.js";

// TEMP REPRESENTATION OF USERS AND APPLICATIONS

export let tempUsers = [
        {
            studentId: '123456789',
            firstName : "alex",
            lastName : "something",
            email: 'jinwoo@example.ca',
            password: 'password123',
            role: 'student',
            status : "searching",
            id: '1741766400000',
            program:"comp sci",
            applications:3,
            report:null,
            reflection:null,
            date:null,
            year:null,
            gpa:null,
            coverLetter:null,
            resume:null,
            transcript:null

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

export function addCoordinatorToDatabase({email, password, firstName, lastName}) {
    const newCoordinator = {
        email: email,
        password: password,
        firstName: firstName,
        lastName : lastName,
        role: "coordinator",
        id: Date.now()
    };
    tempUsers.push(newCoordinator);
    return newCoordinator;
}

export function addSupervisorToDatabase({email, password, status, company, location, firstName, lastName, jobTitle, interns}) {
    const newSupervisor = {
        email: email,
        password: password,
        role: "supervisor",
        company : company,
        firstName : firstName,
        lastName : lastName,
        location : location,
        jobTitle : jobTitle,
        id: Date.now(),
        interns : interns,
        status : status || "active"
    };
    tempUsers.push(newSupervisor);
    return newSupervisor;
}

export function addStudentToDatabase({email, password, studentId, firstName, lastName, program, applications, status, report, reflection, gpa, year, date, coverLetter, resume, transcript, location}) {
    const newStudent = {
        studentId : studentId,
        email: email,
        password: password,
        role: "student",
        firstName : firstName,
        lastName : lastName,
        id: Date.now(),
        program : program,
        applications : applications,
        status : status || "applying",
        report : report,
        reflection :  reflection,
        gpa : gpa,
        date : date,
        year : year,
        coverLetter : coverLetter,
        resume : resume,
        transcript : transcript,
        location : location
    }
    tempUsers.push(newStudent);
    return newStudent;
}

export function isEmailTaken(email) {
    const userExists = tempUsers.some(user => user.email === email);
    return userExists;
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

/**
 * @function getSanitizedUser
 * @description Extracts a sanitized user, which copies all of the fields from the user as specified by options
 * @param {Object} user - the user object
 * @param {Array} options - a list of user fields that should be copied from the user
 * @returns A sanitized user
 */

export function getSanitizedUser(user, options) {
    const safeUser = options.reduce((acc, option) => {
        acc[option] = user[option];
        return acc;
    }, {});
    return safeUser;
}

export function updateUserStatus(user, newStatus) {
    user.status = newStatus;
    return user;
}

/**
 * @function getFilteredUsers
 * @description Retrieves a filtered list of users from the database. The filters are given by exactFilters, which
 *  contains the user fields (key/value) to exactly match and fuzzyFilterKeys, which is a list of user fields to try to fuzzy match with searchStr
 * @param {String} role - the user role type, which group of users to retrieve
 * @param {String} searchStr - the search query to match with certain user fields
 * @param {Object} exactFilters - user fields with specific values that have to exactly match a user
 * @param {Array} fuzzyFilterKeys - the list of user fields that are allowed to be matched with the searchStr
 * @returns a filtered list of users
 */

export function getFilteredUsers(role, searchStr, exactFilters, fuzzyFilterKeys) {
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

/**
 * @function getSanitizedUsers
 * @description Takes an array of users and runs getSanitizedUser on each to get a list of sanitized users
 * @param {Array} users - a list of user objects
 * @param {Array} options - a list of user fields that should be copied from each user
 * @returns A sanitized list of users
 */

export function getSanitizedUsers(users, options) {
    const sanitizedUsers = users.map((user) => {
        const safeUser = getSanitizedUser(user, options);

        return safeUser;
    });

    return sanitizedUsers;
}