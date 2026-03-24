import { validateLogin, validateLogout, validateRegister } from '../middleware/validation.js';
import { ROLE_OPERATIONS } from '../auth-services.js';
import express from 'express';
import { generateAccessToken, generateRefreshToken } from '../server.js';
import { getSanitizedUser, getUserById } from '../database-services.js';
import { TOKEN_OPTIONS, USER_DETAILS } from '../constants.js';
import jwt from 'jsonwebtoken';
import { sanitizeRegister, sanitizeLogin } from '../middleware/data-sanitization.js';

export const authRouter = express.Router();

/**
 * @api {POST} /api/auth/login
 * @description Authenticates the user
 * IMPORTANT: requires the withCredentials (axios) or credentials (fetch) property to be true to save the cookie
 * @body {String} email - The user's email
 * @body {String} password - The user's password
 * @body {Boolean} rememberMe - if true, extends the life span of the refresh token
 * @success {200} {Object} - Returns the user's information and authorizes new access and refresh tokens
 * @error {422} {Object} - Invalid login credentials format
 * @error {401} {Object} - User not found
 * @error {500} {Object} - Internal server error
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Logs in an existing user
 *     description: Takes login information and verifies the user exists in the database. Returns newly issued access and refresh tokens and the sanitized user in the response. A sanitized user excludes sensitive information such as a password.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required: [email, password]
 *             properties:
 *               email: { type: string, example: jinwoo@example.ca }
 *               password: { type: string, example: password123 }
 *               rememberMe: { type: boolean, example: true }
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/StudentSanitized'
 *                 - $ref: '#/components/schemas/SupervisorSanitized'
 *                 - $ref: '#/components/schemas/CoordinatorSanitized'
 *             examples:
 *               student:
 *                 $ref: '#/components/examples/StudentSanitized'
 *               supervisor:
 *                 $ref: '#/components/examples/SupervisorSanitized'
 *               coordinator:
 *                 $ref: '#/components/examples/CoordinatorSanitized'
 *       422:
 *         description: Missing login fields or invalid format
 *       401:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

authRouter.post('/login', sanitizeLogin, validateLogin, (req, res, next) => {
    const user = req.user;
    const rememberMe = req.body.rememberMe;

    const accessToken = generateAccessToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id, user.role, rememberMe);

    const cookieOptions = {...TOKEN_OPTIONS.refreshCookie};
    if (rememberMe) { cookieOptions.maxAge = TOKEN_OPTIONS.sev_day_milli; }

    res.cookie("refreshToken", refreshToken, cookieOptions)

    // send back a valid access token and a "safe" version of user's details
    return res.status(200).json({
        accessToken : accessToken,
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
 * @success {200} {Object} - Returns the user's information
 * @error {400} {Object} - Invalid login credentials format
 * @error {409} {Object} - User already exists
 * @error {500} {Object} - Internal server error  
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Takes user registration information, validates the info (e.g. checking if email is taken, password matches re-entered password, etc.), creates a new record of the user in the database, and returns the sanitized user in the response. A sanitized user excludes sensitive information such as a password.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *             - $ref: '#/components/schemas/StudentRegister'
 *             - $ref: '#/components/schemas/SupervisorRegister'
 *             - $ref: '#/components/schemas/CoordinatorRegister'
 *           examples:
 *             student:
 *               $ref: '#/components/examples/StudentRegister'
 *             supervisor:
 *               $ref: '#/components/examples/SupervisorRegister'
 *             coordinator:
 *               $ref: '#/components/examples/CoordinatorRegister'
 *           discriminator:
 *             propertyName: role
 *     responses:
 *       201:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/StudentSanitized'
 *                 - $ref: '#/components/schemas/SupervisorSanitized'
 *                 - $ref: '#/components/schemas/CoordinatorSanitized'
 *             examples:
 *               student:
 *                 $ref: '#/components/examples/StudentSanitized'
 *               supervisor:
 *                 $ref: '#/components/examples/SupervisorSanitized'
 *               coordinator:
 *                 $ref: '#/components/examples/CoordinatorSanitized'
 *       422:
 *         description: Missing registration fields or invalid format
 *       409:
 *         description: Email taken by an existing user
 *       500:
 *         description: Internal server error
 */

authRouter.post('/register', sanitizeRegister, validateRegister, (req, res, next) => {
    const { role } = req.body;

    try {
        const user = ROLE_OPERATIONS[role].add(req.body);
        const safeUser = getSanitizedUser(user, USER_DETAILS.safeFields[role]);

        // send back a "safe" version of user's details
        return res.status(201).json({
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
            accessToken : accessToken
        })
    } catch(error) { 
        next(error); 
    }
});
