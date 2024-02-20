import React, { useState,useEffect } from 'react';
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
  const navigate=useNavigate();
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
      }else{
        localStorage.setItem('rememberMe', false);
      }
      setSuccessMessage(response.data.message);
      setTimeout(() => {
        navigate('/');
      }, 1000);
      setLoading(false);
      // Redirect or do something upon successful login
    } catch (error) {
      if (error.response) {
        // Server responded with an error status code
        setError(error.response.data.message);
      } else {
        // Server did not respond
        setError('Server is Ofline. Please try again later.');
      }
      setLoading(false);
    }
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/flagged/photo-1556554946-c10ef755bded?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-md w-full px-6 py-8 bg-white/30 backdrop-blur-lg rounded-md shadow-2xl">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-gray-900 mb-6 text-center">
          Sign in to your account
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="identifier" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                Email or Username
              </label>
              <input
                type="text"
                name="identifier"
                id="identifier"
                className="w-full rounded-md border border-gray-400 p-2 text-sm"
                placeholder="Your email or username"
                required=""
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="w-full rounded-md border border-gray-400 p-2 text-sm"
                required=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
                    required=""
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
            <p className="text-sm font-light text-gray-500 dark:text-gray-900">
              Don’t have an account yet?{' '}
              <Link
                to="/signup"
                className="font-medium text-blue-600 hover:underline dark:text-orange-500"
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
