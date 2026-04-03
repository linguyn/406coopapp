import express from 'express';
import { getStats } from '../controllers/statistics.js';



export const statsRouter = express.Router();


statsRouter.get("", getStats);
