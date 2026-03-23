import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { authRouter } from './routes/auth.js';
import { userRouter } from './routes/user.js';
import { API } from './constants.js';
import Coor from './models/Coordinator.js';
import Student from './models/Student.js';


// TODO: connect to database and reconfigure database-services to actual database
// TODO: test basic CRUD operations
// TODO: instead of returning the full user object at routes we should return a filtered object (subtracting the sensitive info)
// TODO: have a userLoggedIn boolean so the user doesnt need to login every time

// loads .env contents into process.env
dotenv.config()
const port = process.env.PORT || 5000;

const app = express();

/** 
    "stamping" cors to this app allows the frontend server to communicate with the backend server.
    As a built-in browser security feature, a server on one port is not allowed to communicate with one on another port.
    The cors add-on is a way of permitting the communication
*/
app.use(cors());  

// parses JSON data from requests into a processable object (so that all you have to do is call req.body to get the object)
app.use(express.json());

// mount the routers to the app (first arg is just a url prefix)
app.use(API.prefixes.auth, authRouter);
app.use(API.prefixes.user, userRouter);

/**
 * error handling middleware, this should be the last to be mounted to the app.
 * Note that by passing next as a parameter, this is the immediate method that runs when next is called i.e. by a catch block.
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
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});