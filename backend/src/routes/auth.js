import { validateLogin, validateLogout, validateRegister } from '../validation-middleware.js';
import { ROLE_OPERATIONS } from '../auth-constants.js';
import express from 'express';
import { generateAccessToken, generateRefreshToken } from '../server.js';
import { getSafeUser, getUserById } from '../database-services.js';
import { TOKEN_OPTIONS } from '../constants.js';
import jwt from 'jsonwebtoken';

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

    // send back a valid access token and a "safe" version of user's details
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

    try {
        const user = ROLE_OPERATIONS[role].add(req.body);
        const safeUser = getSafeUser(user);

        const accessToken = generateAccessToken(user.id, user.role);
        const refreshToken = generateRefreshToken(user.id, user.role, rememberMe);

        // copy refresh cookie options and set a maxAge of 7 days if requested
        const cookieOptions = {...TOKEN_OPTIONS.refreshCookie};
        if (rememberMe) { cookieOptions.maxAge = TOKEN_OPTIONS.sev_day_milli; }

        res.cookie("refreshToken", refreshToken, cookieOptions);

        // send back a valid access token and a "safe" version of user's details
        return res.status(201).json({
            token : accessToken,
            user : safeUser
        });
    } catch(error) { 
        next(error);
    }    
});

/**
 * @api {POST} /api/auth/refresh-token
 * @description Refreshes the user's access token given their refresh token is still valid
 * IMPORTANT: requires the withCredentials (axios) or credentials (fetch) property to be true when sending the cookie
 * @header {Cookie} refreshToken - The user's refresh token, used to verify their identity
 * @success {200} {Object} token - The user's new access token
 * @error {401} {Object} - Unauthorized, the refresh token is missing, expired, or the user doesn't exist
 * @error {403} {Object} - Forbidden, the refresh token has been tampered with
 * @error {500} {Object} - Internal server error
 */

authRouter.post('/refresh-token', (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    try {
        if (!refreshToken) { throw new HTTPError("Session expired", 401); }
        const decodedPayload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const role = getUserById(decodedPayload.sub).role;
        const accessToken = generateAccessToken(decodedPayload.sub, role);
        
        return res.status(200).json({
            token : accessToken
        })
    } catch(error) { 
        next(error); 
    }
});
