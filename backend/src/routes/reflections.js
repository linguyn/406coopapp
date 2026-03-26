import express from 'express';
export const applicationsRouter = express.Router();


import { HTTPError } from '../errors.js';
import { authenticateToken } from '../server.js';