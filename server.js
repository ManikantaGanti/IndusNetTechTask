// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory data store
let submissions = [];

app.use(bodyParser.json());
app.use(cors());

// Handle form submissions
app.post('/submit', (req, res) => {
    const { name, email, contact } = req.body;

    // Server-side validation
    if (!name || !email || !contact) {
        return res.status(400).json({ error: 'Please fill in all fields.' });
    }

    // Push the validated data to the in-memory data store
    submissions.push({ name, email, contact });
    
    res.json({ message: 'Form submitted successfully!' });
});

// Get all submitted entries
app.get('/entries', (req, res) => {
    res.json(submissions);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
