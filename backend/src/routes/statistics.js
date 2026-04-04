import express from 'express';
import { getStudentStats } from '../database-services.js';
import { authenticateToken } from '../server.js';



export const statsRouter = express.Router();


statsRouter.get("", authenticateToken, getStudentStats);
