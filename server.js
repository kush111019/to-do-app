require('dotenv').config(); // Add this line at the top of your server.js

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');
const sessionRoutes = require('./routes/sessions');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api', authRoutes);
app.use('/api', todoRoutes);
app.use('/api', sessionRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
