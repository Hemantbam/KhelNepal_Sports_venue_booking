import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Correct import statement for jwtDecode
import { Check } from '../assets/Data/baseIndex';
import Login from '../assets/components/Login';
import Register from '../assets/components/Register';
import ResetPassword from '../assets/components/Reset';
import Forgot from '../assets/components/Forgot';
import ContactUs from '../assets/pages/Contactus';
import About from '../assets/pages/Aboutus';
import HomePage from '../assets/pages/HomePagee';
import Venue from '../assets/pages/Venues';
import VenueDetail from '../assets/pages/VenueDetail';
import Dashboard from '../assets/Dashboard/pages/Dashboard';
import Booking from '../assets/components/Booking';
import TermsModal from '../assets/components/termsmodel';
import Profile from '../assets/pages/Profile';
import OTP from '../assets/components/Verifyotp';

const Router = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

const AppRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert milliseconds to seconds

        // Check if token is expired
        if (decodedToken.exp < currentTime) {
          // Token is expired, remove it from localStorage and show alert
          localStorage.removeItem('token');
          alert('Your session has expired. Please log in again.');
        }
      } catch (error) {
        // Handle decoding error (e.g., invalid token format)
        console.error('Error decoding token:', error);
        localStorage.removeItem('token');
        alert('Error decoding token. Please log in again.');
      }
    }
    
    // Perform any other actions needed on route change
    Check();
    window.scrollTo(0, 0);
  }, [location.pathname]); // Only re-run effect when location.pathname changes

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path='/verify/:email' element={<OTP />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/terms" element={<TermsModal />} />
      <Route path="/forgotpassword" element={<Forgot />} />
      <Route path="/reset/:token" element={<ResetPassword />} />

      {/* Private routes that require authentication */}
      <Route
        path="/dashboard"
        element={localStorage.getItem('token') ? <Dashboard /> : <Navigate to="/login" />}
      />

      <Route path="/aboutus" element={<About />} />
      <Route path="/venues" element={<Venue />} />
      <Route path="/venues/:id" element={<VenueDetail />} />
      <Route path="/venues/booking/:id/:user" element={<Booking />} />
      <Route path="/contactus" element={<ContactUs />} />
    </Routes>
  );
};

export default Router;
