import { HTTPError } from "../errors.js";
import { USER_DETAILS } from "../constants.js";
import { isValidStatusUpdate, isValidLogin } from "../validate-services.js";
import { VALIDATE_OPERATIONS } from "../auth-services.js";
import { getUserByEmail, getUserByEmailAllRoles } from "../routes/user.js";

export async function validateLogin(req, res, next) {
    const {email, password, role } = req.body;

    try {
        if (!isValidLogin(email, password)) { throw new HTTPError("Invalid login credentials", 422); }

        const user = await getUserByEmail(role, email);

        if (!user) { throw new HTTPError("Could not find a user", 404); }

        if (user.password !== password) { throw new HTTPError("Login information does not match", 422); }

        // user is valid, can safely update the user field in req for further use
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

export async function  validatePermissions(req, res, next) {
    const user = req.user;
    if (user.role === USER_DETAILS.roles.coordinator || user.role === USER_DETAILS.roles.admin) { next(); }
    else { throw new HTTPError("Invalid user permissions.", 403); }
}

export async function validateRegister(req, res, next) {
    const { email, role, password, passwordAgain } = req.body;
    try {
        const roleOperations = VALIDATE_OPERATIONS[role];

        if (password != passwordAgain) { throw new HTTPError("Passwords do not match", 422); }
        if (!roleOperations.validate(req.body)) { throw new HTTPError("Missing fields or invalid format 1", 422); }
        if (await getUserByEmailAllRoles(email)) { throw new HTTPError("Email taken by another user", 409); }

        next();
    } catch (error) {
        next(error);
    }
}

const baseFields = ["firstName", "lastName", "email", "password"];
const studentFields = [...baseFields, "location", "year", "gpa", "resume", "coverLetter", "transcript", "reflection"];
const supervisorFields = [...baseFields, "location", "interns", "company"];

const allowedUpdates = {
    student: studentFields,
    supervisor: supervisorFields,
    coordinator: [...baseFields],
    coordinatorOther: [...studentFields, ...supervisorFields, "isApplicant"],
    admin: [...baseFields],
    adminOther: [...studentFields, ...supervisorFields, "isApplicant"]
}

function isValidCaller(callerRole, userRole) {
    if (callerRole === USER_DETAILS.roles.coordinator || callingUser.role === USER_DETAILS.roles.admin) { return true; }
    return callerRole === userRole;
}

export function validateUserUpdate(req, res, next) {
    const callingUser = req.user;
    const callingUserRole = callingUser.role;
    const { userRole, userId } = req.params;
    const reqFields = req.body;

    if (!userRole || !userId) { throw new HTTPError("Missing parameters role or userId", 422); }

    let roleScope = callingUserRole;

    try {
        if (!isValidCaller(callingUserRole, userRole)) { throw new HTTPError("Missing permissions to update user", 403); }

        if (callingUserRole !== userRole) {
            if (callingUserRole === "coordinator") {
                roleScope = "coordinatorOther";
            } else if (callingUserRole === "admin") {
                roleScope = "adminOther";
            }
        }

        let fieldsToUpdate = {};

        // update for general user (universal for each user type) and then after for the specific role scope
        allowedUpdates[user].forEach((field) => {
            const reqFieldsVal = reqFields[field];
            if (reqFieldsVal !== null) { fieldsToUpdate[field] = reqFieldsVal; }
        });
        allowedUpdates[roleScope].forEach((field) => {
            const reqFieldsVal = reqFields[field];
            if (reqFieldsVal !== null) { fieldsToUpdate[field] = reqFieldsVal; }
        });

        req.update = fieldsToUpdate;
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
    } catch (error) {
        next(error);
    }
}