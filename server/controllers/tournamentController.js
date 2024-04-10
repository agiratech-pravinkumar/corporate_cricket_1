const Organization = require("../models/organizationModel");
const Tournament = require("../models/tournamentModel");
const Match = require("../models/matchModel");
const PointsTable = require('../models/pointsTableModel');
const nodemailer = require("nodemailer");

exports.createTournament = async (req, res) => {
  try {
    const {
      tournamentName,
      priceAmount,
      entryFees,
      startDate,
      endDate,
      tournamentId,
      teamLimit,
      organization_id,
      overs,
      ballType,
    } = req.body;

    if (teamLimit <= 1) {
      return res
        .status(400)
        .json({ error: "Team limit must be greater than 1" });
    }

    const existingTournament = await Tournament.findOne({ tournamentId });
    if (existingTournament) {
      return res
        .status(400)
        .json({ error: "Tournament with the same ID already exists" });
    }

    const currentDate = new Date();
    const startDt = new Date(startDate);
    const endDt = new Date(endDate);
    if (
      isNaN(startDt.getTime()) ||
      isNaN(endDt.getTime()) ||
      startDt < currentDate ||
      endDt < currentDate ||
      startDt >= endDt
    ) {
      return res.status(400).json({ error: "Invalid start or end date" });
    }

    const organization = await Organization.findOne({
      organization_id: organization_id,
    });
    if (!organization) {
      return res.status(404).json({ error: "Organization not found" });
    }

    const newTournament = new Tournament({
      tournamentName,
      priceAmount,
      entryFees,
      startDate,
      endDate,
      tournamentId,
      teamLimit,
      organization_id,
      overs,
      ballType,
    });

    await newTournament.save();
    organization.tournaments.push(tournamentId);

    await organization.save();

    return res.status(201).json({ message: "Tournament created successfully" });
  } catch (error) {
    console.error("Error creating tournament:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllTournaments = async (req, res) => { 
  try {
    const tournaments = await Tournament.find();
    res.status(200).json(tournaments);
  } catch (error) {
    console.error("Error fetching tournaments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getTournamentById = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const tournament = await Tournament.findOne({ tournamentId });
    if (!tournament) {
      console.log("Tournament not found");
      return res.status(404).json({ error: "Tournament not found" });
    }

    res.status(200).json(tournament);
  } catch (error) {
    console.error("Error fetching tournament:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.joinTournament = async (req, res) => {
  try {
    const { tournamentId, teamName, organizationEmail } = req.body;

    const organizationByEmail = await Organization.findOne({
      email: organizationEmail,
    });
    if (!organizationByEmail) {
      return res.status(400).json({ error: "Invalid organization email" });
    }

    const tournament = await Tournament.findOne({ tournamentId });
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }

    if (tournament.teams.length >= tournament.teamLimit) {
      return res
        .status(400)
        .json({ error: "Team limit reached for this tournament" });
    }

    if (tournament.teams.includes(teamName)) {
      return res
        .status(400)
        .json({ error: "Team with the same name already exists" });
    }

    if (!tournament.organizationEmail) {
      tournament.organizationEmail = [];
    }

    tournament.organizationEmail.push(organizationEmail);

    tournament.teams.push(teamName);

    await tournament.save();

    return res
      .status(200)
      .json({ message: "Successfully joined the tournament" });
  } catch (error) {
    console.error("Error joining tournament:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllMatchesForTournament = async (req, res) => {
  try {
    const tournamentId = req.params.tournamentId;

    const matches = await Match.find({ tournamentId });

    res.status(200).json(matches);
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.sendMatches = async (req, res) => {
  try {
    const { tournamentId } = req.params;

    const tournament = await Tournament.findOne({ tournamentId });
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }
    
    
    const matches = await Match.find({ tournamentId }).sort({ matchDate: 1 });

    const emailContent = `
    <h1>We are excited to announce the fixtures for the upcoming ${tournament.tournamentName}!</h1>
    <p>Here are the details:</p>
    <h2>Matches for Tournament ${tournament.tournamentName}</h2>
    <table border="1">
      <thead>
        <tr>
          <th>Match No</th>
          <th>Match Date</th>
          <th>Teams</th>
        </tr>
      </thead>
      <tbody>
        ${matches.map((match, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${match.matchDate}</td>
            <td>${match.team1} vs ${match.team2}</td>
          </tr>`
        ).join("")}
      </tbody>
    </table>
    <p>Please make sure to review the fixtures carefully and mark your calendars accordingly. If you have any questions or concerns regarding the fixtures, feel free to reach out to us:</p>
    <p>Contact Information:</p>
    <ul>
      <li>Email: corporatecricket25@gmail.com</li>
      <li>Phone: 9360441754</li>
      <li>Website: </li>
    </ul>
  `;
  

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "logachan08@gmail.com",
        pass: "hrbv llnm zmls xrcj",
      },
    });
    for (const orgEmail of tournament.organizationEmail) {
      const mailOptions = {
        from: "logachan08@gmail.com",
        to: orgEmail,
        subject: `${tournament.tournamentName} - Tournament Fixtures and Important Information`,
        html: emailContent,
      };
      await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          res.status(500).json({ error: "Error sending email" });
        } else {
          console.log("Email sent:", info.response);
        }
      });
    }

    res.status(200).json({ message: "Matches sent successfully" });
  } catch (error) {
    console.error("Error sending matches:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};




let nextUniqueId = 10000; 
let usedMatchIds = new Set(); 

function generateUniqueMatchId() {
  const randomId = Math.floor(nextUniqueId + Math.random() * 90000); 
  nextUniqueId = (nextUniqueId + 1) % 100000;
  return randomId.toString(); // Convert the generated id to a string
}

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

exports.generateMatches = async (req, res) => {
  try {
    const tournamentId = req.params.tournamentId;

    const tournament = await Tournament.findOne({ tournamentId });
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    if (tournament.matchesGenerated) {
      return res.status(400).json({ message: "Matches already generated for this tournament" });
    }

    const teams = tournament.teams;

    if (teams.length < tournament.teamLimit) {
      return res.status(400).json({ message: "Team limit not reached for this tournament" });
    }

    const startDate = new Date(tournament.startDate);
    const endDate = new Date(tournament.endDate);
    const overs = tournament.overs;

    const pointsTableEntries = teams.map((team) => ({
      tournamentId,
      team,
      matchesPlayed: 0,
      matchesWon: 0,
      matchesLost: 0,
      points: 0,
    }));

    await PointsTable.insertMany(pointsTableEntries);

    const matches = [];

    for (let i = 0; i < teams.length - 1; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        let matchId;
        do {
          matchId = generateUniqueMatchId(); 
        } while (usedMatchIds.has(matchId)); 
        usedMatchIds.add(matchId); 

        const matchDate = randomDate(startDate, endDate);
        const match = new Match({
          tournamentId,
          matchId,
          team1: teams[i],
          team2: teams[j],
          matchDate,
          overs,
          winner: null,
          loser: null,
          runsWicketsTeam1: 0-0,
          runsWicketsTeam2:0-0,
          pointsTeam1: 0,
          pointsTeam2: 0,
          tossWinner: null,
          choice: null,
        });
        await match.save();
        matches.push(match);
      }
    }

    tournament.matchesGenerated = true;
    await tournament.save();

    res.status(200).json({ message: "Matches generated successfully", matches });
  } catch (error) {
    console.error("Error generating matches:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



exports.getMatchById = async (req, res) => {
  try {
   
    const matchId = req.params.matchId;


    const match = await Match.findOne({ matchId });

    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    return res.status(200).json({ match });
  } catch (error) {
    console.error('Error fetching match by ID:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};




exports.updateMatchResult = async (req, res) => {
 
  
  try {
    const matchId = req.params.matchId;
    const { winner, runsWicketsTeam1, runsWicketsTeam2, tossWinner, choice } = req.body;

    const match = await Match.findOne({ matchId });
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    } 
   

    // Check if the toss winner is valid (either team1 or team2)
    if (tossWinner !== match.team1 && tossWinner !== match.team2) {
      return res.status(400).json({ message: "Invalid toss winner" });
    }

    // Determine batting and bowling teams based on toss winner and choice
    let battingTeam, bowlingTeam;
    if (tossWinner === match.team1) {
      if (choice === "Batting") {
        battingTeam = match.team1;
        bowlingTeam = match.team2;
      } else {
        battingTeam = match.team2;
        bowlingTeam = match.team1;
      }
    } else {
      if (choice === "Batting") {
        battingTeam = match.team2;
        bowlingTeam = match.team1;
      } else {
        battingTeam = match.team1;
        bowlingTeam = match.team2;
      }
    }

    // Update match details
    match.winner = winner;
    match.loser = winner === match.team1 ? match.team2 : match.team1;
    match.runsWicketsTeam1 = runsWicketsTeam1;
    match.runsWicketsTeam2 = runsWicketsTeam2;
    match.tossWinner = tossWinner;
    match.choice = choice;

    // Update points based on winner
    if (winner === battingTeam) {
      match.pointsTeam1 += 2;
      match.pointsTeam2 += 0;
    } else {
      match.pointsTeam1 += 0;
      match.pointsTeam2 += 2;
    }

    await match.save();

    await updatePointsTable(match);

    res.status(200).json({ message: "Match result updated successfully", match });
  } catch (error) {
    console.error("Error updating match result:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


async function updatePointsTable(match) {
  try {
    const [team1Points, team2Points] = await Promise.all([
      PointsTable.findOneAndUpdate(
        { tournamentId: match.tournamentId, team: match.team1 },
        {
          $inc: {
            matchesPlayed: 1,
            points: match.winner === match.team1 ? 2 : 0,
          },
        },
        { upsert: true, new: true }
      ),
      PointsTable.findOneAndUpdate(
        { tournamentId: match.tournamentId, team: match.team2 },
        {
          $inc: {
            matchesPlayed: 1,
            points: match.winner === match.team2 ? 2 : 0,
          },
        },
        { upsert: true, new: true }
      ),
    ]);

   
    if (match.winner === match.team1) {
      team1Points.matchesWon += 1;
      team2Points.matchesLost += 1;
    } else {
      team2Points.matchesWon += 1;
      team1Points.matchesLost += 1; 
    }

    await Promise.all([team1Points.save(), team2Points.save()]);
  } catch (error) {
    console.error("Error updating points table:", error);
    throw error;
  }
}


exports.getTeamStatistics = async (req, res) => {
  try {
    const tournamentId = req.params.tournamentId;

    const pointsTableEntries = await PointsTable.find({ tournamentId });

    pointsTableEntries.sort((a, b) => b.points - a.points);

    const numberOfTeams = pointsTableEntries.length;
    const numberOfTeamsForQ = Math.ceil(numberOfTeams / 2); 

    const formattedTeamStatistics = pointsTableEntries.map((entry, index) => {
      const Q = index < numberOfTeamsForQ ? "Q" : "E";
      return {
        TEAMS: entry.team,
        PLD: entry.matchesPlayed,
        WON: entry.matchesWon,
        LOST: entry.matchesLost,
        PTS: entry.points,
        Q: Q,
      };
    });

    res.status(200).json({ teamStatistics: formattedTeamStatistics });
  } catch (error) {
    console.error("Error retrieving team statistics:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.allMatches = async (req, res) => {
  try {
    const matches = await Match.find();
    res.json(matches);
  } catch (err) {
    console.error("Error fetching matches:", err);
    res.status(500).json({ error: "Internal server error" });
  }

}
exports.search = async (req, res) => {
  const { name } = req.params;
  try {
    const tournaments = await Tournament.find({ tournamentName: { $regex: new RegExp(name, "i") } });
    if (tournaments.length === 0) {
      return res.status(404).json({ message: "No tournaments found" });
    }
    res.json(tournaments);
  } catch (error) {
    console.error("Error fetching tournament details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



  

