const express = require('express');
const app = express();
const port = 3000;

// This defines what happens when someone visits the home page ("/")
app.get('/', (req, res) => {
    res.send('time to cook!');
});

// This starts the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});