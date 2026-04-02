import express from 'express';
export const applicationsRouter = express.Router();

import { updateApplication, addApplicationToDatabase } from '../database-services.js';
import { isValidEmail, hasValidReason } from '../validate-services.js';
import { HTTPError } from '../errors.js';
import { authenticateToken } from '../server.js';

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

applicationsRouter.post('/submit', authenticateToken, (req, res, next) => {
    const { firstName, lastName, studentId, schoolEmail, eligibility, reasonToApply, portfolioLink } = req.body;
    try {
        if (!firstName || !firstName.trim() || !lastName || !lastName.trim()) { throw new HTTPError(400, "First and last name is required"); }        if (!studentId || !studentId.trim()) { throw new HTTPError(400, "Student ID is required"); }
        if (!schoolEmail ||!isValidEmail(schoolEmail)) { throw new HTTPError(400, "Valid school email is required"); }
        if (!studentId || !studentId.trim()) { throw new HTTPError(400, "Student ID is required"); }
        if (!schoolEmail || !isValidEmail(schoolEmail)) { throw new HTTPError(400, "Valid school email is required"); }
        if (typeof eligibility !== "boolean") { throw new HTTPError(400, "Eligibility must be a boolean value"); }
        if (!reasonToApply || !hasValidReason(reasonToApply)) { throw new HTTPError(400, "Reason to apply must be 150 words or less"); }

        const newApp = addApplicationToDatabase({firstName, lastName, studentId, schoolEmail, eligibility, reasonToApply, portfolioLink});
        return res.status(201).json({ 
            message: "Application submitted successfully", 
            applicationId: newApp.id
        });
    } catch (error) {
        next(error);
    }
});

applicationsRouter.patch('/update/:id', authenticateToken, (req, res, next) => {
    try {
        const updatedApplication = updateApplication(parseInt(req.params.id), req.body);
        return res.status(200).json({
            message: "Application updated successfully",
            application: updatedApplication
        });
    } catch (error) {
        next(error);
    }
});