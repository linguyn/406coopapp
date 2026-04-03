import express from 'express';
import { getStudentStats } from '../database-services.js';



export const statsRouter = express.Router();


statsRouter.get("", getStudentStats);
