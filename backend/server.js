import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// loads .env contents into process.env
dotenv.config()
const port = process.env.PORT || 5000;

const app = express();
tempStudentArray = [
    {
        studentId: '123456789',
        email: 'student@example.com',
        password: 'password123'
    }
];

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

app.post('/register', (req, res) => {
    const loginInfo = req.body;
    try {
        //TODO: check if user already exists in database, if not, add them to the database
        if (loginInfo.studentID && loginInfo.email && loginInfo.password && !tempStudentArray.some(student => student.studentId === loginInfo.studentID)) {
            if (loginInfo.studentID.length == 9 && !isNaN(loginInfo.studentID) && loginInfo.email.includes('@') && loginInfo.password.length >= 6) {
                tempStudentArray.push({
                    studentId: loginInfo.studentID,
                    email: loginInfo.email,
                    password: loginInfo.password
                });
                res.status(200).json('User registered successfully');
            }
        }
    } catch (error) {
        res.status(500).send('Error occurred while registering user');
    }
});

app.post('/login', (req, res) => {
    const loginInfo = req.body;
    try {
        const studentLogin = tempStudentArray.find(student => student.studentId === loginInfo.studentID && student.email === loginInfo.email && student.password === loginInfo.password);
        if (studentLogin) {
            res.status(200).json('Login successful');
        } else {
            res.status(401).json('Invalid student ID, email, or password');
        }
    } catch (error) {
        res.status(500).send('Error occurred while logging in');
    }
});

// This starts the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});