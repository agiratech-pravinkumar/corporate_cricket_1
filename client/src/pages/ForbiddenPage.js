import React from "react";
import Layout from "../components/Layout/Layout";
import error from "../images/403.jpg";

const ForbiddenPage = () => {
  const containerStyle = {
    backgroundImage: `url(${error})`, 
    backgroundSize: "cover",
    backgroundPosition: "center", 
    height: "100vh", 
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#000000" 
  };

  return (
    <Layout>
      <div style={containerStyle}>
        <h1>403 Forbidden</h1>
        <p>Sorry, you don't have permission to access this page.</p>
      </div>
    </Layout>
  );
};

export default ForbiddenPage;
