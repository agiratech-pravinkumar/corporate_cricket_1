import React from "react";
import Layout from "./../components/Layout/Layout";
import { Box, Typography } from "@mui/material";
import aboutImage from "../images/about1.jpg";

const About = () => {
  return (
    <Layout>
      <Box className="about-container">
        <Box className="container">
          <Box className="row gy-5 align-items-center">
            <Box className="col-12 col-lg-6">
              <img className="img-fluid rounded" loading="lazy" src={aboutImage} alt="About 1" />
            </Box>
            <Box className="col-12 col-lg-6">
              <Typography variant="h2" className="mb-4">Welcome to Corporate Cricket Portal</Typography>
              <Typography className="lead fs-5 mb-4 text-muted">Empowering corporates to engage in the exciting world of cricket tournaments.</Typography>
              
              <Typography variant="h4" className="mb-3">Create Your Team</Typography>
              <Typography className="mb-4">Form your own cricket team effortlessly. Recruit players from within your organization, showcase talent, and compete with other corporate teams.</Typography>

              <Typography variant="h4" className="mb-3">Post Tournaments</Typography>
              <Typography className="mb-4">Organize and announce upcoming cricket tournaments. Specify dates, venues, formats, and entry fees to attract participants.</Typography>

              <Typography variant="h4" className="mb-3">Participate in Tournaments</Typography>
              <Typography className="mb-4">Register your team to participate in tournaments. Enjoy seamless sign-ups and transparent eligibility criteria.</Typography>

              <Typography variant="h4" className="mb-3">Plan Tournament Matches</Typography>
              <Typography className="mb-4">Efficiently manage match schedules and fixtures. Coordinate with other teams and ensure smooth tournament operations.</Typography>

              <Typography variant="h4" className="mb-3">Announce Results</Typography>
              <Typography className="mb-4">Record and announce match results promptly. Celebrate the winning team and acknowledge outstanding performances.</Typography>

              <Typography variant="h5" className="mb-3">Join us today and experience the thrill of corporate cricket tournaments!</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default About;
