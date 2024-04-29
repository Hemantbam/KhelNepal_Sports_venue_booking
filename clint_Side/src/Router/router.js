import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { API, Check } from '../assets/Data/baseIndex';
import { jwtDecode } from 'jwt-decode';
import Login from '../assets/components/Login';
import Register from '../assets/components/Register';
import ResetPassword from '../assets/components/Reset';
import Forgot from '../assets/components/Forgot';
import ContactUs from '../assets/pages/Contactus';
import About from '../assets/pages/Aboutus'
import Homepage from '../assets/pages/HomePage';
import Venue from '../assets/pages/Venues';
import VenueDetail from '../assets/pages/VenueDetail';
import DasBoard from '../assets/Dashboard/pages/Dashboard';
import Booking from '../assets/components/Booking';

const Router = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

const AppRoutes = () => {
  const location = useLocation(); // Using useLocation here

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      Check();
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert seconds to milliseconds

      // Check if token is expired
      if (decodedToken.exp < currentTime) {
        // Token is expired, remove it from localStorage and show alert
        localStorage.removeItem('token');
        alert('Your session has expired. Please log in again.');
      }
    }
  }, [location.pathname&&2000]); // Call useEffect whenever location.pathname changes

  return (
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
      <Route path='/dashboard' element={<DasBoard />} />
      <Route path="/aboutus" element={<About />} />
      <Route path="/venues" element={<Venue />} />
      <Route path="/venues/:id" element={<VenueDetail />} />
      <Route path="/venues/booking/:id" element={<Booking />} />
      <Route path="/contactus" element={<ContactUs  />} />
    </Routes>
  );
};

export default Router;
