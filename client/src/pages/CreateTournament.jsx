import React, { useState } from "react";
import axios from "axios";
import "../styles/CreateTournament.css";
import { Link, useLocation } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

function CreateTournament({ organizationId }) {
  const location = useLocation();
  console.log("location", location);
  console.log("state", location.search);
  const [formData, setFormData] = useState({
    tournamentName: "",
    priceAmount: "",
    entryFees: "",
    lastDateToApply: "",
    startDate: "",
    endDate: "",
    tournamentId: "",
    teamLimit: "",
    organization_id: "",
    overs: "",
    ballType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3700/tournaments/create_tournament",
        formData
      );

      if (response.status === 201) {
        console.log("Tournament created successfully!");
        setFormData({
          tournamentName: "",
          priceAmount: "",
          entryFees: "",
          lastDateToApply: "",
          startDate: "",
          endDate: "",
          tournamentId: "",
          teamLimit: "",
          organization_id: "",
          overs: "",
          ballType: "",
        });
      } else {
        console.error("Failed to create tournament");
      }
    } catch (error) {
      console.error(
        "Error occurred while creating tournament:",
        error.response.data
      );
    }
  };

  console.log(organizationId);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white navbar-light fixed-top py-0 pe-5">
        <Link
          to={`/home/${location.search.replace("?", "")}`}
          className="navbar-brand ps-5 me-0"
        >
          <h1 className="text-white m-0">Corporate Cricket</h1>
        </Link>
        <button
          type="button"
          className="navbar-toggler me-0"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto p-4 p-lg-0">
            <Link to="" className="nav-item nav-link active">
              HOME
            </Link>
            <Link
              to={`/home/${location.search.replace("?", "")}`}
              className="nav-item nav-link"
            >
              CreateTournament
            </Link>
            <Link to="" className="nav-item nav-link">
              Your Tournaments
            </Link>
            <div className="nav-item dropdown">
              <Link
                to="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Pages
              </Link>
              <div className="dropdown-menu bg-light m-0">
                <Link to="/" className="dropdown-item">
                  ALL MATCHES
                </Link>
                <Link to="/features" className="dropdown-item">
                  Features
                </Link>
                <Link to="/team" className="dropdown-item">
                  Our Team
                </Link>
                <Link to="/testimonial" className="dropdown-item">
                  Testimonial
                </Link>
                <Link to="/404" className="dropdown-item">
                  404 Page
                </Link>
              </div>
            </div>
            <Link to="/login" className="nav-item nav-link">
              Logout
            </Link>
          </div>
          <button className="btn btn-primary px-3 d-none d-lg-block">
            Help
          </button>
        </div>
      </nav>

      <MDBContainer
        fluid
        className="p-4 background-radial-gradient overflow-hidden"
      >
        <MDBRow>
          <MDBCol
            md="6"
            className="text-center text-md-start d-flex flex-column justify-content-center"
          >
            <h1
              className="my-5 display-3 fw-bold ls-tight px-3"
              style={{ color: "hsl(218, 81%, 95%)" }}
            >
              The best Tournament <br />
              <span style={{ color: "hsl(218, 81%, 75%)" }}>in the world</span>
            </h1>

            <p className="px-3" style={{ color: "hsl(218, 81%, 85%)" }}>
              Create a tournament page allows users to set up new competitions,
              defining details like name, date, location, and rules. Users can
              customize formats, invite participants, and manage registrations.
              It streamlines organizing events, ensuring smooth operations from
              planning to execution."
            </p>
          </MDBCol>

          <MDBCol md="6" className="position-relative">
            <div
              id="radius-shape-1"
              className="position-absolute rounded-circle shadow-5-strong"
            ></div>
            <div
              id="radius-shape-2"
              className="position-absolute shadow-5-strong"
            ></div>

            <MDBCard className="my-5 bg-glass">
              <MDBCardBody className="p-5">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="tournamentName"
                      className="form-label fw-bold"
                    >
                      Tournament Name
                    </label>
                    <MDBInput
                      id="tournamentName"
                      type="text"
                      name="tournamentName"
                      value={formData.tournamentName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="priceAmount" className="form-label fw-bold">
                      Price Amount
                    </label>
                    <MDBInput
                      id="priceAmount"
                      type="number"
                      name="priceAmount"
                      value={formData.priceAmount}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="entryFees" className="form-label fw-bold">
                      Entry Fees
                    </label>
                    <MDBInput
                      id="entryFees"
                      type="number"
                      name="entryFees"
                      value={formData.entryFees}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="lastDateToApply"
                      className="form-label fw-bold"
                    >
                      Last Date To Apply
                    </label>
                    <MDBInput
                      id="lastDateToApply"
                      type="date"
                      name="lastDateToApply"
                      value={formData.lastDateToApply}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="startDate" className="form-label fw-bold">
                      Start Date
                    </label>
                    <MDBInput
                      id="startDate"
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="endDate" className="form-label fw-bold">
                      End Date
                    </label>
                    <MDBInput
                      id="endDate"
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="tournamentId"
                      className="form-label fw-bold"
                    >
                      Tournament ID
                    </label>
                    <MDBInput
                      id="tournamentId"
                      type="text"
                      name="tournamentId"
                      value={formData.tournamentId}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="teamLimit" className="form-label fw-bold">
                      Team Limit
                    </label>
                    <MDBInput
                      id="teamLimit"
                      type="number"
                      name="teamLimit"
                      value={formData.teamLimit}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="organization_id"
                      className="form-label fw-bold"
        
        >
                      Organization ID
                    </label>
                    <MDBInput
                      id="organization_id"
                      type="text"
                      name="organization_id"
                      value={formData.organization_id}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="overs" className="form-label fw-bold">
                      Overs
                    </label>
                    <MDBInput
                      id="overs"
                      type="number"
                      name="overs"
                      value={formData.overs}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label fw-bold">Ball Type</label>
                    <div className="form-check">
                      <input
                        id="stumper"
                        type="radio"
                        name="ballType"
                        value="Stumper"
                        onChange={handleChange}
                        className="form-check-input"
                        checked={formData.ballType === "Stumper"}
                      />
                      <label htmlFor="stumper" className="form-check-label">
                        Stumper
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="leather"
                        type="radio"
                        name="ballType"
                        value="Leather"
                        onChange={handleChange}
                        className="form-check-input"
                        checked={formData.ballType === "Leather"}
                      />
                      <label htmlFor="leather" className="form-check-label">
                        Leather
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="tennis"
                        type="radio"
                        name="ballType"
                        value="Tennis"
                        onChange={handleChange}
                        className="form-check-input"
                        checked={formData.ballType === "Tennis"}
                      />
                      <label htmlFor="tennis" className="form-check-label">
                        Tennis
                      </label>
                    </div>
                  </div>

                  <MDBBtn className="w-100 mb-4" size="md" type="submit">
                    Create Tournament
                  </MDBBtn>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default CreateTournament;
