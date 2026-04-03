import { validateLogin, validateLogout, validateRegister } from '../middleware/validation.js';
import express from 'express';
import { generateAccessToken, generateRefreshToken } from '../server.js';
import { getGlobalStats } from '../database-services.js';
import { TOKEN_OPTIONS } from '../constants.js';
import jwt from 'jsonwebtoken';
import { sanitizeRegister, sanitizeLogin } from '../middleware/data-sanitization.js';
import { UserLoginResponse } from '../response-classes/UserLoginResponse.js';
import Student from '../models/Student.js';
import Coordinator from '../models/Coordinator.js';
import Supervisor from '../models/Supervisor.js';
import { getModelByRole } from './user.js';

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
 *     security:
 *       - []
 *     summary: Logs in an existing user
 *     description: Takes login information and verifies the user exists in the database. Returns newly issued access and refresh tokens and the sanitized user in the response. A sanitized user excludes sensitive information such as a password.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required: [email, password, role]
 *             properties:
 *               email: { type: string, example: jinwoo@example.ca }
 *               password: { type: string, example: password123 }
 *               role: { type: string, example: student }
 *               rememberMe: { type: boolean, example: true }
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/StudentLoginRes'
 *                 - $ref: '#/components/schemas/SupervisorLoginRes'
 *                 - $ref: '#/components/schemas/CoordinatorLoginRes'
 *             examples:
 *               student:
 *                 $ref: '#/components/examples/StudentLoginResEx'
 *               supervisor:
 *                 $ref: '#/components/examples/SupervisorLoginResEx'
 *               coordinator:
 *                 $ref: '#/components/examples/CoordinatorLoginResEx'
 *       422:
 *         description: Missing login fields or invalid format
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

authRouter.post('/login', sanitizeLogin, validateLogin, (req, res, next) => {
    const user = req.user;

    const rememberMe = req.body.rememberMe;
    const stats = getGlobalStats();
    const safeUser = UserLoginResponse.createUserLoginResponse(user, stats);

    const accessToken = generateAccessToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id, user.role, rememberMe);

    const cookieOptions = { ...TOKEN_OPTIONS.refreshCookie };
    if (rememberMe) { cookieOptions.maxAge = TOKEN_OPTIONS.sev_day_milli; }

    res.cookie("refreshToken", refreshToken, cookieOptions)

    // send back a valid access token and a "safe" version of user's details
    return res.status(200).json({
        accessToken: accessToken,
        user: safeUser
    });
});

/**
 * @api {POST} /api/auth/logout
 * @description Logs out user by clearing their refresh token cookie (removing their auth)
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary:
 *     description:
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: cookie
 *         name: refreshToken
 *         description: The refresh token stored in an HTTP-only cookie
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               required: [message]
 *               type: object
 *               properties:
 *                 message: { type: string, example: Successfully logged out }
 *       400:
 *         description: Missing cookie or user already logged out
 *       500:
 *         description: Internal server error
 */

authRouter.post('/logout', validateLogout, (req, res, next) => {
    res.clearCookie("refreshToken", TOKEN_OPTIONS.refreshCookie);
    return res.status(200).json({ message: "Successfully logged out" })
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
 *     security:
 *       - []
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
 *             - $ref: '#/components/schemas/StudentRegisterReq'
 *             - $ref: '#/components/schemas/SupervisorRegisterReq'
 *             - $ref: '#/components/schemas/CoordinatorRegisterReq'
 *           examples:
 *             student:
 *               $ref: '#/components/examples/StudentRegisterReqEx'
 *             supervisor:
 *               $ref: '#/components/examples/SupervisorRegisterReqEx'
 *             coordinator:
 *               $ref: '#/components/examples/CoordinatorRegisterReqEx'
 *     responses:
 *       201:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/StudentRegisterRes'
 *                 - $ref: '#/components/schemas/SupervisorRegisterRes'
 *                 - $ref: '#/components/schemas/CoordinatorRegisterRes'
 *             examples:
 *               student:
 *                 $ref: '#/components/examples/StudentRegisterResEx'
 *               supervisor:
 *                 $ref: '#/components/examples/SupervisorRegisterResEx'
 *               coordinator:
 *                 $ref: '#/components/examples/CoordinatorRegisterResEx'
 *       422:
 *         description: Missing registration fields or invalid format
 *       409:
 *         description: Email taken by an existing user
 *       500:
 *         description: Internal server error
 */

authRouter.post('/register', sanitizeRegister, validateRegister, async (req, res, next) => {
    const { role } = req.body;

    try {
        if (role === 'student') {
            const newStudent = new Student(req.body);
            await newStudent.save();
            return res.status(201).json({ message: "Student saved!" }); //message and data can be removed at a later time if not being used.
        }

        if (role === 'coordinator') {
            const newCoordinator = new Coordinator(req.body);
            await newCoordinator.save();
            return res.status(201).json({ message: "Coordinator saved!" }); //message and data can be removed at a later time.
        }
        if (role === 'supervisor') {
            const newSupervisor = new Supervisor(req.body);
            await newSupervisor.save();
            return res.status(201).json({ message: "Supervisor saved!" }); //message and data can be removed at a later time.
        }


        return res.status(400).json({ message: "Invalid role specified." });

        // const user = ROLE_OPERATIONS[role].add(req.body); // replace this line of code with the server.js 
        // const safeUser = getSanitizedUser(user, USER_DETAILS.safeFields[role]);

        // send back a "safe" version of user's details
    } catch (error) {
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

/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     security:
 *       - []
 *     summary: Get a new access token
 *     description: Given that a valid refresh token is provided in the cookie "refreshToken", this returns a new valid access token and the sanitized user in the response.
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: cookie
 *         name: refreshToken
 *         description: The refresh token stored in an HTTP-only cookie
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Successfully created and returned a new access token
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/StudentLoginRes'
 *                 - $ref: '#/components/schemas/SupervisorLoginRes'
 *                 - $ref: '#/components/schemas/CoordinatorLoginRes'
 *             examples:
 *               student:
 *                 $ref: '#/components/examples/StudentLoginResEx'
 *               supervisor:
 *                 $ref: '#/components/examples/SupervisorLoginResEx'
 *               coordinator:
 *                 $ref: '#/components/examples/CoordinatorLoginResEx'
 *       401:
 *         description: Session expired, please obtain a valid refresh token
 *       404:
 *         description: User doesn't exist
 *       500:
 *         description: Internal server error
 */

authRouter.post('/refresh-token', async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    try {

        if (!refreshToken) { throw new HTTPError("Session expired", 401); }

        const { userId, role } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const Model = getModelByRole(role);
        const user = await Model.findById(userId);

        if (!user) { throw new HTTPError("Could not find a user", 404); }

        const accessToken = generateAccessToken(userId, user.role);

        const stats = getGlobalStats();
        const safeUser = UserLoginResponse.createUserLoginResponse(user, stats);

        return res.status(201).json({
            accessToken: accessToken,
            user: safeUser
        })
    } catch (error) {
        next(error);
    }
});