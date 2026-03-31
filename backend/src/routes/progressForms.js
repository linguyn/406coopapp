import express from 'express';
export const progressFormsRouter = express.Router();

import { addProgressFormToDatabase, updateProgressForm } from '../database-services.js';
import { HTTPError } from '../errors.js';
import { authenticateToken } from '../server.js';

progressFormsRouter.post('/submit', authenticateToken, (req, res, next) => {
    const { company, termDuration, tasks, skills, challenges, supported } = req.body;
    try {
        if (!company || !company.trim()) { throw new HTTPError(400, "Company name is required"); }
        if (!termDuration || !termDuration.trim()) { throw new HTTPError(400, "Term duration is required"); }
        if (!tasks || !tasks.trim()) { throw new HTTPError(400, "Tasks description is required"); }
        if (!skills || !skills.trim()) { throw new HTTPError(400, "Skills description is required"); }
        if (!challenges || !challenges.trim()) { throw new HTTPError(400, "Challenges description is required"); }
        if (!supported || !supported.trim()) { throw new HTTPError(400, "Support description is required"); }

        const newProgressForm = addProgressFormToDatabase({company, termDuration, tasks, skills, challenges, supported});
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