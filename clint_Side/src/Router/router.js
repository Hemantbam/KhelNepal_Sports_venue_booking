import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Login from '../assets/components/Login';
import Register from '../assets/components/Register';
import ResetPassword from '../assets/components/Reset';
import Forgot from '../assets/components/Forgot';
import ContactUs from '../assets/pages/Contactus';
import About from '../assets/pages/Aboutus'
import Homepage from '../assets/pages/HomePage';

const Router = () => {

  useEffect(() => {
    if (localStorage.getItem('rememberMe') === 'false') {
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('token');
    }

    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert seconds to milliseconds

      // Check if token is expired
      if (decodedToken.exp < currentTime) {
        // Token is expired, remove it from localStorage and show alert
        localStorage.removeItem('token');
        alert('Your session has expired. Please log in again.');
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />

        {!localStorage.getItem('token') && (
          <>
            <Route path="/signup" element={<Register />} />
            <Route path="/forgotpassword" element={<Forgot />} />
            <Route path="/reset/:token" element={<ResetPassword />} />
          </>
        )}
        <Route path="/aboutus" element={<About />} />
      
        <Route path="/contactus" element={<ContactUs />} />
       
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
