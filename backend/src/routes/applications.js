const express = require('express');
const appRouter = express.Router();

import { tempApplications } from '../database-services.js';
import { hasValidEmail, hasValidReason } from '../validate.js';
import { HTTPError } from '../errors.js'
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

appRouter.post('/submit', authenticateToken, (req, res, next) => {
    const { firstName, lastName, studentId, schoolEmail, eligibility, reasonToApply, portfolioLink } = req.body;
    try {
        if (!firstName.trim() || !lastName.trim()) { throw new HTTPError(400, "First and last name is required"); }
        if (!studentId || !studentId.trim()) { throw new HTTPError(400, "Student ID is required"); }
        if (!schoolEmail ||!hasValidEmail(schoolEmail)) { throw new HTTPError(400, "Valid school email is required"); }
        if (typeof eligibility !== "boolean") { throw new HTTPError(400, "Eligibility must be a boolean value"); }
        if (!reasonToApply || !hasValidReason(reasonToApply)) { throw new HTTPError(400, "Reason to apply must be 150 words or less"); }

        const newApp = {
            id: tempApplications.length + 1,
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            studentId: studentId.trim(),
            schoolEmail: schoolEmail.trim(),
            eligibility,
            reasonToApply: reasonToApply.trim(),
            portfolioLink: portfolioLink ? portfolioLink.trim() : null,
            submittedAt: new Date()
        };

        tempApplications.push(newApp);
        return res.status(201).json({ 
            message: "Application submitted successfully", 
            applicationId: newApp.id });
    } catch (error) {
        next(error);
    }
});