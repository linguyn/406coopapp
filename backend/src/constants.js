const BASE_FUZZY = [ "firstName", "lastName", "email"];
const BASE_SAFE = [ "firstName", "lastName", "email", "role", "id"];

export const USER_DETAILS = {
    roles : {
        student : "student",
        supervisor : "supervisor",
        coordinator : "coordinator",
        admin : "admin"
    },
    studentStatuses : ["applying", "applied", "offered", "rejected", "waitlisted", "probation", "searching", "placed"],
    supervisorStatuses : ["active", "inactive"],
    fuzzyFilters : {
        student : [...BASE_FUZZY, "studentId"],
        supervisor : [...BASE_FUZZY, "company"],
        coordinator : [...BASE_FUZZY]
    },
    exactFilters : {
        student : ["status", "program", "createdAt", "gpa", "year", "location", "isApplicant"],
        supervisor : ["status", "location", "jobTitle"],
        coordinator : []
    },
    safeFields : {
        student : [...BASE_SAFE, "status", "studentId", "applications", "report", "reflection", "date", "year", "program", "gpa", "coverLetter", "resume", "transcript", "location"],
        supervisor : [...BASE_SAFE, "status", "company", "jobTitle", "report", "interns"],
        coordinator : [...BASE_SAFE]
    },
    fieldConstraints : {
        lengthStudentId : 9,
        minPasswordLength : 8,
        maxPasswordLength : 32
    },
};

export const REGISTRATION_FIELDS = {
    // NOTE: general fields apply to every user type
    required : {
        general : ["role", "firstName", "lastName", "email", "password", "passwordAgain"],
        student : ["studentId"],
        coordinator : [],
        supervisor : ["company"]
    },
    optional : {
        general : [],
        student : [],
        coordinator : [],
        supervisor : ["jobTitle", "location"]
    }
}

export const CLEANING = {
    options : {
        trimOnly : ["firstName", "lastName", "report", "reflection", "jobTitle", "company", "location", "program", "data", "gpa", "studentId"],
        lookUps : ["email", "id", "role", "status"],
        booleans : ["rememberMe"]
    }
}

export const LIST_CRITERIA = {
    sorting : {
        general : ["firstName", "lastName", "email", "createdAt"],
        student : ["applications", "status", "studentId", "program", "year", "gpa"],
        supervisor : ["company", "status", "jobTitle"],
    },
    order : ["asc", "desc"]
};

export const API = {
    prefixes : {
        user : "/api/user",
        auth : "/api/auth",
        applications : "/api/applications",
        reflections : "/api/reflections",
        progressForms : "/api/progress-forms"
    }
};

export const TOKEN_OPTIONS = {
    refreshCookie : {
        secure : false,              // only used with https
        httpOnly : true,            // only accessible by a web server
        path : '/',                 // cookie is visible to all routes
        sameSite : "lax"            // allows cookie to be sent across websites
    },
    access : { expiresIn : '1d' },
    refreshShort : { expiresIn : '1d' },
    refreshLong : { expiresIn : '7d' },
    sev_day_milli : 7*24*60*60*1000,
};