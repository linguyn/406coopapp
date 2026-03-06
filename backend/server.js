import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';


const app = express();

/* 
    "stamping" cors to this app allows the frontend server to communicate with the backend server.
    As a built-in browser security feature, a server on one port is not allowed to communicate with another port.
    The cors add-on is a way of permitting the communication
*/
app.use(cors());  

// parses frontend JSON data to a processable object
app.use(express.json());

const port = 3000;

// This defines what happens when someone visits the home page ("/")
app.get('/', (req, res) => {
    res.send('time to cook!');
});

// This starts the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});