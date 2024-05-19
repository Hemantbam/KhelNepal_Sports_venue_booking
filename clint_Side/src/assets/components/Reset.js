import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { API } from '../Data/baseIndex';

const ResetPassword = () => {
  const { token } = useParams();
  const formattedToken = token ? token.split('=')[1] : ''; // Check if token exists before splitting
const navigate =useNavigate();
  useEffect(() => {
    console.log('Token:', formattedToken);
  }, [formattedToken]);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true); // Set loading to true when form is submitted
    setError('');

    try {
      const response = await fetch(`${API}api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword: password, token: formattedToken }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        // Redirect to login page or any other page after successful password reset
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setError('An error occurred while resetting password');
    } finally {
      setLoading(false); // Set loading to false after form submission is completed
    }
  };

  return (
    <section
      className="bg-gray-50 dark:bg-gray-900"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?q=80&w=1481&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
        <div className="w-full lg:w-1/3 backdrop-blur-lg bg-white/30 flex justify-center items-center rounded-md shadow-2xl">
          <div className="p-4 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl dark:text-black">
              Reset Password
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-gray-400 p-2 text-sm"
                  placeholder="Enter your new password"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-md border border-gray-400 p-2 text-sm"
                  placeholder="Confirm your new password"
                  required
                />
              </div>
              {error && <div className="text-red-500 text-sm font-bold">{error}</div>}
              {message && <div className="text-green-500 text-sm font-bold">{message}</div>}
              <button
                type="submit"
                className="relative w-full text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                disabled={loading}
              >
                {loading ? (
                  <div className=" flex items-center justify-center">
                    <ClipLoader color="#fff" loading={loading} size={20} />
                  </div>
                ) : (
                  "Reset Password"
                )}
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-900">
                Remember your password?{' '}
                <a
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-orange-500"
                >
                  Login here
                </a>
              </p>
              <div className="mt-2 text-gray-700 text-center">
                <a
                  href="/"
                  className="font-bold text-orange-500 hover:text-orange-600"
                >
                  Go Back To Home
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
