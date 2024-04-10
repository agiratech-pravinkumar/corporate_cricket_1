import React, { useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCardImage 
} from 'mdb-react-ui-kit';
import Layout from "../components/Layout/Layout";
import sigupImage from "../images/1.jpg";

const SignUpForm = () => {
  const [organization_name, setOrganization_name] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirm_password] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(`${process.env.REACT_APP_SERVER}/register`, { organization_name, email, password, confirm_password })
      .then((res) => {
        toast.success("Registration Successful", { autoClose: 5000 });
        window.location.replace(`/login`);
      })
      .catch((err) => {
        console.log(`Error is going on : ${err}`);
        toast.error("Registration failed. Please try again.", { autoClose: 5000 });
      });
  };

  return (
    <Layout>
  
      <MDBContainer fluid className="my-5">
        <MDBCard className='text-black'>
          <MDBCardBody>
            <MDBRow>
              <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                <h1 className="text-center fw-bold mb-5 mt-4">Sign up</h1>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="organizationName" className="fw-bold mb-2">Organization Name:</label>
                    <MDBIcon fas icon="building" size='lg' className="me-3"/>
                    <MDBInput id='organizationName' type='text' className='w-100' value={organization_name} onChange={(e) => setOrganization_name(e.target.value)} required/>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="fw-bold mb-2">Your Email:</label>
                    <MDBIcon fas icon="envelope" size='lg' className="me-3"/>
                    <MDBInput id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="fw-bold mb-2">Password:</label>
                    <MDBIcon fas icon="lock" size='lg' className="me-3"/>
                    <MDBInput id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="fw-bold mb-2">Confirm Password:</label>
                    <MDBIcon fas icon="key" size='lg' className="me-3"/>
                    <MDBInput id='confirmPassword' type='password' value={confirm_password} onChange={(e) => setConfirm_password(e.target.value)} required/>
                  </div>

                  <MDBBtn className='mb-4' size='lg' type='submit'>Register</MDBBtn>
                </form>
                <div className="register-link">
                  <p className="text-center mb-0">Already have an account? <Link to="/login">Login</Link></p>
                </div>
              </MDBCol>

              <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                <MDBCardImage src={sigupImage} alt='registration' fluid/>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
      <ToastContainer />
    </Layout>
  );
};

export default SignUpForm;
