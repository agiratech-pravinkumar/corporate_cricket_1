import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "../components/Layout/Layout";
import loginImage from "../images/about4.jpg";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
} from 'mdb-react-ui-kit';

function LoginForm() {
  const [organization_id, setOrganizationId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post(`${process.env.REACT_APP_SERVER}/login`, { organization_id, password });
      console.log("Login response:", response);
      if (response.status === 200) {
        const { token } = response.data; // Extract token from response
        toast.success("Login Successful", { autoClose: 5000 });
        // Store token in local storage
        localStorage.setItem('token', token);
        setTimeout(() => {
          window.location.replace(`/home/${organization_id}`);
        }, 2000); // Adjust the delay time as needed (in milliseconds)
      } else {
        toast.error("Login failed. Please try again.", { autoClose: 5000 });
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      toast.error("An error occurred during login. Please try again.", { autoClose: 5000 });
    }
  };
  
  return (
    <Layout>
      <MDBContainer className="my-5">
        <MDBCard>
          <MDBRow className='g-0'>
            <MDBCol md='6'>
              <MDBCardImage src={loginImage} alt="login form" className='rounded-start w-100'/>
            </MDBCol>
            <MDBCol md='6'>
              <MDBCardBody className='d-flex flex-column'>
                <div className='d-flex flex-row mt-2'>
                  <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                  <span className="h1 fw-bold mb-0">CORPORATE LOGIN</span>
                </div>
                <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="organizationId" className="form-label fw-bold">Organization Id</label>
                    <MDBInput id='organizationId' type='text' size="lg" value={organization_id} onChange={(e) => setOrganizationId(e.target.value)} required/>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-bold">Password</label>
                    <MDBInput id='password' type='password' size="lg" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                  </div>
                  <MDBBtn className="mb-4 px-5" color='dark' size='lg' type="submit">Login</MDBBtn>
                </form>
                <a className="small text-muted" href="#!">Forgot password?</a>
                <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <Link to="/register" style={{color: '#393f81'}}>Register here</Link></p>
                <div className='d-flex flex-row justify-content-start'>
                  <a href="#!" className="small text-muted me-1">Terms of use.</a>
                  <a href="#!" className="small text-muted">Privacy policy</a>
                </div>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
      <ToastContainer />
    </Layout>
  );
}

export default LoginForm;
