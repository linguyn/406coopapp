import { HTTPError } from "../errors.js";
import { USER_DETAILS } from "../constants.js";
import { getSanitizedUser, getUserByEmail, isEmailTaken, getUserById } from "../database-services.js";
import { isValidStatusUpdate, isValidLogin } from "../validate.js";
import { ROLE_OPERATIONS } from "../auth-services.js";

export function validateLogin(req, res, next) {
    const {email, password} = req.body;

    try {
        if (!isValidLogin(email, password)) { throw new HTTPError("Invalid login credentials", 422); }

        const user = getUserByEmail(email);

        // TODO: update when database implemented
        if (user.password !== password) { throw new HTTPError("Login information does not match", 422); }

        // user is valid, can safely update the user field in req for further use
        req.user = user;
        next();
    } catch(error) {
        next(error);
    }
};

export function validateRegister(req, res, next) {
    const {email, role, password, passwordAgain} = req.body;
    try {
        const roleOperations = ROLE_OPERATIONS[role];

        if (password != passwordAgain) { throw new HTTPError("Passwords do not match", 422); }
        if (!roleOperations.validate(req.body)) { throw new HTTPError("Missing fields or invalid format", 422); }
        if (isEmailTaken(email)) { throw new HTTPError("Email taken by another user", 409); }

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

export function validateListRequest(req, res, next) {
    const { role } = req.query;
    try {
        if (!role) { throw new HTTPError("Missing parameters", 422); }
        if (!(role in USER_DETAILS.roles)) { throw new HTTPError("Invalid parameters", 400); }

        next();
    } catch(error) {
        next(error);
    }
}