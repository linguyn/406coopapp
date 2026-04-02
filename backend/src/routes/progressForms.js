import express from 'express';
export const progressFormsRouter = express.Router();

import { addProgressFormToDatabase, updateProgressForm } from '../database-services.js';
import { HTTPError } from '../errors.js';
import { authenticateToken } from '../server.js';

progressFormsRouter.post('/submit', authenticateToken, (req, res, next) => {
    const { studentName, supervisorName, company, jobTitle, stars, stairs, employable } = req.body;
    try {
        if (!studentName || !studentName.trim()) { throw new HTTPError(400, "Student name is required"); }
        if (!supervisorName || !supervisorName.trim()) { throw new HTTPError(400, "Supervisor name is required"); }
        if (!company || !company.trim()) { throw new HTTPError(400, "Company name is required"); }
        if (!jobTitle || !jobTitle.trim()) { throw new HTTPError(400, "Job title is required"); }
        if (!stars || !stars.trim()) { throw new HTTPError(400, "Stars are required"); }
        if (!stairs || !stairs.trim()) { throw new HTTPError(400, "Stairs are required"); }
        if (!employable || !employable.trim()) { throw new HTTPError(400, "Employable status is required"); }

        const newProgressForm = addProgressFormToDatabase({studentName, supervisorName, company, jobTitle, stars, stairs, employable});
        return res.status(201).json({ 
            message: "Progress form submitted successfully", 
            progressFormId: newProgressForm.id
        });
    }
    catch (error) {
        next(error);
    }
});

progressFormsRouter.patch('/update/:id', authenticateToken, (req, res, next) => {
    try {
        const updatedProgressForm = updateProgressForm(parseInt(req.params.id), req.body);
        return res.status(200).json({
            message: "Progress form updated successfully",
            progressForm: updatedProgressForm
        });
    } catch (error) {
        next(error);
    }
});