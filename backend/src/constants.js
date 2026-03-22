export const USER_DETAILS = {
    roles : {
        student : "student",
        supervisor : "supervisor",
        coordinator : "coordinator",
        admin : "admin"
    },
    studentStatuses : ["applying", "applied", "accepted", "rejected", "waitlisted", "probation"],
}

export const API = {
    prefixes : {
        user : "/api/user",
        auth : "/api/auth"
    }
}

export const TOKEN_OPTIONS = {
    refreshCookie : {
        secure : false,              // only used with https
        httpOnly : true,            // only accessible by a web server
        path : '/',                 // cookie is visible to all routes
        sameSite : "lax"            // allows cookie to be sent across websites
    },
    access : { expiresIn : '15m' },
    refreshShort : { expiresIn : '1d' },
    refreshLong : { expiresIn : '7d' },
    sev_day_milli : 7*24*60*60*1000,
}