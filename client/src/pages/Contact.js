import React from "react";
import Layout from "./../components/Layout/Layout";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import MailIcon from "@mui/icons-material/Mail";
import CallIcon from "@mui/icons-material/Call";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import "../styles/ContactStyles.css"; 
const Contact = () => {
  return (
    <Layout>
      <Box className="contact-container">
        <Typography variant="h4" className="contact-header">
          Contact
        </Typography>
        <p className="contact-content">
          Our contact details are essential for staying connected. Whether you
          have inquiries, suggestions, or need assistance, don't hesitate to
          reach out to us. We value open communication and are dedicated to
          providing prompt and helpful responses to all your queries. You can
          contact us via email at{" "}
          <a href="mailto:corporatecricket25@gmail.com">
            corporatecricket25@gmail.com
          </a>{" "}
          or give us a call at <a href="tel:+919360441754">9360441754</a>. Our
          team is available to assist you with any concerns you may have. Feel
          free to reach out to us at any time, and we'll ensure to address your
          needs promptly and effectively.
        </p>
      </Box>
      <Box className="contact-details">
        <TableContainer component={Paper}>
          <Table aria-label="contact table" className="contact-table">
            <TableHead>
              <TableRow>
                <TableCell align="center" className="contact-header-cell">
                  Contact Details
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <SupportAgentIcon className="contact-icon" sx={{ color: "red" }} /> 7550349076
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <MailIcon className="contact-icon" sx={{ color: "skyblue" }} />{" "}
                  <a href="mailto:corporatecricket25@gmail.com">
                    corporatecricket25@gmail.com
                  </a>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <CallIcon className="contact-icon" sx={{ color: "green" }} />{" "}
                  <a href="tel:+919360441754">9360441754</a>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>parameter
    </Layout>
  );
};

export default Contact;
