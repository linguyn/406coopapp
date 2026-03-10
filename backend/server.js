import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { isValidStudent, isValidLoginAttempt, isValidCoordinator, isValidSupervisor } from './validate.js';
import { NotFoundError, ValidationError, ConflictError } from './errors.js';

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

// TEMP REPRESENTATION OF USERS

let tempUsers = [
        {
            studentId: '123456789',
            email: 'student@example.com',
            password: 'password123',
            userType: 'student'
        },
        {
            studentId: '423456789',
            email: 'aaaatudent@example.com',
            password: 'password123',
            userType: 'student'
        },
        {
            studentId: '323456789',
            email: 'ffftudent@example.com',
            password: 'password123',
            userType: 'student'
        },
        {
            email: 'supervisor@example.com',
            password: 'password123',
            userType: 'supervisor'
        },
        {
            email: 'aaaasupervisor@example.com',
            password: 'password123',
            userType: 'supervisor'
        },
        {
            email: 'ffffffsupervisor@example.com',
            password: 'password123',
            userType: 'supervisor'
        },
        {
            email: 'coordinator@example.com',
            password: 'password123',
            userType: 'coordinator'
        },
        {
            email: 'aaaacoordinator@example.com',
            password: 'password123',
            userType: 'coordinator'
        },
        {
            email: 'ffffffcoordinator@example.com',
            password: 'password123',
            userType: 'coordinator'
        }
]

// This defines what happens when someone visits the home page ("/")
app.get('/', (req, res) => {
    res.send('time to cook!');
});

/**
 * @api {POST} /student
 * @description Adds a new student to the database
 * @body {String} studentId - The student's unique ID
 * @body {String} email - The student's unique email
 * @body {String} password - The student's unique password
 * @success {200} {Object} - Returns the user
 * @error {400} {Object} - Error message if user with studentId already exists
 * @error {500} {Object} - Internal error message
 */


app.post('/student', (req, res) => {
    const registerInfo = req.body;
    try {
        const email = registerInfo.email;
        const password = registerInfo.password;
        const studentId = registerInfo.studentId;

        if (!isValidStudent(email, password, studentId)) { throw new ValidationError("Invalid registration details"); }
        // check if user already exists in database, if not, add them to the database
        if (findUserInDatabase(email)) { throw new ConflictError("User already exists"); }
        
        const user = addStudentToDatabase(email, password, studentId);
        
        return res.status(200).json(user);
    } catch (error) { 
        if (error instanceof ConflictError) { return res.status(409).json(error.message); }
        else if (error instanceof ValidationError) { return res.status(400).json(error.message); }
        else { return res.status(500).send('Error occurred while registering'); }
    }
});

/**
 * @api {POST} /coordinator
 * @description Adds a new coordinator to the database
 * @body {String} email - The coordinator's unique email
 * @body {String} password - The coordinator's unique password
 * @success {200} {Object} - Returns the user
 * @error {400} {Object} - Error message if registration information is invalid
 * @error {409} {Object} - Error message if a user already exists
 * @error {500} {Object} - Internal error message
 */

app.post('/coordinator', (req, res) => {
    const registerInfo = req.body;
    try {
        const email = registerInfo.email;
        const password = registerInfo.password;

        if (!isValidCoordinator(email, password)) { throw new ValidationError("Invalid registration details"); }
        // check if user already exists in database, if not, add them to the database
        if (findUserInDatabase(email)) { throw new ConflictError("User already exists"); }
        
        const user = addCoordinatorToDatabase(email, password);
        
        return res.status(200).json(user);
    } catch (error) { 
        if (error instanceof ConflictError) { return res.status(409).json(error.message); }
        else if (error instanceof ValidationError) { return res.status(400).json(error.message); }
        else { return res.status(500).send('Error occurred while registering'); }
    }
});

/**
 * @api {POST} /supervisor
 * @description Adds a new supervisor to the database
 * @body {String} email - The supervisor's unique email
 * @body {String} password - The supervisor's unique password
 * @success {200} {Object} - Returns the user
 * @error {400} {Object} - Error message if registration information is invalid
 * @error {409} {Object} - Error message if a user already exists
 * @error {500} {Object} - Internal error message
 */

app.post('/supervisor', (req, res) => {
    const registerInfo = req.body;
    try {
        const email = registerInfo.email;
        const password = registerInfo.password;

        if (!isValidSupervisor(email, password)) { throw new ValidationError("Invalid registration details"); }
        // check if user already exists in database, if not, add them to the database
        if (findUserInDatabase(email)) { throw new ConflictError("User already exists"); }
        
        const user = addSupervisorToDatabase(email, password);
        
        return res.status(200).json(user);
    } catch (error) { 
        if (error instanceof ConflictError) { return res.status(409).json(error.message); }
        else if (error instanceof ValidationError) { return res.status(400).json(error.message); }
        else { return res.status(500).send('Error occurred while registering'); }
    }
});

function addCoordinatorToDatabase(email, password) {
    tempUsers.push({
        email: email,
        password: password,
        userType: "coordinator"
    });
    return getUserFromDatabase(email);
}

function addSupervisorToDatabase(email, password) {
    tempUsers.push({
        email: email,
        password: password,
        userType: "supervisor"
    });
    return getUserFromDatabase(email);
}

function addStudentToDatabase(email, password, studentId) {
    tempUsers.push({
        studentId : studentId,
        email: email,
        password: password,
        userType: "student"
    });
    return getUserFromDatabase(email);
}

function findUserInDatabase(email) {
    const isUser = tempUsers.some(user => user.email === email);
    return isUser;
}

/**
 * @api {POST} /login
 * @description Checks if the user's login matches a user in the database
 * @body {String} email - The user's unique email
 * @body {String} password - The user's unique password
 * @success {200} {Object} - Returns the user
 * @error {400} {Object} - Error message if login information is invalid
 * @error {401} {Object} - Error message if login information does not match a user
 * @error {500} {Object} - Internal error message
 */

app.post('/login', (req, res) => {
    const loginInfo = req.body;
    try {
        const email = loginInfo.email;
        const password = loginInfo.password;
        if (!isValidLoginAttempt(email, password)) { throw new ValidationError("Invalid login credentials"); }

        const user = getUserFromDatabase(email);

        if (user.password !== password) { throw new ValidationError("Login information does not match"); }

        return res.status(200).json(user);
    } catch (error) { 
        if (error instanceof NotFoundError) { return res.status(401).json(error.message); }
        else if (error instanceof ValidationError) { return res.status(400).json(error.message); }
        // should not be error.message for safety (the unknown error message may contain sensitive data)
        else { return res.status(500).json("Error occurred while logging in"); }
    }
});

// should eventually be asynchronous when using database
function getUserFromDatabase(email) {
    const user = tempUsers.find(user => user.email === email);
    if (!user) {
        throw new NotFoundError("User doesn't exist");
    }
    return user;
}

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

    const filteredUsers = tempUsers.filter(user => user.userType === userType);

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