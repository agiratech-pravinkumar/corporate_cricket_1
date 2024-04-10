import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import sideImages from "../images/about2.jpg";

function UpdateTournament({ matchId }) {
  const currentMatchId = useParams();
  const [tournamentId, setTournamentId] = useState("");
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [matchDate, setMatchDate] = useState("");
  const [overs, setOvers] = useState("");
  const [winner, setWinner] = useState("");
  const [loser, setLoser] = useState("");
  const [runsWicketsTeam1, setRunsWicketsTeam1] = useState("");
  const [runsWicketsTeam2, setRunsWicketsTeam2] = useState("");
  const [tossWinner, setTossWinner] = useState("");
  const [choice, setChoice] = useState("");
  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER}/tournaments/${currentMatchId.matchId}/`
        );
        console.log("API Response:", response.data);
        const matchData = response.data.match;

        setTournamentId(matchData.tournamentId);
        setTeam1(matchData.team1);
        setTeam2(matchData.team2);
        setMatchDate(matchData.matchDate);
        setOvers(matchData.overs);
        setWinner(matchData.winner);
        setLoser(matchData.loser);
        setRunsWicketsTeam1(matchData.runsWicketsTeam1);
        setRunsWicketsTeam2(matchData.runsWicketsTeam2);
        setTossWinner(matchData.tossWinner);
        setChoice(matchData.choice);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      }
    };

    fetchMatch();
  }, [currentMatchId.matchId]);

  const handleUpdate = () => {
    axios
      .put(
        `${process.env.REACT_APP_SERVER}tournaments/matches/update-result/${currentMatchId.matchId}`,
        {
          tournamentId: tournamentId,
          team1: team1,
          team2: team2,
          matchDate: matchDate,
          overs: overs,
          winner: winner,
          loser: loser,
          runsWicketsTeam1: runsWicketsTeam1,
          runsWicketsTeam2: runsWicketsTeam2,
          tossWinner: tossWinner,
          choice: choice,
        }
      )
      .then((response) => {
        toast.success("Update successful");
        setTimeout(() => {
          window.location.replace(`/tournaments/matches/${tournamentId}`);
        }, 4000);
      })

      .catch((error) => {
        console.error("Error updating match result:", error);
        toast.error("failed to update");
      });
  };

  return (
    <Layout>
      <MDBContainer fluid className="my-5">
        <MDBRow className="g-0 align-items-center">
          <MDBCol col="6">
            <MDBCard
              className="my-5 cascading-right"
              style={{
                background: "hsla(0, 0%, 100%, 0.55)",
                backdropFilter: "blur(30px)",
              }}
            >
              <MDBCardBody className="p-5 shadow-5 text-center">
                <h2 className="fw-bold mb-5" style={{ fontWeight: "bold" }}>
                  Update Match Result
                </h2>

                <div className="mb-4">
                  <label htmlFor="tournamentId" className="form-label">
                    <span style={{ fontWeight: "bold" }}>Tournament ID</span>
                  </label>
                  <MDBInput
                    id="tournamentId"
                    type="text"
                    value={tournamentId}
                    onChange={(e) => setTournamentId(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="matchId" className="form-label">
                    <span style={{ fontWeight: "bold" }}>Match ID</span>
                  </label>
                  <MDBInput
                    id="matchId"
                    type="text"
                    value={currentMatchId.matchId}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="team1" className="form-label">
                    <span style={{ fontWeight: "bold" }}>Team 1</span>
                  </label>
                  <MDBInput
                    id="team1"
                    type="text"
                    value={team1}
                    onChange={(e) => setTeam1(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="team2" className="form-label">
                    <span style={{ fontWeight: "bold" }}>Team 2</span>
                  </label>
                  <MDBInput
                    id="team2"
                    type="text"
                    value={team2}
                    onChange={(e) => setTeam2(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="matchDate" className="form-label">
                    <span style={{ fontWeight: "bold" }}>Match Date</span>
                  </label>
                  <MDBInput
                    id="matchDate"
                    type="text"
                    value={matchDate}
                    onChange={(e) => setMatchDate(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="overs" className="form-label">
                    <span style={{ fontWeight: "bold" }}>Overs</span>
                  </label>
                  <MDBInput
                    id="overs"
                    type="text"
                    value={overs}
                    onChange={(e) => setOvers(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="winner" className="form-label">
                    <span style={{ fontWeight: "bold" }}>Winner</span>
                  </label>
                  <MDBInput
                    id="winner"
                    type="text"
                    value={winner}
                    onChange={(e) => setWinner(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="loser" className="form-label">
                    <span style={{ fontWeight: "bold" }}>Loser</span>
                  </label>
                  <MDBInput
                    id="loser"
                    type="text"
                    value={loser}
                    onChange={(e) => setLoser(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="runsTeam1" className="form-label">
                    <span style={{ fontWeight: "bold" }}>Runs Team 1</span>
                  </label>
                  <MDBInput
                    id="runsTeam1"
                    type="text"
                    value={runsWicketsTeam1}
                    onChange={(e) => setRunsWicketsTeam1(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="runsTeam2" className="form-label">
                    <span style={{ fontWeight: "bold" }}>Runs Team 2</span>
                  </label>
                  <MDBInput
                    id="runsTeam2"
                    type="text"
                    value={runsWicketsTeam2}
                    onChange={(e) => setRunsWicketsTeam2(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="tossWinner" className="form-label">
                    <span style={{ fontWeight: "bold" }}>Toss Winner</span>
                  </label>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="tossWinner"
                        value={team1}
                        checked={tossWinner === team1}
                        onChange={(e) => setTossWinner(e.target.value)}
                      />
                      {team1}
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="tossWinner"
                        value={team2}
                        checked={tossWinner === team2}
                        onChange={(e) => setTossWinner(e.target.value)}
                      />
                      {team2}
                    </label>
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="choice" className="form-label">
                    <span style={{ fontWeight: "bold" }}>Choice</span>
                  </label>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="choice"
                        value="Batting"
                        checked={choice === "Batting"}
                        onChange={(e) => setChoice(e.target.value)}
                      />
                      Batting
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="choice"
                        value="Bowling"
                        checked={choice === "Bowling"}
                        onChange={(e) => setChoice(e.target.value)}
                      />
                      Bowling
                    </label>
                  </div>
                </div>

                <MDBBtn className="w-100 mb-4" size="md" onClick={handleUpdate}>
                  Update
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol col="6">
            <img
              src={sideImages}
              className="w-100 rounded-4 shadow-4"
              alt="Match"
              fluid
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <ToastContainer />
    </Layout>
  );
}

export default UpdateTournament;
