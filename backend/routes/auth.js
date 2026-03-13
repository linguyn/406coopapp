import { validateLogin, validateLogout, validateRegister, USER_OPERATIONS } from '../validate.js';
import express from 'express';
import { authenticateToken, generateAccessToken, generateRefreshToken } from '../server.js';
import { getSafeUser } from '../database-services.js';

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

    const accessToken = generateAccessToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id, user.role);

    res.cookie("refreshToken", refreshToken, {
        secure : true,              // only used with https
        httpOnly : true,            // only accessible by a web server
        maxAge : 7*24*60*60*1000    // 7 days in milliseconds
    })

    return res.status(200).json({
        token : accessToken,
        user : user
    });
});

authRouter.post('/logout', validateLogout, authenticateToken, (req, res, next) => {
    // TODO: logout logic - clears user's cookies so they no longer have a valid refresh token
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
    const { role } = req.body;
    const roleOperations = USER_OPERATIONS[role];

    try {
        const user = roleOperations.add(req.body);
        const safeUser = getSafeUser(user);

        const accessToken = generateAccessToken(user.id, user.role);
        const refreshToken = generateRefreshToken(user.id, user.role);

        res.cookie("refreshToken", refreshToken, {
            secure: true,
            httpOnly : true,
            maxAge : 7*24*60*60*1000
        })

        return res.status(201).json({
            token : accessToken,
            user : safeUser
        });
    } catch(error) { 
        next(error);
    }    
});