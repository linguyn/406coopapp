import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { isValidStudent, isValidSupervisor, isValidCoordinator } from './validate.js';

// loads .env contents into process.env
dotenv.config()
const port = process.env.PORT || 5000;

const app = express();

// TEMP REPRESENTATION OF USERS
tempStudents = [
    {
        studentId: '123456789',
        email: 'student@example.com',
        password: 'password123'
    }
];
tempSupervisors = [
    {
        email: 'supervisor@example.com',
        password: 'password123'
    }
];

tempCoordinators = [
    {
        email: 'supervisor@example.com',
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

// This defines what happens when someone visits the home page ("/")
app.get('/', (req, res) => {
    res.send('time to cook!');
});

app.post('/register/student', (req, res) => {
    const registerInfo = req.body;
    if (!isValidStudent(registerInfo)) { return res.status(400).json('Invalid registration credentials'); }
    try {
        // check if user already exists in database, if not, add them to the database
        if (tempStudents.some(student => student.studentId === registerInfo.studentId)) { return res.status(400).json('User already exists') }
        tempStudents.push({
            studentId: registerInfo.studentId,
            email: registerInfo.email,
            password: registerInfo.password
        });
        const user = tempStudents.find(student => student.studentId === registerInfo.studentId);
        return res.status(200).json(user);
    } catch (error) { return res.status(500).send('Error occurred while registering user'); }
});

app.post('/register/supervisor', (req, res) => {
    const registerInfo = req.body;
    if (!isValidSupervisor(registerInfo)) { return res.status(400).json('Invalid registration credentials'); }
    try {
        // check if user already exists in database, if not, add them to the database
        if (tempSupervisors.some(supervisor => supervisor.email === registerInfo.email)) { return res.status(400).json('User already exists') }
        tempSupervisors.push({
            email: registerInfo.email,
            password: registerInfo.password
        });
        const user = tempSupervisors.find(supervisor => supervisor.email === registerInfo.email);
        return res.status(200).json(user);
    } catch (error) { return res.status(500).send('Error occurred while registering user'); }
});

app.post('/login/student', (req, res) => {
    const loginInfo = req.body;
    if (!isValidStudent(loginInfo)) { return res.status(400).json('Invalid login credentials'); }
    try {
        const user = tempStudents.find(student => student.studentId === loginInfo.studentID && student.email === loginInfo.email && student.password === loginInfo.password);
        if (user) { return res.status(200).json(user); }
        return res.status(401).json('Invalid student ID, email, or password');
    } catch (error) { return res.status(500).send('Error occurred while logging in'); }
});

app.post('/login/supervisor', (req, res) => {
    const loginInfo = req.body;
    if (!isValidSupervisor(loginInfo)) { return res.status(400).json('Invalid login credentials'); }
    try {
        const user = tempSupervisors.find(supervisor => supervisor.email === loginInfo.email && supervisor.password === loginInfo.password);
        if (!user) { res.status(400).json('Invalid login credentials'); }
        return res.status(200).json(user);
    } catch (error) { return res.status(500).json('Error occurred while logging in'); }
});

app.post('login/coordinator', (req, res) => {
    const loginInfo = req.body;
    if (!isValidCoordinator(loginInfo)) { return res.status(400).json('Invalid login credentials'); }
    try {
        const user = tempCoordinators.find(coordinator => coordinator.email === loginInfo.email && coordinator.password === loginInfo.password);
        if (!user) { res.status(400).json('Invalid login credentials'); }
        return res.status(200).json(user);
    } catch (error) { return res.status(500).json('Error occurred while logging in'); }
});

// This starts the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});