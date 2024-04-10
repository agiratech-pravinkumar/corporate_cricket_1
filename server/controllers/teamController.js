const mongoose = require('mongoose');
//const Team = require('../models/teamModel');
const Organization = require('../models/organizationModel');

// exports.validate = async (req, res, next) => {
//     try {
//         const { organizationId } = req.body;

//         // Validate organization ID by checking if it exists in the Organization collection
//         const organization = await Organization.findOne({ organization_id: organizationId });

//         if (!organization) {
//             return res.status(400).json({ error: 'Invalid organization ID' });
//         }

//       
//        req.organization = organization;

//         next(); 
//     } catch (error) {
//         console.error("Error validating organization ID:", error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// }



exports.createTeam = async (req, res) => {
    try {
        const { organization_id, teamName, coachName, captainName, players } = req.body;

        
        if (!organization_id || !teamName || !coachName || !captainName || !Array.isArray(players) || players.length === 0) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        const newTeam = new Team({
            organization_id,
            teamName,
            coachName,
            captainName,
            players
        });

      
        const savedTeam = await newTeam.save();

        return res.status(201).json({ message: 'Team created successfully', team: savedTeam });
    } catch (error) {
        console.error('Error creating team:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.teamsById= async (req, res) => {
    try {
        const organizationId = req.params.organizationId;

        const teams = await Team.find({ organizationId });

        return res.status(200).json({ teams });
    } catch (error) {
        console.error('Error retrieving teams:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAllTeams = async (req, res) => {
    try {
       
        const teams = await Team.find();

        
        res.status(200).json(teams);
    } catch (error) {
        console.error('Error fetching teams:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};