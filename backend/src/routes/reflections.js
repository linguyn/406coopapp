import express from 'express';
export const reflectionsRouter = express.Router();

import { isValidEmail } from '../validate-services.js';
import { HTTPError } from '../errors.js';
import { authenticateToken } from '../server.js';
import Reflection from '../models/Reflection.js';
import { getUserByEmail } from './user.js';

/**
 * @swagger
 * /api/reflections/submit:
 *   post:
 *     summary: Submits a reflection
 *     description: Saves a reflection to the database and associates it with its student (email must match)
 *     tags:
 *       - Documents
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReflectionSubmitReq'
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReflectionSubmitRes'
 *       400:
 *         description: Request fields are required
 *       404:
 *         description: Student not found
 *       500: 
 *         description: Internal server error
 */

reflectionsRouter.post('/submit', authenticateToken, async (req, res, next) => {
    const { company, supervisor, jobTitle, termDuration, skills, challenges, supported, schoolEmail } = req.body;
    try {
        if (!company || !company.trim()) { throw new HTTPError("Company name is required", 400); }
        if (!supervisor || !supervisor.trim()) { throw new HTTPError("Supervisor name is required", 400); }
        if (!jobTitle || !jobTitle.trim()) { throw new HTTPError("Job title is required", 400); }
        if (!termDuration || !termDuration.trim()) { throw new HTTPError("Term duration is required", 400); }
        if (!skills || !skills.trim()) { throw new HTTPError("Skills description is required", 400); }
        if (!challenges || !challenges.trim()) { throw new HTTPError("Challenges description is required", 400); }
        if (!supported || !supported.trim()) { throw new HTTPError("Support description is required", 400); }
        if (!schoolEmail || !isValidEmail(schoolEmail)) { throw new HTTPError("Valid school email is required", 400); }

        const studentUser = await getUserByEmail("student", schoolEmail);
        if (!studentUser) { throw new HTTPError("Student not found", 404); }

        const newReflection = new Reflection({ ...req.body, assignedStudent: studentUser._id });
        await newReflection.save();

        return res.status(201).json({ 
            message: "Reflection submitted successfully", 
            reflectionId: newReflection.id
        });
    }
    catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/reflections/update/{reflection_id}:
 *   patch:
 *     summary: Updates a reflection
 *     description: Finds a reflection based on the reflection id and email, and updates and returns their reflection
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
 *             $ref: '#/components/schemas/ReflectionUpdateReq'
 *     responses:
 *       200:
 *         description: Successfully updated the reflection
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReflectionUpdateRes'
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */

reflectionsRouter.patch('/update/:id', authenticateToken, async (req, res, next) => {
    try {
        const userId = req.params.id;
        const updateData = { ...req.body };

        if (req.body.schoolEmail) {
            const studentUser = await getUserByEmail("student", req.body.schoolEmail);
            if (!studentUser) { throw new HTTPError("Student not found", 404); }
            updateData.assignedStudent = studentUser._id;
        }

        const updatedReflection = await Reflection.findByIdAndUpdate(
            userId,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );
        return res.status(200).json({
            message: "Reflection updated successfully",
            reflection: updatedReflection
        });
    } catch (error) {
        next(error);
    }
});