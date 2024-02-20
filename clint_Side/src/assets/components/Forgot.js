import React, { useState } from 'react';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import { API } from '../Data/baseIndex';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
  
    try {
      const response = await axios.post(`${API}api/auth/forgot-password`, { email });
      setMessage(response.data.message);
    } catch (error) {
      console.log(error);
      if (!error.response) {
        setError('Server is offline. Please try again later.');
      } else {
        setError(error.response.data.message);
      }
    }
    
    setLoading(false);
  };
  
  return (
    <div
      className="flex flex-col lg:flex-row min-h-screen justify-center align-middle items-center p-6"
      style={{
        backgroundImage: 'url("https://source.unsplash.com/random/1600x900")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full lg:w-1/3 backdrop-blur-lg bg-white/30 flex justify-center items-center rounded-md shadow-2xl ">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-900">
              Forgot password?
            </h1>
            <p className="mt-2 text-sm text-gray-900 dark:text-gray-900">
              Remember your password?{' '}
              <a
                className="text-orange-600 decoration-2 hover:underline font-medium"
                href="/login"
              >
                Login here
              </a>
            </p>
          </div>
          <div className="mt-5">
            <form onSubmit={handleForgotPassword}>
              <div className="grid gap-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold ml-1 mb-2 dark:text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email address"
                      className="w-full rounded-md border border-gray-400 p-2 text-sm"
                      required=""
                      aria-describedby="email-error"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                   
                  </div>
                  <p
                    className="hidden text-xs text-red-600 mt-2"
                    id="email-error"
                  >
                    Please include a valid email address so we can get back to
                    you
                  </p>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                {message && <p className="text-green-600">{message}</p>}
                <button
                  type="submit"
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-orange-500 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 relative" // Added 'relative' class
                  disabled={loading}
                >
                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center"> {/* Added absolute positioning to spinner */}
                      <ClipLoader
                        color="#fff"
                        loading={loading}
                        size={20}
                      />
                    </div>
                  )}
                  <span style={{ visibility: loading ? 'hidden' : 'visible' }}>
                    Reset password
                  </span>
                </button>
                <div className="mt-2 text-gray-700 text-center">
                  <a
                    href="/"
                    className="font-bold text-orange-500 hover:text-orange-600"
                  >
                    Go Back To Home
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
