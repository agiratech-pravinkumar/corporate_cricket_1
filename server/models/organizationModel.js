const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    organization_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    organization_id: {
        type: String,
        required: true,
        unique: true
    },
    joinedTournaments: [String],
    tournaments: [String]
});

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;
