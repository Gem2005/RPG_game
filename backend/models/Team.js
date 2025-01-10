// models/Team.js
const mongoose = require('mongoose');

const powerSchema = new mongoose.Schema({
  name: String,
  value: Number,
});

const characterSchema = new mongoose.Schema({
  name: String,
  health: { type: Number, default: 100 },
  powers: [powerSchema],
  imageUrl: String,
  attackingImageUrl: String,
  powerImageUrl: String,
  eliminationImageUrl: String,
});

const teamSchema = new mongoose.Schema({
  teamName: String,
  characters: [characterSchema],
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
