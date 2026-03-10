import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { authRouter } from './routes/auth.js';
import { usersRouter } from './routes/users.js';

// TODO: connect to database
// TODO: test basic CRUD operations
// TODO: organize routes by moving to routes directory
// TODO: eventually collapse register routes to one route when database is connected

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
app.use('/api/auth', authRouter);
app.use('/api', usersRouter);

// This defines what happens when someone visits the home page ("/")
app.get('/', (req, res) => {
    res.send('time to cook!');
});

// This starts the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});