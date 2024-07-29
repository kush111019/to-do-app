const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');
const jwt = require('jsonwebtoken');

// Middleware to authenticate user
const authenticate = async (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(401).json({ error: 'No token provided' });

    try {
        const jwtSecret = process.env.JWT_SECRET || 'default_jwt_secret';
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.supabaseId;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Create a new to-do item
router.post('/todos', authenticate, async (req, res) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }

        const todo = new Todo({
            userId: req.userId,
            title
        });

        await todo.save();
        res.status(201).json(todo);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all to-do items for the logged-in user
router.get('/todos', authenticate, async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.userId });
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a to-do item
router.put('/todos/:id', authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;

        const todo = await Todo.findOneAndUpdate(
            { _id: id, userId: req.userId },
            { title, completed },
            { new: true }
        );

        if (!todo) return res.status(404).json({ error: 'To-Do not found' });
        res.json(todo);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a to-do item
router.delete('/todos/:id', authenticate, async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await Todo.findOneAndDelete({ _id: id, userId: req.userId });

        if (!todo) return res.status(404).json({ error: 'To-Do not found' });
        res.json({ message: 'To-Do deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
