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