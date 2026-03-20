import { validateLogin, validateLogout, validateRegister, USER_OPERATIONS } from '../validate.js';
import express from 'express';
import { authenticateToken, generateAccessToken, generateRefreshToken } from '../server.js';
import { getSafeUser } from '../database-services.js';
import { TOKEN_OPTIONS } from '../constants.js';

export const authRouter = express.Router();

/**
 * @api {POST} /api/auth/login
 * @description Authenticates the user
 * IMPORTANT: requires the withCredentials (axios) or credentials (fetch) property to be true to save the cookie
 * @body {String} email - The user's email
 * @body {String} password - The user's password
 * @success {200} {Object} - Returns the user's information and authorizes new access and refresh tokens
 * @error {400} {Object} - Invalid login credentials format
 * @error {401} {Object} - User not found
 * @error {500} {Object} - Internal server error
 */

authRouter.post('/login', validateLogin, (req, res, next) => {
    const user = req.user;
    const rememberMe = req.body.rememberMe || false;

    const accessToken = generateAccessToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id, user.role, rememberMe);

    const cookieOptions = {...TOKEN_OPTIONS.refreshCookie};
    if (rememberMe) { cookieOptions.maxAge = TOKEN_OPTIONS.sev_day_milli; }

    res.cookie("refreshToken", refreshToken, cookieOptions)

    return res.status(200).json({
        token : accessToken,
        user : user
    });
});

/**
 * @api {POST} /api/auth/logout
 * @description Logs out user by clearing their refresh token cookie (removing their auth)
 */

authRouter.post('/logout', validateLogout, (req, res, next) => {
    res.clearCookie("refreshToken", TOKEN_OPTIONS.refreshCookie);
    return res.status(200).json({message : "Successfully logged out"})
});

/**
 * @api {POST} /api/auth/register
 * @description Registers a user to the database
 * @body {String} role - The user's role
 * @body {Object} otherRegistrationInfo - Other information relevant to the user's registration
 * Note: complete list of registration information has yet to be implemented in this feature
 * @success {200} {Object} - Returns the user's information and authorizes new access and refresh tokens
 * @error {400} {Object} - Invalid login credentials format
 * @error {409} {Object} - User already exists
 * @error {500} {Object} - Internal server error
 */

authRouter.post('/register', validateRegister, (req, res, next) => {
    const { role, rememberMe = false } = req.body;
    const roleOperations = USER_OPERATIONS[role];

    try {
        const user = roleOperations.add(req.body);
        const safeUser = getSafeUser(user);

        const accessToken = generateAccessToken(user.id, user.role);
        const refreshToken = generateRefreshToken(user.id, user.role, rememberMe);

        // copy refresh cookie options and set a maxAge of 7 days if requested
        const cookieOptions = {...TOKEN_OPTIONS.refreshCookie};
        if (rememberMe) { cookieOptions.maxAge = TOKEN_OPTIONS.sev_day_milli; }

        res.cookie("refreshToken", refreshToken, cookieOptions);

        return res.status(201).json({
            token : accessToken,
            user : safeUser
        });
    } catch(error) { 
        next(error);
    }    
});