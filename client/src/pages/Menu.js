import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout/Layout";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  TableSortLabel, // Import TableSortLabel for arrow icons
} from "@mui/material";
import Axios from "axios";
import JoinTournamentForm from "./JoinTournamentForm";

// Import your background image
import backgroundImg from "../images/360_F_372250969_fcZ5pWnMpRHLxsVLJ3ZMKIw0b0x7Yor4.jpg";

const Menu = () => {
  const [tournament, setTournament] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [sortByOvers, setSortByOvers] = useState(null); 
  const [sortByStartDate, setSortByStartDate] = useState(null); 
  const [sortByEndDate, setSortByEndDate] = useState(null); 

  useEffect(() => {
    Axios.get("http://localhost:3700/tournaments/tournaments/")
      .then((res) => setTournament(res.data))
      .catch((err) => {
        console.log(`${err} is going on`);
      });
  }, []);

  const handleSortByOvers = () => {
    const sortedTournament = [...tournament];
    sortedTournament.sort((a, b) => a.overs - b.overs);
    setTournament(sortedTournament);
    setSortByOvers(sortByOvers === "asc" ? "desc" : "asc");
  };

  const handleSortByStartDate = () => {
    const sortedTournament = [...tournament];
    sortedTournament.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    setTournament(sortedTournament);
    setSortByStartDate(sortByStartDate === "asc" ? "desc" : "asc");
  };

  const handleSortByEndDate = () => {
    const sortedTournament = [...tournament];
    sortedTournament.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
    setTournament(sortedTournament);
    setSortByEndDate(sortByEndDate === "asc" ? "desc" : "asc");
  };

  const handleJoinTournament = (tournamentId, teamLimit) => {
    setShowJoinModal(true);
  };

  const handleDetails = async (tournamentId) => {
    try {
      const response = await Axios.get(
        `http://localhost:3700/tournaments/tournaments/${tournamentId}`
      );
      setSelectedTournament(response.data);
      setShowDetailsModal(true);
    } catch (error) {
      console.error("Error fetching tournament details:", error);
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          minHeight: "100vh",
        }}
      >
        <Box sx={{ width: "90%", overflowX: "auto", backgroundColor: "transparent" }}>
          <TableContainer component={Paper} sx={{ backgroundColor: "transparent" }}>
            <Table aria-label="tournament table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "transparent" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Tournament ID
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Tournament Name
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Teams
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Ball Type
                  </TableCell>{" "}
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    <Button
                      onClick={handleSortByOvers}
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      Overs
                      {sortByOvers && (
                        <TableSortLabel
                          active
                          direction={sortByOvers}
                        />
                      )}
                    </Button>
                  </TableCell>{" "}
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    <Button
                      onClick={handleSortByStartDate}
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      Start Date
                      {sortByStartDate && (
                        <TableSortLabel
                          active
                          direction={sortByStartDate}
                        />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    <Button
                      onClick={handleSortByEndDate}
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      Last Date
                      {sortByEndDate && (
                        <TableSortLabel
                          active
                          direction={sortByEndDate}
                        />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tournament.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:hover": { backgroundColor: "#808080" } }}
                  >
                    <TableCell component="th" scope="row" sx={{ color: "yellow", fontWeight: "bold" }}>
                      {item.tournamentId}
                    </TableCell>
                    <TableCell sx={{ color: "yellow", fontWeight: "bold" }}>{item.tournamentName}</TableCell>
                    <TableCell sx={{ color: "yellow", fontWeight: "bold" }}>{item.teams.join(", ")}</TableCell>
                    <TableCell sx={{ color: "yellow", fontWeight: "bold" }}>{item.ballType}</TableCell>{" "}
                    <TableCell sx={{ color: "yellow", fontWeight: "bold" }}>{item.overs}</TableCell>
                    <TableCell sx={{ color: "yellow", fontWeight: "bold" }}>
                      {new Date(item.startDate).toLocaleDateString("en-GB")}
                    </TableCell>
                    <TableCell sx={{ color: "yellow", fontWeight: "bold" }}>
                      {new Date(item.endDate).toLocaleDateString("en-GB")}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() =>
                          handleJoinTournament(
                            item.tournamentId,
                            item.teamLimit
                          )
                        }
                        disabled={item.teams.length === item.teamLimit}
                        sx={{
                          backgroundColor: item.teams.length === item.teamLimit ? 'red' : 'green',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: item.teams.length === item.teamLimit ? 'red' : 'darkgreen',
                          }
                        }}
                      >
                        Join Tournament
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleDetails(item.tournamentId)}
                        style={{ marginLeft: 10 }}
                        sx={{
                          backgroundColor: 'blue',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'darkblue',
                          }
                        }}
                      >
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {selectedTournament && (
          <Modal
            open={showDetailsModal}
            onClose={() => setShowDetailsModal(false)}
            aria-labelledby="tournament-details-modal"
            aria-describedby="tournament-details"
          >
            <Box
              sx={{
                position: "absolute",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Typography variant="h5" gutterBottom component="div">
                {Object.entries(selectedTournament)
                  .filter(
                    ([key]) =>
                      ![
                        "_id",
                        "__v",
                        "refereeId",
                        "Organization",
                        "organizationEmail",
                        "matchesGenerated",
                      ].includes(key)
                  )
                  .map(([key, value]) => (
                    <p key={key}>
                      <strong>
                        {key === "ballType"
                          ? "Ball Type"
                          : key === "overs"
                          ? "Overs"
                          : key}
                        :{" "}
                      </strong>{" "}
                      {key === "teams" ? (
                        <span
                          style={{
                            color:
                              value.length === selectedTournament.teamLimit
                                ? "red"
                                : "green",
                          }}
                        >
                          {value.length === selectedTournament.teamLimit
                            ? "Team is full"
                            : `${
                                selectedTournament.teamLimit - value.length
                              } teams left`}
                        </span>
                      ) : (
                        value
                      )}
                    </p>
                  ))}
              </Typography>

              <Button
                variant="contained"
                onClick={() => setShowDetailsModal(false)}
                style={{ marginLeft: 10 }}
              >
                Close
              </Button>
            </Box>
          </Modal>
        )}

        {showJoinForm && <JoinTournamentForm />}

        <Modal
          open={showJoinModal}
          onClose={() => setShowJoinModal(false)}
          aria-labelledby="join-tournament-modal"
        > 
          <Box
            sx={{
              position: "relative",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <IconButton
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                color: "rgba(0, 0, 0, 0.54)",
              }}
              onClick={() => setShowJoinModal(false)}
            >
              <CloseIcon />
            </IconButton>
            <JoinTournamentForm  />
          </Box>
        </Modal>
      </Box>
    </Layout>
  );
};

export default Menu;
