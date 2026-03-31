import { HTTPError } from "./errors.js";

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

export let tempReflections = [
    {
        company : "Aperture Science",
        supervisor : "GLaDOS",
        jobTitle : "Test Subject",
        termDuration : "8 months",
        skills : "How to survive being tested on by a sadistic AI",
        challenges : "Not being killed by GLaDOS",
        supported : "GLaDOS was very supportive and provided me with cake"
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

export let tempProgressForms = [
    {
        studentName : "xdd",
        studentId : "123456789",
        supervisorName : "rat",
        company : "ratland",
        jobTitle : "Software Developer Intern",
        termDuration : "4 months",
        skills : "cheese",
        challenges : "being a rat",
        supported : "rat supervisor was very supportive",
        employable : "no"
    }
]

export function addApplicationToDatabase({firstName, lastName, studentId, schoolEmail, eligibility, reasonToApply, portfolioLink}) {
    const newApp = {
        id : tempApplications.length + 1,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        studentId: studentId.trim(),
        schoolEmail: schoolEmail.trim(),
        eligibility,
        reasonToApply: reasonToApply.trim(),
        portfolioLink: portfolioLink ? portfolioLink.trim() : null,
        submittedAt: new Date()
    };
    tempApplications.push(newApp);
    return newApp;
}

export function updateApplication(applicationId, newAppData) {
    const application = tempApplications.find(app => app.id === applicationId);
    if (!application) {
        throw new HTTPError("Application not found", 404);
    }
    if (newAppData.firstName) { application.firstName = newAppData.firstName.trim(); }
    if (newAppData.lastName) { application.lastName = newAppData.lastName.trim(); }
    if (newAppData.studentId) { application.studentId = newAppData.studentId.trim(); }
    if (newAppData.schoolEmail) { application.schoolEmail = newAppData.schoolEmail.trim(); }
    if (typeof newAppData.eligibility === "boolean") { application.eligibility = newAppData.eligibility; }
    if (newAppData.reasonToApply) { application.reasonToApply = newAppData.reasonToApply.trim(); }
    if (newAppData.portfolioLink) { application.portfolioLink = newAppData.portfolioLink.trim(); }
    return application;
}

export function addReflectionToDatabase({company, supervisor, jobTitle, termDuration, skills, challenges, supported}) {
    const newReflection = {
        id : tempReflections.length + 1,
        company : company.trim(),
        supervisor : supervisor.trim(),
        jobTitle : jobTitle.trim(),
        termDuration : termDuration.trim(),
        skills : skills.trim(),
        challenges : challenges.trim(),
        supported : supported.trim(),
        submittedAt : new Date()
    }
    tempReflections.push(newReflection);
    return newReflection;
}

export function updateReflection(reflectionId, newReflectionData) {
    const reflection = tempReflections.find(ref => ref.id === reflectionId);
    if (!reflection) {
        throw new HTTPError("Reflection not found", 404);
    }
    if (newReflectionData.company) { reflection.company = newReflectionData.company.trim(); }
    if (newReflectionData.supervisor) { reflection.supervisor = newReflectionData.supervisor.trim(); }
    if (newReflectionData.jobTitle) { reflection.jobTitle = newReflectionData.jobTitle.trim(); }
    if (newReflectionData.termDuration) { reflection.termDuration = newReflectionData.termDuration.trim(); }
    if (newReflectionData.skills) { reflection.skills = newReflectionData.skills.trim(); }
    if (newReflectionData.challenges) { reflection.challenges = newReflectionData.challenges.trim(); }
    if (newReflectionData.supported) { reflection.supported = newReflectionData.supported.trim(); }
    return reflection;
}

export function addProgressFormToDatabase({studentName, studentId, supervisorName, company, jobTitle, termDuration, skills, challenges, supported, employable}) {
    const newProgressForm = {
        id : tempProgressForms.length + 1,
        studentName : studentName.trim(),
        studentId : studentId.trim(),
        supervisorName : supervisorName.trim(),
        company : company.trim(),
        jobTitle : jobTitle.trim(),
        termDuration : termDuration.trim(),
        skills : skills.trim(),
        challenges : challenges.trim(),
        supported : supported.trim(),
        employable : employable.trim(),
        submittedAt : new Date()
    }
    tempProgressForms.push(newProgressForm);
    return newProgressForm;
}

export function updateProgressForm(progressFormId, newProgressFormData) {
    const progressForm = tempProgressForms.find(form => form.id === progressFormId);
    if (!progressForm) {
        throw new HTTPError("Progress form not found", 404);
    }
    if (newProgressFormData.studentName) { progressForm.studentName = newProgressFormData.studentName.trim(); }
    if (newProgressFormData.studentId) { progressForm.studentId = newProgressFormData.studentId.trim(); }
    if (newProgressFormData.supervisorName) { progressForm.supervisorName = newProgressFormData.supervisorName.trim(); }
    if (newProgressFormData.company) { progressForm.company = newProgressFormData.company.trim(); }
    if (newProgressFormData.jobTitle) { progressForm.jobTitle = newProgressFormData.jobTitle.trim(); }
    if (newProgressFormData.termDuration) { progressForm.termDuration = newProgressFormData.termDuration.trim(); }
    if (newProgressFormData.skills) { progressForm.skills = newProgressFormData.skills.trim(); }
    if (newProgressFormData.challenges) { progressForm.challenges = newProgressFormData.challenges.trim(); }
    if (newProgressFormData.supported) { progressForm.supported = newProgressFormData.supported.trim(); }
    if (newProgressFormData.employable) { progressForm.employable = newProgressFormData.employable.trim();}
    return progressForm;
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