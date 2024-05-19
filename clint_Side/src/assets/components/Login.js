import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import { API } from '../Data/baseIndex';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setError('');
  
    try {
      const response = await axios.post(`${API}api/auth/login`, { identifier, password });
      localStorage.setItem('token', response.data.token);
      if (rememberMe) {
        localStorage.setItem('rememberMe', true);
      } else {
        localStorage.setItem('rememberMe', false);
      }
      setSuccessMessage(response.data.message);
      setTimeout(() => {
        navigate('/');
      }, 1000);
      setLoading(false);
    } catch (error) {
      if (error.response) {
        const responseData = error.response.data;
        if (responseData.verified === false) {
          // Redirect or navigate to the OTP verification page
          navigate(`/verify/${identifier}`);
        } else if (responseData.message === "User not found") {
          setError("User not found. Please try again with a valid email.");
        } else {
          // Handle other error cases based on the message received from the server
          setError(responseData.message);
        }
      } else {
        setError('Server is Offline. Please try again later.');
      }
      setLoading(false);
      
    }
  };

 

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
    style={{
      backgroundImage: 'url(https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1893&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="max-w-md w-full px-6 py-8 bg-white/50 backdrop-blur-lg rounded-md shadow-2xl">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-gray-900 mb-6 text-center">
          Sign in to your account
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="identifier" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                Email
              </label>
              <input
                type="email"
                name="identifier"
                id="identifier"
                className="w-full rounded-md border border-gray-400 p-2 text-sm"
                placeholder="Your email"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="w-full rounded-md border border-gray-400 p-2 text-sm"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={()=>{setShowPassword(!showPassword)}}
                >
                  {showPassword ? (
                    <i className="fa fa-eye-slash"></i>
                  ) : (
                    <i className="fa fa-eye"></i>
                  )}
                </button>
              </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {successMessage && <p className="text-green-600 font-bold">{successMessage}</p>}
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-gray-500 dark:text-gray-900">
                    Remember me
                  </label>
                </div>
              </div>
              <Link
                to="/forgotpassword"
                className="text-sm font-medium text-orange-500 hover:underline dark:text-primary-500"
              >
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full relative flex justify-center items-center text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
              disabled={loading}
            >
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <ClipLoader
                    color="#fff"
                    loading={loading}
                    size={20}
                  />
                </div>
              )}
              <span style={{ visibility: loading ? 'hidden' : 'visible' }}>
                Sign in
              </span>
            </button>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-900">
              Don’t have an account yet?{' '}
              <Link
                to="/signup"
                className="font-bold text-blue-600 hover:underline dark:text-orange-500"
              >
                Sign up
              </Link>
            </p>
            <div className="mt-2 text-gray-700 text-center">
              <Link
                to="/"
                className="font-bold text-orange-500 hover:text-orange-600"
              >
                Go Back To Home
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
