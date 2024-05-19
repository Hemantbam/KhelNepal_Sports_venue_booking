import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { API } from '../Data/baseIndex';
import { Link, useNavigate, useParams } from 'react-router-dom';

const OTP = () => {
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const {email}=useParams();

  useEffect(() => {
    if (localStorage.getItem('token')) navigate('/');
    // Focus on the first OTP input field when the component mounts
    inputRefs.current[0]?.focus();
  }, [navigate]);

  const handleChangeOtp = (index, value) => {
    if (value.length > 1 || !/^\d*$/.test(value)) return; // Validate input to allow only digits
    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value;
    setOtpDigits(newOtpDigits);

    // Automatically focus on the next OTP input field if available
    if (index < 5 && value.length === 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otp = otpDigits.join(''); // Combine OTP digits into a single string
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${API}api/auth/verify`, {email, otp });
      setSuccessMessage(response.data.message);

      if(response.status==200){
       setTimeout(() => {
        navigate("/login");
        setLoading(false);
        return;
       }, 2000);
      }
      // Perform actions after successful OTP verification
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
      // Clear OTP input fields on verification failure
      setOtpDigits(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus(); // Focus back on the first OTP input field
    }
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-cover"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`, // Replace URL with desired background image
      }}
    >
      <div className="max-w-md w-full px-6 py-8 bg-white/30 backdrop-blur-lg rounded-md shadow-2xl text-center">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-gray-900 mb-6 text-center">
          Verify OTP
        </h1>
        <div className="flex justify-center mb-4 space-x-2">
          {otpDigits.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              className="w-10 h-10 rounded-md border border-gray-400 text-center"
              value={digit}
              onChange={(e) => handleChangeOtp(index, e.target.value)}
              ref={(input) => (inputRefs.current[index] = input)} // Ref for each OTP input field
            />
          ))}
        </div>
        <button
          type="button"
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleVerifyOtp}
          disabled={loading || otpDigits.some((digit) => digit === '')}
        >
          {loading ? <ClipLoader color="#fff" loading={loading} size={20} /> : 'Verify OTP'}
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {successMessage && <p className="text-green-600 font-bold mt-4">{successMessage}</p>}
        <div className="mt-2 text-gray-700 text-center">
          <Link to="/" className="font-bold text-orange-500 hover:text-orange-600">
            Go Back To Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OTP;
