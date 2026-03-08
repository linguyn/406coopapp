import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { isValidStudent, isValidSupervisor, isValidCoordinator } from './validate.js';

// TODO: connect to database
// TODO: test basic CRUD operations
// TODO: organize routes by moving to routes directory

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

// parses frontend JSON data to a processable object
app.use(express.json());

// TEMP REPRESENTATION OF USERS

let tempUsers = {
    students : [ 
        {
            studentId: '123456789',
            email: 'student@example.com',
            password: 'password123'
        },
        {
            studentId: '423456789',
            email: 'aaaatudent@example.com',
            password: 'password123'
        },
        {
            studentId: '323456789',
            email: 'ffftudent@example.com',
            password: 'password123'
        }
    ],
    supervisors : [
        {
            email: 'supervisor@example.com',
            password: 'password123'
        },
        {
            email: 'aaaasupervisor@example.com',
            password: 'password123'
        },
        {
            email: 'ffffffsupervisor@example.com',
            password: 'password123'
        }
    ],
    coordinators : [
        {
            email: 'coordinator@example.com',
            password: 'password123'
        },
        {
            email: 'aaaacoordinator@example.com',
            password: 'password123'
        },
        {
            email: 'ffffffcoordinator@example.com',
            password: 'password123'
        }
    ]
}

// This defines what happens when someone visits the home page ("/")
app.get('/', (req, res) => {
    res.send('time to cook!');
});

/**
 * @api {POST} /register/student
 * @description Adds a new student to the database
 * @body {String} studentId - The student's unique ID
 * @body {String} email - The student's unique email
 * @body {String} password - The student's unique password
 * @success {200} {Object} user
 * @error {400} {Object} - Error message if user with studentId already exists
 * @error {500} {Object} - Internal error message
 */

app.post('/register/student', (req, res) => {
    const registerInfo = req.body;
    if (!isValidStudent(registerInfo)) { return res.status(400).json('Invalid registration credentials'); }
    try {
        // check if user already exists in database, if not, add them to the database
        const students = tempUsers.students;
        if (students.some(student => student.studentId === registerInfo.studentId)) { return res.status(400).json('User already exists') }
        students.push({
            studentId: registerInfo.studentId,
            email: registerInfo.email,
            password: registerInfo.password
        });
        const user = students.find(student => student.studentId === registerInfo.studentId);
        user.confirm = "created";
        return res.status(200).json(user);
    } catch (error) { return res.status(500).send('Error occurred while registering user'); }
});

/**
 * @api {POST} /register/supervisor
 * @description Adds a new supervisor to the database
 * @body {String} email - The supervisor's unique email
 * @body {String} password - The supervisor's unique password
 * @success {200} {Object} user
 * @error {400} {Object} - Error message if user with email already exists
 * @error {500} {Object} - Internal error message
 */

app.post('/register/supervisor', (req, res) => {
    const registerInfo = req.body;
    if (!isValidSupervisor(registerInfo)) { return res.status(400).json('Invalid registration credentials'); }
    try {
        // check if user already exists in database, if not, add them to the database
        const supervisors = tempUsers.supervisors;
        if (supervisors.some(supervisor => supervisor.email === registerInfo.email)) { return res.status(400).json('User already exists') }
        supervisors.push({
            email: registerInfo.email,
            password: registerInfo.password
        });
        const user = supervisors.find(supervisor => supervisor.email === registerInfo.email);
        return res.status(200).json(user);
    } catch (error) { return res.status(500).send('Error occurred while registering user'); }
});

/**
 * @api {POST} /login/student
 * @description Checks if the student's login matches a student in the database
 * @body {String} studentId - The student's unique ID
 * @body {String} email - The student's unique email
 * @body {String} password - The student's unique password
 * @success {200} {Object} user
 * @error {400} {Object} - Error message if login information is invalid
 * @error {500} {Object} - Internal error message
 */

app.post('/login/student', (req, res) => {
    const loginInfo = req.body;
    if (!isValidStudent(loginInfo)) { return res.status(400).json('Invalid login credentials'); }
    try {
        const user = tempUsers.students.find(student => student.studentId === loginInfo.studentID && student.email === loginInfo.email && student.password === loginInfo.password);
        if (!user) { return res.status(400).json('Invalid student ID, email, or password'); }
        return res.status(200).json(user);
    } catch (error) { return res.status(500).send('Error occurred while logging in'); }
});

/**
 * @api {POST} /login/supervisor
 * @description Checks if the supervisor's login matches a supervisor in the database
 * @body {String} email - The supervisor's unique email
 * @body {String} password - The supervisor's unique password
 * @success {200} {Object} user
 * @error {400} {Object} - Error message if login information is invalid
 * @error {500} {Object} - Internal error message
 */

app.post('/login/supervisor', (req, res) => {
    const loginInfo = req.body;
    if (!isValidSupervisor(loginInfo)) { return res.status(400).json('Invalid login credentials'); }
    try {
        const user = tempUsers.supervisors.find(supervisor => supervisor.email === loginInfo.email && supervisor.password === loginInfo.password);
        if (!user) { return res.status(400).json('Invalid login credentials'); }
        return res.status(200).json(user);
    } catch (error) { return res.status(500).json('Error occurred while logging in'); }
});

/**
 * @api {POST} /login/coordinator
 * @description Checks if the coordinator's login matches a coordinator in the database
 * @body {String} email - The coordinator's unique email
 * @body {String} password - The coordinator's unique password
 * @success {200} {Object} user
 * @error {400} {Object} - Error message if login information is invalid
 * @error {500} {Object} - Internal error message
 */

app.post('/login/coordinator', (req, res) => {
    const loginInfo = req.body;
    if (!isValidCoordinator(loginInfo)) { return res.status(400).json('Invalid login credentials'); }
    try {
        const user = tempUsers.coordinators.find(coordinator => coordinator.email === loginInfo.email && coordinator.password === loginInfo.password);
        if (!user) { return res.status(400).json('Invalid login credentials'); }
        return res.status(200).json(user);
    } catch (error) { return res.status(500).json('Error occurred while logging in'); }
});

/**
 * @api {GET} /users
 * @description Retrieves a filtered list of users with optional sorting
 * @query {String} userType - The type of users. Options: "students", "supervisors", or "coordinators"
 * @query {String} [sortBy] - The sorting criteria. Options: "studentId", "email", "name"
 * @query {String} [order=asc] - The sorting direction. Options: "asc" or "desc"
 * @success {200} {Array} sortedUsers - The filtered and sorted list of users
 * @error {500} {Object} - Internal error message
 * @example
 * GET /users?userType=students&sortBy=studentId&order=desc
 */

app.get('/users', (req, res) => {
    // TODO: validate queries more rigorously
    const userType = req.query.userType;
    // TODO: nothing preventing you from sorting by studentId for non-students
    const sortBy = req.query.sortBy;
    let order = req.query.order;

    if (!userType) {
        return res.status(400).json('User type not specified');
    }

    const filteredUsers = tempUsers[userType];

    if (!sortBy) {
        // no sorting specified just return an unsorted copy
        return res.status(200).json(filteredUsers);
    }
    
    if (order === "desc") {
        order = -1;
    } else {
        order = 1;
    }

    try {
        const sortedUsers = filteredUsers.toSorted((user1, user2) => {
            if (user1[sortBy] < user2[sortBy]) { return -1*order }
            if (user1[sortBy] > user2[sortBy]) { return 1*order }
            return 0;
        })

        return res.status(200).json(sortedUsers);
    } catch (error) { return res.status(500).json('Error occurred while retrieving users'); }
})

// This starts the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});