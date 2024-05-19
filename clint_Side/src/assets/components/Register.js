import React, { useState } from 'react';
import axios from 'axios';
import { API } from '../Data/baseIndex';
import { Link, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
  
    if (!termsAccepted) {
      setError('Please accept the terms and conditions to create an account.');
      setLoading(false);
      return;
    }
  
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }
  
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }
  
    if (!validateUsername(username)) {
      setError('Username must be lowercase letters only and cannot contain spaces.');
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.post(`${API}api/auth/register`, { username, password, email });
      setSuccess(response.data.message);
      setPassword('');
      setConfirmPassword('');
      setLoading(false);
      setTimeout(() => {
        navigate(`/verify/${email}`);
      }, 1000);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('Server is offline. Please try again later.');
      }
      setLoading(false);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateUsername = (username) => {
    const usernameRegex = /^[a-z][a-z0-9]*$/; // Only lowercase letters or letters + numbers, no spaces
    return usernameRegex.test(username);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex justify-center align-middle" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1487466365202-1afdb86c764e?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="flex flex-col items-center justify-center sm:w-2/3 md:w-3/5 lg:w-1/3 md:px-6  py-8 mx-auto md:h-screen ">
        <div className="backdrop-blur-lg w-full bg-white/50 flex flex-col  justify-center items-center rounded-md  p-4">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl dark:text-black pt-4 p-2">Create an account</h1>
          <form className="space-y-4 md:space-y-8  " onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Username</label>
              <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full rounded-md border border-gray-400 p-2 text-sm" placeholder="Your username" required />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your email</label>
              <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border border-gray-400 p-2 text-sm" placeholder="name@company.com" required />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full rounded-md border border-gray-400 p-2 text-sm" required />
                <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3" onClick={togglePasswordVisibility}>
                  {showPassword ?  <i className="fa fa-eye"></i>: <i className="fa fa-eye-slash"></i>}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Confirm password</label>
              <input type="password" name="confirm-password" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full rounded-md border border-gray-400 p-2 text-sm" placeholder="••••••••" required />
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required onChange={(e) => setTermsAccepted(e.target.checked)} />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-gray-500 dark:text-gray-900">
                  I accept the{' '}
                  <Link to="/terms" className="font-bold text-primary-600 hover:underline dark:text-orange-500">Terms and Conditions</Link>
                </label>
              </div>
            </div>
            {error && <div className="text-red-500 text-sm font-bold">{error}</div>}
            {success && <div className="text-green-500 text-sm font-bold">{success}</div>}
            <button type="submit" className="w-full relative flex justify-center items-center text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5" disabled={loading}>
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <ClipLoader color="#fff" loading={loading} size={20} />
                </div>
              )}
              <span style={{ visibility: loading ? 'hidden' : 'visible' }}>Sign in</span>
            </button>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-900">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-primary-600 hover:underline dark:text-orange-500">Login here</Link>
            </p>
            <div className="mt-2 text-gray-700 text-center">
              <Link to="/" className="font-bold text-orange-500 hover:text-orange-600">Go Back To Home</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
