// routes/teams.js
const express = require('express');
const Team = require('../models/Team');
const router = express.Router();

// Get all teams
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific team by name
router.get('/:teamName', async (req, res) => {
  try {
    const team = await Team.findOne({ teamName: req.params.teamName });
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new team
router.post('/', async (req, res) => {
  const team = new Team(req.body);
  try {
    const newTeam = await team.save();
    res.status(201).json(newTeam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
