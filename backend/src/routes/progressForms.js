import express from 'express';
export const progressFormsRouter = express.Router();

import { isValidEmail } from '../validate-services.js';
import { HTTPError } from '../errors.js';
import { authenticateToken } from '../server.js';
import ProgressForm from '../models/ProgressForm.js';
import { getUserByEmail } from './user.js';

/**
 * @swagger
 * /api/progress-forms/submit:
 *   post:
 *     summary: Submits a progress form
 *     description: Saves a progress form to the database and associates it with its student (email must match)
 *     tags:
 *       - Documents
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProgressFormSubmitReq'
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProgressFormSubmitRes'
 *       400:
 *         description: Request fields are required
 *       404:
 *         description: Student not found
 *       500: 
 *         description: Internal server error
 */


progressFormsRouter.post('/submit', authenticateToken, async (req, res, next) => {
    const { studentName, supervisorName, company, jobTitle, stars, stairs, employable, schoolEmail } = req.body;
    try {
        if (!studentName || !studentName.trim()) { throw new HTTPError("Student name is required", 400); }
        if (!supervisorName || !supervisorName.trim()) { throw new HTTPError("Supervisor name is required", 400); }
        if (!company || !company.trim()) { throw new HTTPError("Company name is required", 400); }
        if (!jobTitle || !jobTitle.trim()) { throw new HTTPError("Job title is required", 400); }
        if (!stars || !stars.trim()) { throw new HTTPError("Stars are required", 400); }
        if (!stairs || !stairs.trim()) { throw new HTTPError("Stairs are required", 400); }
        if (!employable || !employable.trim()) { throw new HTTPError("Employable status is required", 400); }
        if (!schoolEmail || !isValidEmail(schoolEmail)) { throw new HTTPError("Valid school email is required", 400); }

        const studentUser = await getUserByEmail("student", schoolEmail);
        if (!studentUser) { throw new HTTPError("Student not found", 404); }
        const supervisorUser = await getUserByEmail("supervisor", supervisorName);
        if (!supervisorUser) { throw new HTTPError("Supervisor not found", 404); }

        const newProgressForm = new ProgressForm({ ...req.body, assignedStudent: studentUser._id, assignedSupervisor: supervisorUser._id });
        await newProgressForm.save();
        
        return res.status(201).json({ 
            message: "Progress form submitted successfully", 
            progressFormId: newProgressForm.id
        });
    }
    catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/progress-forms/update/{progressForm_id}:
 *   patch:
 *     summary: Updates a progress form
 *     description: Finds a progress form based on the progress form id and email, and updates and returns their progress form
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
 *             $ref: '#/components/schemas/ProgressFormUpdateReq'
 *     responses:
 *       200:
 *         description: Successfully updated the progress form
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProgressFormUpdateRes'
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */

progressFormsRouter.patch('/update/:id', authenticateToken, async (req, res, next) => {
    try {
        const userId = req.params.id;
        const updateData = { ...req.body };

        if (req.body.schoolEmail) {
            const studentUser = await getUserByEmail("student", req.body.schoolEmail);
            if (!studentUser) { throw new HTTPError("Student not found", 404); }
            updateData.assignedStudent = studentUser._id;
        }

        const updatedProgressForm = await ProgressForm.findByIdAndUpdate(
            userId,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );
        return res.status(200).json({
            message: "Progress form updated successfully",
            progressForm: updatedProgressForm
        });
    } catch (error) {
        next(error);
    }
});