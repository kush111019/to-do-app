const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SUPABASE_URL, SUPABASE_KEY } = process.env;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Register a new user
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    const { user, error } = await supabase.auth.signUp({ email, password });

    if (error) return res.status(400).json({ error: error.message });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        supabaseId: user.id,
        email: user.email,
        passwordHash: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered' });
});

// Log in a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const { user, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return res.status(400).json({ error: error.message });

    const token = jwt.sign({ supabaseId: user.id }, 'your_jwt_secret');
    res.json({ token });
});

module.exports = router;
