const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');
const sessionRoutes = require('./routes/sessions');
require('dotenv').config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api', authRoutes);
app.use('/api', todoRoutes);
app.use('/api', sessionRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
