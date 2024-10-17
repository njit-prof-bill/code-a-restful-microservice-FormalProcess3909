const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

// In-memory storage
let users = [];
let idCounter = 1; // Counter to assign unique IDs to users

// POST /users
app.post('/users', (req, res) => {
    const { name, email } = req.body; // Name and email from request body

    // Checks if name and email are provided
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    // Create new user object
    const newUser = {
        id: idCounter++,
        name,
        email,
    };

    users.push(newUser); // Add new user to users array
    res.status(201).json(newUser); // Respond with created user object
});

// GET /users/:id - Retrieve a user by their ID
app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id); // Get user ID from URL params
    const user = users.find(u => u.id === userId); // Find user by ID in the array

    // If user is not found, return a 404 error
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json(user); // Return the found user
});

// PUT /users/:id - Update a user's information by ID
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id); // Get user ID from URL params
    const { name, email } = req.body; // Extract new name and email from request body

    // Find the index of the user in the users array
    const userIndex = users.findIndex(u => u.id === userId);

    // If user is not found, return a 404 error
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Validate the input
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    // Update the user details
    users[userIndex] = { id: userId, name, email };
    res.json(users[userIndex]); // Return the updated user object
});

// DELETE /users/:id - Delete a user by their ID
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id); // Get user ID from URL params
    const userIndex = users.findIndex(u => u.id === userId); // Find user by ID

    // If user is not found, return a 404 error
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    users.splice(userIndex, 1); // Remove the user from the array
    res.status(204).send(); // Send 204 No Content status code
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing