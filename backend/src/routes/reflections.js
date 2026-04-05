import express from 'express';
export const reflectionsRouter = express.Router();

import { addReflectionToDatabase, updateReflection } from '../database-services.js';
import { isValidEmail } from '../validate-services.js';
import { HTTPError } from '../errors.js';
import { authenticateToken } from '../server.js';
import Reflection from '../models/Reflection.js';
import { getUserByEmail } from './user.js';

reflectionsRouter.post('/submit', authenticateToken, async (req, res, next) => {
    const { company, supervisor, jobTitle, termDuration, skills, challenges, supported, schoolEmail } = req.body;
    try {
        if (!company || !company.trim()) { throw new HTTPError(400, "Company name is required"); }
        if (!supervisor || !supervisor.trim()) { throw new HTTPError(400, "Supervisor name is required"); }
        if (!jobTitle || !jobTitle.trim()) { throw new HTTPError(400, "Job title is required"); }
        if (!termDuration || !termDuration.trim()) { throw new HTTPError(400, "Term duration is required"); }
        if (!skills || !skills.trim()) { throw new HTTPError(400, "Skills description is required"); }
        if (!challenges || !challenges.trim()) { throw new HTTPError(400, "Challenges description is required"); }
        if (!supported || !supported.trim()) { throw new HTTPError(400, "Support description is required"); }
        if (!schoolEmail || !isValidEmail(schoolEmail)) { throw new HTTPError(400, "Valid school email is required"); }

        const studentUser = await getUserByEmail("student", schoolEmail);
        if (!studentUser) { throw new HTTPError(404, "Student not found"); }

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

reflectionsRouter.patch('/update/:id', authenticateToken, async (req, res, next) => {
    try {
        const userId = req.params.id;
        const updateData = { ...req.body };

        if (req.body.schoolEmail) {
            const studentUser = await getUserByEmail("student", req.body.schoolEmail);
            if (!studentUser) { throw new HTTPError(404, "Student not found"); }
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