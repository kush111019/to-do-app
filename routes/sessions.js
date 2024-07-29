const express = require('express');
const router = express.Router();
const Session = require('../models/session');  // Define a session schema/model

// Get all sessions for a user
router.get('/sessions', authenticate, async (req, res) => {
    const sessions = await Session.find({ userId: req.userId });
    res.json(sessions);
});

module.exports = router;
