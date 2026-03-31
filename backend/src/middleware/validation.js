import { HTTPError } from "../errors.js";
import { USER_DETAILS } from "../constants.js";
import { isValidStatusUpdate, isValidLogin } from "../validate-services.js";
import { VALIDATE_OPERATIONS } from "../auth-services.js";
import Student from '../models/Student.js';
import Coordinator from '../models/Coordinator.js';
import Supervisor from '../models/Supervisor.js';

async function getUserByEmail(email) {
    let user = null;

    if (user = await Student.findOne({ email })) { }
    else if (user = await Supervisor.findOne({ email })) { }
    else if (user = await Coordinator.findOne({ email })) { }

    return user;
}

export async function validateLogin(req, res, next) {
    const { email, password } = req.body;

    try {
        if (!isValidLogin(email, password)) { throw new HTTPError("Invalid login credentials", 422); }

        const user = getUserByEmail(email);

        if (!user) { throw new HTTPError("Could not find a user", 404); }

        // TODO: update when database implemented
        if (user.password !== password) { throw new HTTPError("Login information does not match", 422); }

        // user is valid, can safely update the user field in req for further use
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

export function validateRegister(req, res, next) {
    const { email, role, password, passwordAgain } = req.body;
    try {
        const roleOperations = VALIDATE_OPERATIONS[role];

        if (password != passwordAgain) { throw new HTTPError("Passwords do not match", 422); }
        if (!roleOperations.validate(req.body)) { throw new HTTPError("Missing fields or invalid format", 422); }
        if (!getUserByEmail(email)) { throw new HTTPError("Email taken by another user", 409); }

        next();
    } catch (error) {
        next(error);
    }
}

const allowedUpdates = {
    user: ["firstName", "lastName", "email", "password"],
    student: ["isApplicant", "location", "status", "year", "gpa", "resume", "coverLetter", "transcript", "reflection"],
    supervisor: ["location", "status", "interns", "company"],
    coordinator: []
}

function isValidCaller(callerRole, userRole, userId) {
    if (callerRole === USER_DETAILS.roles.coordinator || callingUser.role === USER_DETAILS.roles.admin) { return true; }
    return callerRole === userRole;
}

export function validateUserUpdate(req, res, next) {
    const callingUser = req.user;
    const callingUserRole = callingUser.role;
    const { role, userId } = req.params;
    const reqFields = req.body;

    if (!isValidCaller(callingUserRole, userRole, userId)) { throw new HTTPError("Missing permissions", 403); }

    let fieldsToUpdate = {};
    // todo: change so not all fields corresponding to a role in allowedUpdates are modifiable by that role (e.g. isApplicant)
    switch (callingUserRole) {
        case "coordinator":
        case "admin":
            for (const key in allowedUpdates) {
                allowedUpdates[key].forEach((field) => {
                    const reqFieldsVal = reqFields[field];
                    if (reqFieldsVal !== null) { fieldsToUpdate[field] = reqFieldsVal }
                })
            }
            break;
        case "supervisor":
            allowedUpdates[callingUserRole].forEach((field) => {
                
            })
            break;
        case "student":
            break;
        default:

    }


    if (!isValidStatusUpdate(role, status)) { throw new HTTPError("Missing fields or invalid update", 400); }
    next();
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
    } catch (error) {
        next(error);
    }
}