const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  tournamentId: {
    type: String, 
    required: true
  },
  matchId: {
    type: String,
    required: true
  },
  team1: {
    type: String,
    required: true
  },
  team2: {
    type: String,
    required: true
  },
  matchDate: {
    type: Date, 
    required: true
  },
  overs: {
    type: Number,
  },
  winner: {
    type: String,
    default: null
  },
  loser: {
    type: String,
    default: null
  },
  runsWicketsTeam1: {
    type: String,
    default: "0-0" // Default format for runs-wickets
  },
  runsWicketsTeam2: {
    type: String,
    default: "0-0" // Default format for runs-wickets
  },
  pointsTeam1: {
    type: Number,
    default: 0
  },
  pointsTeam2: {
    type: Number,
    default: 0
  },
  tossWinner: {
    type: String,
    default: null
  },
  choice: {
    type: String,
    enum: ['Batting', 'Bowling', null],
    default: null
  }
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
