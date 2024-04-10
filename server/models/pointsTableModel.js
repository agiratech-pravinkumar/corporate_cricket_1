const mongoose = require('mongoose');

const pointsTableSchema = new mongoose.Schema({
    tournamentId: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    matchesPlayed: {
        type: Number,
        default: 0
    },
    matchesWon: {
        type: Number,
        default: 0
    },
    matchesLost: {
        type: Number,
        default: 0
    },
    points: {
        type: Number,
        default: 0
    }
});

const PointsTable = mongoose.model('PointsTable', pointsTableSchema);

module.exports = PointsTable;
