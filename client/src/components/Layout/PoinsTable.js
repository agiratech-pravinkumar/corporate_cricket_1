import  React,{useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
export default function PoinsTable(props) {

    const [teamStatistics, setTeamStatistics] = useState([])
    const currentTournamentID = props.tournamentId
    console.log("Curent : " + currentTournamentID);
    useEffect(()=>{
            axios.get(`http://localhost:3700/tournaments/getPointsTable/${currentTournamentID}`)
            .then((res)=>{
                console.log(res.data);
                setTeamStatistics(res.data.teamStatistics)
            })
            .catch((err)=>console.log(err))
    },[])

  return (
    <TableContainer component={Paper}>
      <h1>PoinsTable:</h1>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Teams</TableCell>
            <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }} align="right">PLD</TableCell>
            <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }} align="right">WON</TableCell>
            <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }} align="right">LOST</TableCell>
            <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }} align="right">PTS</TableCell>
            <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }} align="right">Q</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teamStatistics.map((team) => (
            <TableRow key={team.TEAMS} sx={{ '&:hover': { backgroundColor: '#e0e0e0' } }}>
              <TableCell component="th" scope="row">
                {team.TEAMS}
              </TableCell>
              <TableCell align="right">{team.PLD}</TableCell>
              <TableCell align="right">{team.WON}</TableCell>
              <TableCell align="right">{team.LOST}</TableCell>
              <TableCell align="right">{team.PTS}</TableCell>
              <TableCell align="right">{team.Q}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
