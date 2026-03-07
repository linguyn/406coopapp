import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// loads .env contents into process.env
dotenv.config()
const port = process.env.PORT || 5000;

const app = express();

/* 
    "stamping" cors to this app allows the frontend server to communicate with the backend server.
    As a built-in browser security feature, a server on one port is not allowed to communicate with one on another port.
    The cors add-on is a way of permitting the communication
*/
app.use(cors());  

// parses frontend JSON data to a processable object
app.use(express.json());

// TODO: connect to database
// TODO: test basic CRUD operations
// TODO: create .env file, install dotenv, and move port there


// This defines what happens when someone visits the home page ("/")
app.get('/', (req, res) => {
    res.send('time to cook!');
});

// This starts the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});