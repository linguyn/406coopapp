import express from 'express';
export const progressFormsRouter = express.Router();

import { HTTPError } from '../errors.js';
import { authenticateToken } from '../server.js';
import ProgressForm from '../models/ProgressForm.js';

progressFormsRouter.post('/submit', authenticateToken, async (req, res, next) => {
    const { studentName, supervisorName, company, jobTitle, stars, stairs, employable } = req.body;
    try {
        if (!studentName || !studentName.trim()) { throw new HTTPError(400, "Student name is required"); }
        if (!supervisorName || !supervisorName.trim()) { throw new HTTPError(400, "Supervisor name is required"); }
        if (!company || !company.trim()) { throw new HTTPError(400, "Company name is required"); }
        if (!jobTitle || !jobTitle.trim()) { throw new HTTPError(400, "Job title is required"); }
        if (!stars || !stars.trim()) { throw new HTTPError(400, "Stars are required"); }
        if (!stairs || !stairs.trim()) { throw new HTTPError(400, "Stairs are required"); }
        if (!employable || !employable.trim()) { throw new HTTPError(400, "Employable status is required"); }

        const newProgressForm = new ProgressForm(req.body);
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
        const updatedProgressForm = await ProgressForm.findByIdAndUpdate(
            userId,
            req.body,
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