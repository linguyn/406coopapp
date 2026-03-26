import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { authRouter } from './routes/auth.js';
import { userRouter } from './routes/user.js';
import { applicationsRouter } from './routes/applications.js';
import { API, TOKEN_OPTIONS } from './constants.js';
import jwt from 'jsonwebtoken';
import { HTTPError } from './errors.js';
import cookieParser from 'cookie-parser';
import Coor from './models/Coordinator.js';
import Student from './models/Student.js';
import connectDB from './database.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';


// TODO: connect to database and reconfigure database-services to actual database
// TODO: add secrets instructions to README

// loads .env contents into process.env
dotenv.config()

const backendPort = process.env.BACKEND_PORT || 5000;
const frontendPort = process.env.FRONTEND_PORT || 3000;

//Connect to MongoDB
connectDB();

const app = express();

/** 
    "stamping" cors to this app allows the frontend server to communicate with the backend server.
    As a built-in browser security feature, a server on one port is not allowed to communicate with one on another port.
    The cors add-on is a way of permitting the communication
*/
app.use(cors({
    origin : `http://localhost:${frontendPort}`,   // frontend url
    credentials : true  // allow cookies
}));  

// parses JSON data from requests into a processable object (so that all you have to do is call req.body to get the object)
app.use(express.json());


//Creating a post route to input into the database.
/** Still trying to figure out where to put 
 *  */ 
app.post('/api/students', async (req, res) => {
    try{  
        const newStudent = new Student(req.body); //move this line to auth.js
        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    } catch (error) {
        res.status(400).json(error); 
    }
});

app.post('/api/coordinators', async(req, res) => {
    try {
        const newCoordinator = new Coor(req.body);
        const savedCoordinator = await newCoordinator.save();
        res.status(201).json(savedCoordinator);
    } catch (error) {
        res.status(400).json(error);
    }
});






// parses cookies from requests (so you can call req.cookies.<cookie-name> to get the cookie)
app.use(cookieParser());

// mount the routers to the app (first arg is just an api url prefix)
app.use(API.prefixes.auth, authRouter);
app.use(API.prefixes.user, userRouter);
app.use(API.prefixes.applications, applicationsRouter);

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Co-op app',
            description: 'API for co-op app',
            version: '1.0.0'
        },
        servers : [{url : `http://localhost:${backendPort}`}]
    },
    apis: [
        './src/routes/*.js',
        './src/models/*.js',
        './src/errors.js'
    ]
}

const swaggerDoc = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve);
app.use('/api-docs', swaggerUi.setup(swaggerDoc));

/**
 * @function generateAccessToken
 * @description Generates a unique access token based on the user and secret key that expires in 15 minutes.
 * This token is used to authenticate the user whenever a request is made to the server
 * @param {String} id - The user's id
 * @param {String} role - The user's role
 * @returns {String} token - The unique access token
 */

export function generateAccessToken(id, role) {
    const payload = { sub : id, role : role };
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const token = jwt.sign(payload, secret, TOKEN_OPTIONS.access);
    return token;
}

/**
 * @function generateRefreshToken
 * @description Generates a unique refresh token based on the user and secret key that expires in 7 days.
 * This token is used to authenticate the user when they try to refresh their access token
 * @param {String} id - The user's id
 * @param {String} role - The user's role
 * @returns {String} token - The unique refresh token
 */

export function generateRefreshToken(id, role, isLong = false) {
    let refreshOptions;
    if (isLong) { refreshOptions = TOKEN_OPTIONS.refreshLong; } 
    else { refreshOptions = TOKEN_OPTIONS.refreshShort; }

    const payload = { sub : id, role : role };
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const token = jwt.sign(payload, secret, refreshOptions);
    return token;
}

/**
 * @function authenticateToken
 * @description Authenticates a user's token by verifying it with the secret key
 * @header {String} token - The user's access token
 * @error {401} {Object} - Missing the authorization header, which contains the token
 */

export function authenticateToken(req, res, next) {
    const header = req.header('authorization');
    try {
        if (!header) { throw new HTTPError('Missing authorization header', 401); }
        // get the token from the second part of string i.e. authorization : Bearer <token>
        const token = header.split(' ')[1];

        if (!token) { throw new HTTPError("Bearer token not found", 401); }
        
        const decodedPayload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.user = decodedPayload;
        next();
    } catch(error) {
        next(error);
    }
}

/**
 * error handling middleware, this should be the last to be mounted to the app.
 * Note that this runs when an argument is supplied to the next function (interpreted as an emergency error)
 * This means that this is the immediate error handler.
 * Because this takes 4 parameters, express knows that the first, error, should contain what was passed to next
 *  */ 
app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    let message = error.message
    if (error.isOperational) { message = error.message; }
    return res.status(statusCode).json({
        message : message,
        statusCode : statusCode
    });
})

// This defines what happens when someone visits the home page ("/")
app.get('/', (req, res) => {
    res.send('time to cook!');
});

// This starts the server
app.listen(backendPort, () => {
    console.log(`Server running at http://localhost:${backendPort}`);
});