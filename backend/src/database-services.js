import { HTTPError } from "./errors.js";
import { getModelByRole } from "./routes/user.js";

// TEMP REPRESENTATION OF USERS AND APPLICATIONS

export let tempUsers = [
        {
            academics : {
                program:"comp sci",
                year:null,
                gpa:null,
                department:null
            },
            support : {
                facultyAdvisors:null,
                coordinators:null
            },
            documents : {
                report:null,
                reflection:null,
                coverLetter:null,
                resume:null,
                transcript:null
            },
            termActivity : {
                applications:null,
                interviews:null,
                workTerms:null,
                startTerm:null
            },
            studentId: '123456789',
            firstName : "alex",
            lastName : "something",
            email: 'jinwoo@example.ca',
            password: 'password123',
            role: 'student',
            status : "applied",
            id: '1741766400000',
            dateCreated:null,
            isApplicant: true
        },
        {
            academics : {
                program:"comp sci",
                year:null,
                gpa:null,
                department:null
            },
            support : {
                facultyAdvisors:null,
                coordinators:null
            },
            documents : {
                report:null,
                reflection:null,
                coverLetter:null,
                resume:null,
                transcript:null
            },
            termActivity : {
                applications:3,
                interviews:null,
                workTerms:null,
                startTerm:null
            },
            studentId: '423456789',
            firstName : "anjani",
            lastName : "the greatest",
            email: 'aaaatudent@example.ca',
            password: 'password123',
            role: 'student',
            status : "searching",
            id: '1741766400001',
            dateCreated:null,
            isApplicant: true
        },
        {
            academics : {
                program:"comp sci",
                year:null,
                gpa:null,
                department:null
            },
            support : {
                facultyAdvisors:null,
                coordinators:null
            },
            documents : {
                report:null,
                reflection:null,
                coverLetter:null,
                resume:null,
                transcript:null
            },
            termActivity : {
                applications:3,
                interviews:null,
                workTerms:null,
                startTerm:null
            },
            studentId: '323456789',
            firstName : "linh",
            lastName : "the greatest",
            email: 'ffftudent@example.com',
            password: 'password123',
            role: 'student',
            status : "searching",
            id: '1741766400002',
            dateCreated:null,
            isApplicant: false
        },
        {
            email: 'supervisor@example.ca',
            password: 'password123',
            role: 'supervisor',
            firstName: 'kevin',
            lastName: 'the goat',
            id: '1741766400003'
        },
        {
            email: 'aaaasupervisor@example.com',
            password: 'password123',
            role: 'supervisor',
            firstName: 'jose',
            lastName: 'the goat',
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
            firstName : "jinwoo",
            lastName : "sung",
            password: 'password123',
            role: 'coordinator',
            id: '1741766400006'
        },
        {
            email: 'aaaacoordinator@example.com',
            password: 'password123',
            firstName : "elijah",
            lastName : "eliot",
            role: 'coordinator',
            id: '1741766400007'
        },
        {
            email: 'ffffffcoordinator@example.com',
            password: 'password123',
            firstName:"Donald",
            lastName: "poopy",
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

export let tempStats = {
    currentTerm : "winter 2026",
    newPostings : 12,
    openPostings : 144,
    totalStudents : 6767,
    totalActive : 6760,
    totalPendingApproval : 67,
    totalSeeking : 676,
    totalInterviewing: 7,
    totalPlaced: 6 
}

// deprecated, use a class such as UserResponse or UserLoginResponse to get a response-ready user
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

export function getGlobalStats() {
    return tempStats;
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

export async function getFilteredUsers(role, searchStr, exactFilters, fuzzyFilterKeys) {
    const query = {...exactFilters};
    const Model = getModelByRole(role);

    const searchKey = searchStr.toLowerCase();
    let hasSearch = false;
    if (!(searchStr && searchKey.trim().length > 0)) { return Model.find(query); }
    
    const searchRegex = new RegExp(searchStr, "i");
    for (const key in fuzzyFilterKeys) {
        
    }

    const filteredUsers = users.filter((user) => {
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