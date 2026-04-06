import express from 'express';
export const applicationsRouter = express.Router();

import { updateApplication, addApplicationToDatabase } from '../database-services.js';
import { isValidEmail, hasValidReason } from '../validate-services.js';
import { HTTPError } from '../errors.js';
import { authenticateToken } from '../server.js';
import Application from '../models/Application.js';
import { getUserByEmail } from './user.js';

/**
 * @api {POST} /api/applications/submit
 * @description Submits a student application
 * @body {String} firstName - Student's first name
 * @body {String} lastName - Student's last name
 * @body {String} studentId - Student's ID
 * @body {String} schoolEmail - Student's school email
 * @body {Boolean} eligibleToWork - Eligible to work status
 * @body {String} reasonForJoining - Reason for joining (max 150 words)
 * @body {String} [portfolioLink] - Optional portfolio link
 * @success {201} {Object} - Application submitted successfully
 * @error {400} {Object} - Invalid or missing fields
 * @error {500} {Object} - Internal server error
 */

/**
 * @swagger
 * /api/applications/submit:
 *   post:
 *     summary: Submits an application
 *     description: Saves an application to the database and associates it with its student
 *     tags:
 *       - Documents
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApplicationSubmitReq'
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApplicationSubmitRes'
 *       400:
 *         description: Request fields are required
 *       404:
 *         description: Student not found
 *       500: 
 *         description: Internal server error
 */

applicationsRouter.post('/submit', authenticateToken, async(req, res, next) => {
    const { firstName, lastName, studentId, schoolEmail, eligibility, reasonToApply, portfolioLink } = req.body;
    try {
        if (!firstName || !firstName.trim() || !lastName || !lastName.trim()) { throw new HTTPError(400, "First and last name is required"); }        if (!studentId || !studentId.trim()) { throw new HTTPError(400, "Student ID is required"); }
        if (!schoolEmail ||!isValidEmail(schoolEmail)) { throw new HTTPError(400, "Valid school email is required"); }
        if (!studentId || !studentId.trim()) { throw new HTTPError(400, "Student ID is required"); }
        if (!schoolEmail || !isValidEmail(schoolEmail)) { throw new HTTPError(400, "Valid school email is required"); }
        if (typeof eligibility !== "boolean") { throw new HTTPError(400, "Eligibility must be a boolean value"); }
        if (!reasonToApply || !hasValidReason(reasonToApply)) { throw new HTTPError(400, "Reason to apply must be 150 words or less"); }

        const studentUser = await getUserByEmail("student", schoolEmail);
        if (!studentUser) { throw new HTTPError(404, "Student not found"); }

        const newApplication = new Application({ ...req.body, assignedStudent: studentUser._id });
        await newApplication.save();

        return res.status(201).json({ 
            message: "Application submitted successfully", 
            applicationId: newApplication.id
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/applications/update/{id}:
 *   patch:
 *     summary: Updates an application
 *     description: Finds a application based on the user id and email, and updates and returns their application
 *     tags:
 *       - Documents
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: "1241r3h0qidsakn"
 *         required: true
 *         description: The user's id
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApplicationUpdateReq'
 *     responses:
 *       200:
 *         description: Successfully updated the application
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApplicationUpdateRes'
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */

applicationsRouter.patch('/update/:id', authenticateToken, async (req, res, next) => {
    try {
        const userId = req.params.id;
        const updateData = { ...req.body };

        if (req.body.schoolEmail) {
            const studentUser = await getUserByEmail("student", req.body.schoolEmail);
            if (!studentUser) { throw new HTTPError(404, "Student not found"); }
            updateData.assignedStudent = studentUser._id;
        }

        const updatedApplication = await Application.findByIdAndUpdate(
            userId,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );
        return res.status(200).json({
            message: "Application updated successfully",
            application: updatedApplication
        });
    } catch (error) {
        next(error);
    }
});