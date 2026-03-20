import { HTTPError } from "./errors.js";
import { USER_DETAILS } from "./constants.js";
import { getSafeUser, getUserByEmail, findUserInDatabase, getUserById } from "./database-services.js";
import { isValidStatusUpdate, isValidLoginAttempt } from "./validate.js";
import { ROLE_OPERATIONS } from "./auth-constants.js";

export function validateLogin(req, res, next) {
    const {email, password} = req.body;

    try {
        if (!isValidLoginAttempt(email, password)) { throw new HTTPError("Invalid login credentials", 400); }

        const user = getUserByEmail(email);

        // TODO: update when database implemented
        if (user.password !== password) { throw new HTTPError("Login information does not match", 400); }

        const safeUser = getSafeUser(user);

        // user is valid, can safely update the user field in req for further use
        req.user = safeUser;
        next();
    } catch(error) {
        next(error);
    }
};

export function validateRegister(req, res, next) {
    const {email, role} = req.body;
    try {
        const roleOperations = ROLE_OPERATIONS[role];
        if (!role || !roleOperations) { throw new HTTPError("User type missing or invalid", 400); }
        // TODO: add isBasicUser fuction?
        // if (!isBasicUser(registerInfo)) { throw new HTTPError("Missing fields or invalid credentials", 400); }
        if (findUserInDatabase(email)) { throw new HTTPError("User already exists", 409); }

        if (!roleOperations.validate(req.body)) { throw new HTTPError("Missing fields or invalid credentials", 400); }
        
        next();
    } catch (error) {
        next(error);
    }
}

export function validateStatusUpdate(req, res, next) {
    // the user that made this request
    const caller = req.user;
    const { status } = req.body;

    if (caller.role !== USER_DETAILS.roles.coordinator && caller.role !== USER_DETAILS.roles.admin) { throw new HTTPError("Missing permissions", 403); }
    if (!isValidStatusUpdate(status)) { throw new HTTPError("Missing fields or invalid update", 400); }
    try {
        // the user we are modifying
        const user = getUserById(req.params.id);
        req.targetUser = user;
        next();
    } catch(error) {
        next(error);
    }
}

export function validateLogout(req, res, next) {
    const cookie = req.cookies.refreshToken;
    try {
        if (!cookie) { throw new HTTPError("Missing cookie or already logged out", 400); }
        next();
    } catch (error) { next(error); }
}