import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { Card, CardContent, Typography, Button } from "@mui/material";
import "../styles/home.css";

const Home = () => {
  const [matches, setMatches] = useState([]);
  const [filter, setFilter] = useState("all"); // Filter for displaying matches

  function getRuns(runsWickets) {
    const runsWicketsArray = runsWickets.split("-");
    return parseInt(runsWicketsArray[0]);
  }

  function getWickets(runsWickets) {
    const runsWicketsArray = runsWickets.split("-");
    return parseInt(runsWicketsArray[1]);
  }

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(
          "http://localhost:3700/tournaments/match/allmatches"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch matches");
        }
        const data = await response.json();
        setMatches(data);
      } catch (error) {
        console.error("Error fetching matches:", error.message);
      }
    };

    fetchMatches();
  }, []);

  const filterMatches = () => {
    switch (filter) {
      case "upcoming":
        return matches.filter(match => !match.winner && new Date(match.matchDate) > new Date());
      case "completed":
        return matches.filter(match => match.winner);
      default:
        return matches;
    }
  };

  return (
    <Layout>
      <div className="bg">
        <h1 className="page-title">MATCHES AROUND YOU:</h1>
        <div className="button-group">
          <Button
            onClick={() => setFilter("all")}
            variant="contained"
            color="primary"
          >
            All Matches
          </Button>
          <Button
            onClick={() => setFilter("upcoming")}
            variant="contained"
            style={{ backgroundColor: '#ef5350', color: 'white' }} // Use custom background color
          >
            Upcoming Matches
          </Button>
          <Button
            onClick={() => setFilter("completed")}
            variant="contained"
            style={{ backgroundColor: "#4caf50", color: "white" }}
          >
            Completed Matches
          </Button>
        </div>
        <div className="match-container">
          {filterMatches().map((match, index) => (
            <Card
              key={index}
              className={`matchCard ${
                match.winner ? "completed" : "upcoming"
              }`}
              style={{ backgroundColor: match.winner ? "#ffff" : "" }}
            >
              <CardContent>
                {match.tossWinner && match.choice && (
                  <Typography
                    variant="body1"
                    className="toss-info"
                    style={{ fontWeight: "bold", color: "#ff5722" }}
                  >
                    TOSS WON BY {match.tossWinner} CHOOSE TO {match.choice}
                  </Typography>
                )}
                <Typography
                  variant="h6"
                  component="h2"
                  className="tournament-id"
                >
                  Tournament ID: {match.tournamentId}
                </Typography>
                <Typography variant="body1" className="match-date">
                  Match Date:{" "}
                  {new Date(match.matchDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" className="team-info">
                  {match.choice === "batting" ? match.team1 : match.team2} vs
                  {match.choice === "batting" ? match.team2 : match.team1}
                </Typography>

                <Typography variant="body1" className="score-info">
                  Score: {match.runsWicketsTeam1} & {match.runsWicketsTeam2}
                </Typography>
              </CardContent>
              <div className="team-runs">
                {match.winner ? (
                  <span style={{ fontWeight: "bold", color: "#000000" }}>
                    {match.winner === match.team1
                      ? getRuns(match.runsWicketsTeam1) >
                        getRuns(match.runsWicketsTeam2)
                        ? `Team ${match.team1} won by ${Math.abs(
                            getRuns(match.runsWicketsTeam1) -
                              getRuns(match.runsWicketsTeam2)
                          )} runs`
                        : `Team ${match.team2} won by ${
                            10 - getWickets(match.runsWicketsTeam2)
                          } wickets`
                      : getRuns(match.runsWicketsTeam2) >
                        getRuns(match.runsWicketsTeam1)
                      ? `Team ${match.team2} won by ${Math.abs(
                          getRuns(match.runsWicketsTeam2) -
                            getRuns(match.runsWicketsTeam1)
                        )} runs`
                      : `Team ${match.team1} won by ${
                          10 - getWickets(match.runsWicketsTeam1)
                        } wickets`}
                  </span>
                ) : (
                  <span className="upcoming">Upcoming</span>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
