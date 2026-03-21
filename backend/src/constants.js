const BASE_FUZZY = [ "name", "email"];
const BASE_SAFE = [ "name", "email", "status"];

export const USER_DETAILS = {
    roles : {
        student : "student",
        applicant : "applicant",
        supervisor : "supervisor",
        coordinator : "coordinator",
        admin : "admin"
    },
    studentStatuses : ["searching", "placed"],
    applicantStatuses : ["applying", "applied", "offered", "rejected", "waitlisted", "probation"],
    supervisorStatuses : ["active", "inactive"],
    fuzzyFilters : {
        student : [...BASE_FUZZY, "studentId"],
        applicant : [...BASE_FUZZY, "studentId"],
        supervisor : [...BASE_FUZZY, "company"],
        coordinator : [...BASE_FUZZY]
    },
    exactFilters : {
        student : ["status", "program", "date"],
        applicant : ["status", "program", "date", "gpa", "year"],
        supervisor : ["status"],
        coordinator : []
    },
    safeFields : {
        student : [...BASE_SAFE, "studentId", "program", "applications", "report", "reflection"],
        applicant : [...BASE_SAFE, "date", "studentId", "program", "year", "gpa", "coverLetter", "resume", "transcript"],
        supervisor : [...BASE_SAFE, "company", "jobTitle", "report", "interns"],
        coordinator : [...BASE_SAFE]
    }
};

export const LIST_CRITERIA = {
    sorting : ["name", "email", "applications", "status", "studentId"],
    order : ["asc", "desc"]
};

export const API = {
    prefixes : {
        user : "/api/user",
        auth : "/api/auth"
    }
};

export const TOKEN_OPTIONS = {
    refreshCookie : {
        secure : true,              // only used with https
        httpOnly : true,            // only accessible by a web server
        path : '/',                 // cookie is visible to all routes
        sameSite : "lax"            // allows cookie to be sent across websites
    },
    access : { expiresIn : '15m' },
    refreshShort : { expiresIn : '1d' },
    refreshLong : { expiresIn : '7d' },
    sev_day_milli : 7*24*60*60*1000,
};