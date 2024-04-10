const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
    tournamentName: {
        type: String,
        required: true
    },
    priceAmount: {
        type: Number,
        required: true
    },
    entryFees: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    tournamentId: {
        type: String,
        required: true,
        unique: true
    },
    teamLimit: {
        type: Number,
        required: true
    },
    teams: {
        type: [String],
        default: []
    },
    organizationEmail: {
        type: [String],
        default: []
    },
    overs: {
        type: Number,
        required: true
    },
    ballType: {
        type: String,
        required: true
    },
    matchesGenerated: {
        type: Boolean,
        default: false
    }
});

const Tournament = mongoose.model('Tournament', tournamentSchema);

module.exports = Tournament;
