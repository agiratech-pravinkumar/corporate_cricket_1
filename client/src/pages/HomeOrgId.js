import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import cric1 from "../images/photo-1587280501635-68a0e82cd5ff.avif";
import cric2 from "../images/stadium-with-purple-roof-lights-that-says-world-cup-it.jpg";
import cric3 from "../images/photo-1587280501635-68a0e82cd5ff.avif";
import "../styles/lib/animate/animate.css";
import "../styles/lib/animate/animate.min.css";
import "../styles/css/style.css";
import "../styles/css/bootstrap.min.css";
import "../styles/lib/owlcarousel/assets/owl.carousel.css";
import "../styles/lib/owlcarousel/assets/owl.carousel.min.css";
import "../styles/lib/owlcarousel/assets/owl.theme.default.css";
import { Link } from "react-router-dom";

const HomeWithOrgId = () => {
  const { organization_id } = useParams();
  const [organization_name, setOrganization_name] = useState("");
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [errorStatus, setErrorStatus] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? "0" + day : day}-${
      month < 10 ? "0" + month : month
    }-${year}`;
  };

  const scrollToTournaments = () => {
    const tournamentsSection = document.getElementById("your-tournaments");
    tournamentsSection.scrollIntoView({ behavior: "smooth" });
  };

  const handleViewTournament = async (tournamentId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}}/tournaments/tournaments/${tournamentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSelectedTournament(response.data);
    } catch (error) {
      console.error("Error fetching tournament details:", error);
    }
  };

  const handleViewMatches = async (tournamentId) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/tournaments/matches/${tournamentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Matches retrieved successfully:", response.data);
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const ScheduleMatches = async (tournamentId) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/tournaments/matches/${tournamentId}`,
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Matches scheduled successfully:", response.data);
    } catch (error) {
      console.error("Error scheduling matches:", error);
    }
  };

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER}/${organization_id}`,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        console.log("API Response:", response.data);
        setOrganization_name(response.data.organization_name);
        setTournaments(response.data.tournaments);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
        // if (error.response && error.response.status >= 400) {
        //   window.location.href = "/forbidden";
        // } else {
         
        //   window.location.replace(`/login`);
        // }
      }
    };
    fetchTournaments();
  }, [organization_id]);

  const handleReminderToTeams = async (tournamentId) => {
    try {
      const token = localStorage.getItem("Token");
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/tournaments/announce/${tournamentId}`,
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Reminder sent successfully");
    } catch (error) {
      console.error("Error sending reminder:", error);
    }
  };
  return (
    <>
   
      <nav className="navbar navbar-expand-lg bg-white navbar-light fixed-top py-0 pe-5">
        <Link to="/" className="navbar-brand ps-5 me-0">
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
              to={{
                pathname: "/tournaments/create_tournament",
                search: organization_id,
              }}
              className="nav-item nav-link"
            >
              Create Tournament
            </Link>

            <Link
              to=""
              className="nav-item nav-link"
              onClick={() => scrollToTournaments()}
            >
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
            <button onClick={handleLogout} className="nav-link btn btn-link">
                Logout
              </button>
          </div>
          <button className="btn btn-primary px-3 d-none d-lg-block">
            Get A Quote
          </button>
        </div>
      </nav>

      {/* Navbar End */}
      {/* Carousel Start */}

      <div className="container-fluid px-0 mb-5">
        <div
          id="header-carousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="w-100" src={cric3} alt="Image" />
              <div className="carousel-caption">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-lg-10 text-start">
                      <p className="fs-5 fw-medium text-primary text-uppercase animated slideInRight">
                        Create and play NOW, welcome{organization_name}
                      </p>
                      <h3 className="display-1 text-blue mb-5 animated slideInRight">
                        <span className="text-yellow">
                          "Cricket teaches us that no matter how skilled an
                          individual may be, it takes a team to win matches,
                          with each player playing a vital role in the
                          collective pursuit of victory."
                        </span>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img className="w-100" src={cric2} alt="Image" />
              <div className="carousel-caption">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-lg-10 text-start">
                      <p className="fs-5 fw-medium text-primary text-uppercase animated slideInRight">
                        25 Years of Working Experience
                      </p>
                      <h1 className="display-1 text-white mb-5 animated slideInRight">
                        The Best Reliable Industry Solution
                      </h1>
                      <a
                        href=""
                        className="btn btn-primary py-3 px-5 animated slideInRight"
                      >
                        Explore More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="container-fluid facts my-5 p-5">
        <div className="row g-5">
          <div className="col-md-6 col-xl-3 wow fadeIn" data-wow-delay="0.1s">
            <div className="text-center border p-5">
              <i className="fa fa-certificate fa-3x text-white mb-3" />
              <h1
                className="display-2 text-primary mb-0"
                data-toggle="counter-up"
              >
                25
              </h1>
              <span className="fs-5 fw-semi-bold text-white">
                Ongoing Matches
              </span>
            </div>
          </div>
          <div className="col-md-6 col-xl-3 wow fadeIn" data-wow-delay="0.3s">
            <div className="text-center border p-5">
              <i className="fa fa-users-cog fa-3x text-white mb-3" />
              <h1
                className="display-2 text-primary mb-0"
                data-toggle="counter-up"
              >
                135
              </h1>
              <span className="fs-5 fw-semi-bold text-white">
                Upcoming Matches
              </span>
            </div>
          </div>
          <div className="col-md-6 col-xl-3 wow fadeIn" data-wow-delay="0.5s">
            <div className="text-center border p-5">
              <i className="fa fa-users fa-3x text-white mb-3" />
              <h1
                className="display-2 text-primary mb-0"
                data-toggle="counter-up"
              >
                1000+
              </h1>
              <span className="fs-5 fw-semi-bold text-white">Players</span>
            </div>
          </div>
          <div className="col-md-6 col-xl-3 wow fadeIn" data-wow-delay="0.7s">
            <div className="text-center border p-5">
              <i className="fa fa-check-double fa-3x text-white mb-3" />
              <h1
                className="display-2 text-primary mb-0"
                data-toggle="counter-up"
              >
                500++
              </h1>
              <span className="fs-5 fw-semi-bold text-white">Matches Done</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container-xxl py-5" id="your-tournaments">
        <div className="container">
          <div
            className="text-center mx-auto pb-4 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: "600px" }}
          >
            <p className="fw-medium text-uppercase text-primary mb-2"></p>
            <h1 className="display-5 mb-4">YOUR TOURNAMENTS</h1>
          </div>
          <div className="row gy-5 gx-4">
            {tournaments.map((tournament, index) => (
              <div
                key={index}
                className="col-md-6 col-lg-4 wow fadeInUp"
                data-wow-delay={`${0.1 + index * 0.2}s`}
              >
                <div className="service-item">
                  <img className="img-fluid" src={cric2} alt="" />
                  <div className="service-img">
                    <img className="img-fluid" src={cric1} alt="" />
                  </div>
                  <div className="service-detail">
                    <div className="service-title">
                      <hr className="w-25" />
                      <h3 className="mb-0">Tournament ID: {tournament}</h3>
                      <hr className="w-25" />
                    </div>
                    <div className="service-text">
                      <p className="text-white mb-0">
                        If you want to view more, click here.
                      </p>
                    </div>
                  </div>

                  <a
                    className="btn btn-light"
                    onClick={() => handleViewTournament(tournament)}
                  >
                    View Tournament
                  </a>
                </div>
              </div>
            ))}
          </div>

          <h1>Selected Tournaments</h1>
          {selectedTournament && (
            <div className="row mt-4">
              <div className="col-md-12">
                <div
                  className="card"
                  style={{
                    maxWidth: "400px",
                    backgroundColor: "#F4F7FF",
                    borderRadius: "10px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  <img
                    className="card-img-top"
                    src={cric1}
                    alt="Tournament"
                    style={{ maxWidth: "200px", margin: "0 auto" }}
                  />
                  <div className="card-body">
                    <h5
                      className="card-title"
                      style={{
                        marginBottom: "0.5rem",
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        color: "#1A2B56",
                      }}
                    >
                      {selectedTournament.tournamentName}
                    </h5>
                    <p
                      className="card-text"
                      style={{ marginBottom: "0.25rem", color: "#666" }}
                    >
                      <strong>Tournament ID:</strong>{" "}
                      {selectedTournament.tournamentId}
                    </p>
                    <p
                      className="card-text"
                      style={{ marginBottom: "0.25rem", color: "#666" }}
                    >
                      <strong>Price Amount:</strong>{" "}
                      {selectedTournament.priceAmount}
                    </p>
                    <p
                      className="card-text"
                      style={{ marginBottom: "0.25rem", color: "#666" }}
                    >
                      <strong>Entry Fees:</strong>{" "}
                      {selectedTournament.entryFees}
                    </p>

                    <p
                      className="card-text"
                      style={{ marginBottom: "0.25rem", color: "#666" }}
                    >
                      <strong>Start Date:</strong>{" "}
                      {formatDate(selectedTournament.startDate)}
                    </p>
                    <p
                      className="card-text"
                      style={{ marginBottom: "0.25rem", color: "#666" }}
                    >
                      <strong>Team Limit:</strong>{" "}
                      {selectedTournament.teamLimit}
                    </p>
                    <p
                      className="card-text"
                      style={{ marginBottom: "0.25rem", color: "#666" }}
                    >
                      <strong>Teams Left:</strong>{" "}
                      {selectedTournament.teamLimit -
                        selectedTournament.teams.length}
                    </p>
                    <p
                      className="card-text"
                      style={{ marginBottom: "0.25rem", color: "#666" }}
                    >
                      <strong>Teams:</strong>{" "}
                      {selectedTournament.teams.join(", ")}
                    </p>
                    <p
                      className="card-text"
                      style={{ marginBottom: "0.25rem", color: "#666" }}
                    >
                      <strong>Organization Email:</strong>{" "}
                      {selectedTournament.organizationEmail.join(", ")}
                    </p>
                    <p
                      className="card-text"
                      style={{ marginBottom: "0.25rem", color: "#666" }}
                    >
                      <strong>Overs:</strong> {selectedTournament.overs}
                    </p>
                    <p
                      className="card-text"
                      style={{ marginBottom: "0.25rem", color: "#666" }}
                    >
                      <strong>Ball Type:</strong> {selectedTournament.ballType}
                    </p>
                    <p
                      className="card-text"
                      style={{ marginBottom: "0.25rem", color: "#666" }}
                    >
                      <strong>Matches Generated:</strong>{" "}
                      {selectedTournament.matchesGenerated ? "Yes" : "No"}
                    </p>
                    {selectedTournament.matchesGenerated ? (
                      <div>
                        <Link
                          to={`/tournaments/matches/${selectedTournament.tournamentId}`}
                        >
                          {" "}
                          <button
                            className="btn btn-primary mb-2"
                            style={{
                              backgroundColor: "#28A745",
                              borderColor: "#28A745",
                              marginRight: "5px",
                            }}
                            onClick={() =>
                              handleViewMatches(selectedTournament.tournamentId)
                            }
                          >
                            View Matches
                          </button>
                        </Link>
                        <button
                          className="btn btn-warning mb-2"
                          style={{
                            backgroundColor: "#FFC107",
                            borderColor: "#FFC107",
                          }}
                          onClick={() =>
                            handleReminderToTeams(
                              selectedTournament.tournamentId
                            )
                          }
                        >
                          Sent Remainder
                        </button>
                      </div>
                    ) : (
                      selectedTournament.teamLimit -
                        selectedTournament.teams.length ===
                        0 && (
                        <button
                          className="btn btn-primary mb-2"
                          style={{
                            backgroundColor: "#28A745",
                            borderColor: "#28A745",
                          }}
                          onClick={() =>
                            ScheduleMatches(selectedTournament.tournamentId)
                          }
                        >
                          Schedule Matches
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Start */}
      <div
        className="container-fluid bg-dark footer mt-5 py-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <h5 className="text-white mb-4">Our Office</h5>
              <p className="mb-2">
                <i className="fa fa-map-marker-alt me-3" />
                123 Street, New York, USA
              </p>
              <p className="mb-2">
                <i className="fa fa-phone-alt me-3" />
                +012 345 67890
              </p>
              <p className="mb-2">
                <i className="fa fa-envelope me-3" />
                info@example.com
              </p>
              <div className="d-flex pt-3">
                <a
                  className="btn btn-square btn-primary rounded-circle me-2"
                  href=""
                >
                  <i className="fab fa-twitter" />
                </a>
                <a
                  className="btn btn-square btn-primary rounded-circle me-2"
                  href=""
                >
                  <i className="fab fa-facebook-f" />
                </a>
                <a
                  className="btn btn-square btn-primary rounded-circle me-2"
                  href=""
                >
                  <i className="fab fa-youtube" />
                </a>
                <a
                  className="btn btn-square btn-primary rounded-circle me-2"
                  href=""
                >
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="text-white mb-4">Quick Links</h5>
              <a className="btn btn-link" href="/about">
                About Us
              </a>
              <a className="btn btn-link" href="/contact">
                Contact Us
              </a>
              <a className="btn btn-link" href="/#">
                Our Services
              </a>

              <a className="btn btn-link" href="/support">
                Support
              </a>
            </div>

            <div className="col-lg-3 col-md-6">
              <h5 className="text-white mb-4">Match Hours</h5>
              <p className="mb-1"></p>
              <h6 className="text-light">09:00 am - 12:00 pm</h6>
              <p className="mb-1"></p>
              <h6 className="text-light">12:00 pm - 3:00 pm</h6>
              <p className="mb-1"></p>
              <h6 className="text-light">3:00pm -6:00pm</h6>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="text-white mb-4">Live Match </h5>
              <p>If you want live scores subcribe for more</p>
              <div className="position-relative w-100">
                <input
                  className="form-control bg-transparent w-100 py-3 ps-4 pe-5"
                  type="text"
                  placeholder="Your email"
                />
                <button
                  type="button"
                  className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
                >
                  Subcribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid copyright bg-dark py-4">
        <div className="container text-center">
          <p className="mb-2">
            Copyright ©{" "}
            <a className="fw-semi-bold" href="#">
              Corporate Cricket
            </a>
            , All Right Reserved.
          </p>
          <p className="mb-0">
            {" "}
            <a className="fw-semi-bold" href="#"></a> <a href="#"></a>{" "}
          </p>
        </div>
      </div>

      <a
        href="#"
        className="btn btn-lg btn-primary btn-lg-square rounded-circle back-to-top"
      >
        <i className="bi bi-arrow-up" />
      </a>
    </>
  );
};

export default HomeWithOrgId;
