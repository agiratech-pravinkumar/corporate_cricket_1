import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function JoinTournamentForm() {
  const navigate = useNavigate();
  const [tournamentId, setTournamentId] = useState('');
  const [teamName, setTeamName] = useState('');
  const [organizationEmail, setOrganizationEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('${process.env.REACT_APP_SERVER}/tournaments/Jointournaments', { tournamentId, teamName, organizationEmail })
      .then((res) => {
        toast.success('Successfully joined the tournament');
        console.log(`Data Saved ${res.data}`);
        navigate('/menu'); 
      })
      .catch((err) => {
        console.log(`Error occurred during joining tournament: ${err}`);
        toast.error('Failed to join the tournament. Please try again.');
      });
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', backgroundColor: '#fafafa' }}>
        <div style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
          <ToastContainer />
          <form onSubmit={handleSubmit}>
            <div style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px', color: '#3897f0', fontFamily: 'Billabong, Arial, sans-serif' }}>Join Tournament</div>
            <div style={{ marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="Tournament ID"
                value={tournamentId}
                onChange={(e) => setTournamentId(e.target.value)}
                style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#fafafa' }}
                required
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="Team Name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#fafafa' }}
                required
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <input
                type="email"
                placeholder="Organization Email"
                value={organizationEmail}
                onChange={(e) => setOrganizationEmail(e.target.value)}
                style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#fafafa' }}
                required
              />
            </div>
            <button type="submit" style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#3897f0', color: '#fff', cursor: 'pointer' }}>Join Tournament</button>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              Not a member? <Link to="/register" style={{ color: '#3897f0', textDecoration: 'none' }}>Register now</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default JoinTournamentForm;
