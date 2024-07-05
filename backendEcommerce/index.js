// Express setup
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// Import router
const reqPage = require('./reqPage')

// Routes setup
app.use(bodyParser.json());
app.use(cors());
app.use("/", reqPage);

// Hosting server
const PORT = 3000;
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});