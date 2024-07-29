const express = require('express');
const router = express.Router();
const Session = require('../models/session');
const authenticate = require('../middleware/authenticate'); // Import the authenticate middleware

// Get all sessions for a user
router.get('/sessions', authenticate, async (req, res) => {
    try {
        const sessions = await Session.find({ userId: req.userId });
        res.json(sessions);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
