import express from 'express';
export const progressFormsRouter = express.Router();

import { isValidEmail } from '../validate-services.js';
import { HTTPError } from '../errors.js';
import { authenticateToken } from '../server.js';
import ProgressForm from '../models/ProgressForm.js';
import { getUserByEmail } from './user.js';

progressFormsRouter.post('/submit', authenticateToken, async (req, res, next) => {
    const { studentName, supervisorName, company, jobTitle, stars, stairs, employable, schoolEmail } = req.body;
    try {
        if (!studentName || !studentName.trim()) { throw new HTTPError(400, "Student name is required"); }
        if (!supervisorName || !supervisorName.trim()) { throw new HTTPError(400, "Supervisor name is required"); }
        if (!company || !company.trim()) { throw new HTTPError(400, "Company name is required"); }
        if (!jobTitle || !jobTitle.trim()) { throw new HTTPError(400, "Job title is required"); }
        if (!stars || !stars.trim()) { throw new HTTPError(400, "Stars are required"); }
        if (!stairs || !stairs.trim()) { throw new HTTPError(400, "Stairs are required"); }
        if (!employable || !employable.trim()) { throw new HTTPError(400, "Employable status is required"); }
        if (!schoolEmail || !isValidEmail(schoolEmail)) { throw new HTTPError(400, "Valid school email is required"); }

        const studentUser = await getUserByEmail("student", schoolEmail);
        if (!studentUser) { throw new HTTPError("Student not found", 404); }

        const newProgressForm = new ProgressForm({ ...req.body, assignedStudent: studentUser._id });
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