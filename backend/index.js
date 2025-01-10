// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const teamRoutes = require('./routes/teams');

const app = express(); 
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://hemantkumar2335h:Hemant12@mydata.wprhwlz.mongodb.net/rpg-game');

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));

app.use('/teams', teamRoutes);

app.listen(5000, () => console.log('Server started on port 5000'));
