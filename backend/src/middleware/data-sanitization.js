import { HTTPError } from "../errors.js";
import { CLEANING, REGISTRATION_FIELDS } from "../constants.js";

/**
 * @function sanitize
 * @description Checks if the request body contains required fields and normalizes fields given by options
 * @param {Array} requiredFields - array of required string field names
 * @param {Array} optionalFields - array of optional string field names
 * @param {Object} options - object containing array options, which each specify string field names
 * @success - Moves on to next point in middleware
 * @error {422} {Object} - Missing/invalid fields
 */

function sanitize(requiredFields = [], optionalFields = [], options = { trimOnly : [], lookUps : [], booleans : []}) {
    return (req, res, next) => {
        try {
            const allFields = [
                ...requiredFields.map((field) => { return {name : field, required : true} }),
                ...optionalFields.map((field) => { return {name : field, required : false} })
            ];

            for (const {name, required} of allFields) {
                if (!(name in req.body) && required) { throw new HTTPError(`Missing required field: ${name}`, 422); }
                
                let value;
                if (name in req.body) { value = req.body[name]; }
                else { value = null; }

                const isTrim = options.trimOnly.includes(name);
                const isLookUp = options.lookUps.includes(name);
                const isBoolean = options.booleans.includes(name);

                if (required && typeof value !== "string" && (isTrim || isLookUp)) { 
                    throw new HTTPError(`Invalid ${name} format`, 422);
                }

                if (typeof value === "string" && value !== null) {
                    if (isTrim || isLookUp) { value = value.trim(); } 
                    if (isLookUp) { value = value.toLowerCase(); }
                }
                if (isBoolean) {
                    if (value === "true") {  value = true; }
                    else if (value === "false") { value = false; }
                    if (!required && typeof value !== "boolean") { value = false; }
                    else if (required && typeof value !== "boolean") { 
                        throw new HTTPError(`Invalid ${name} format`, 422);
                    }
                }

                if (required && (value === "" || value === undefined || value === null)) { 
                    throw new HTTPError(`Missing required field: ${name}`, 422); 
                }
                if (!required && (value === "" || value === undefined)) { value = null; }

                req.body[name] = value;
            };
            next();
        } catch(error) {
            next(error);
        }
    }
}

/**
 * @function sanitizeLogin
 * @description Uses sanitize with the standard login fields
 * @success - Moves on to next point in middleware
 */

export function sanitizeLogin(req, res, next) {
    const required = ["email", "password"];
    const optional = ["rememberMe"];
    sanitize(required, optional, CLEANING.options)(req,res,next);
}

const reqRegister = {
    student : ["studentId"],
    coordinator : [],
    supervisor : ["company"]
}

const optRegister = {
    student : ["report", "reflection", "applications", "status", "location", "resume", "coverLetter", "transcript", "program", "gpa", "year"],
    coordinator : [],
    supervisor : ["jobTitle", "status", "location", "interns"]
}

/**
 * @function sanitizeRegister
 * @description Uses sanitize with role-specific registration fields
 * @success - Moves on to next point in middleware
 * @error {422} {Object} - Missing the role field
 */

export function sanitizeRegister(req, res, next) {
    const { role } = req.body;
    try {
        if (!role || !reqRegister[role]) {
            throw new HTTPError("Missing required field: role", 422);
        }

        const required = ["role", "firstName", "lastName", "email", "password", ...reqRegister[role]];
        const optional = ["rememberMe", ...optRegister[role]];
        
        return sanitize(required, optional, CLEANING.options)(req, res, next);
    } catch(error) {
        next(error);
    }
}