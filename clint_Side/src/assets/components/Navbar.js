import React, { useState, useEffect } from "react";
import logo from "../image/unnamed.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [Logged, setLogged] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logout=()=>{
    localStorage.removeItem("token");
    window.location.reload();
  }
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem("token");
    if (token) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, []);

  return (
    <nav className="block fixed w-screen px-4 py-2 mx-auto text-black bg-white border shadow-md rounded-e-xl border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
      <div className={`container flex flex-col lg:flex-row ${isMenuOpen ? 'justify-center' : 'justify-between'} items-center mx-auto text-blue-gray-900`}>
        {/* Logo and Mobile Menu Button */}
        <div className="flex justify-around items-center w-full lg:w-auto">
          <img
            src={logo}
            alt="khelnepal logo"
            className="h-12 me-3"
          />
          {/* Mobile Menu Button */}
          <button
            className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
            type="button"
            onClick={toggleMenu}
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              )}
            </span>
          </button>
        </div>

        {/* Navigation Links Section */}
        <div className={`lg:flex ${isMenuOpen ? 'block' : 'hidden'}`}>
          <ul className="flex flex-col lg:flex-row gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:items-center lg:gap-6">
            <li className="flex items-center p-1 font-sans text-xl antialiased font-medium leading-normal gap-x-2 text-blue-gray-900">
              <Link to="/" className="flex items-center">
                Home
              </Link>
            </li>
            <li className="flex items-center p-1 font-sans text-xl antialiased font-medium leading-normal gap-x-2 text-blue-gray-900">
              <Link to="/venues" className="flex items-center">
                Venue
              </Link>
            </li>
            <li className="flex items-center p-1 font-sans text-xl antialiased font-medium leading-normal gap-x-2 text-blue-gray-900">
              <Link to="/aboutus" className="flex items-center">
                About Us
              </Link>
            </li>
            <li className="flex items-center p-1 font-sans text-xl antialiased font-medium leading-normal gap-x-2 text-blue-gray-900">
              <Link to="/contactus" className="flex items-center">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Buttons Section */}
        <div className={`lg:flex ${isMenuOpen ? 'block' : 'hidden'}`}>
          <ul className="flex flex-col lg:flex-row gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:items-center lg:gap-6">
            {Logged ? (
              <>
                <li>
                <Link to="/dashboard" className="flex items-center">
                  <button
                    className="px-4 py-2 font-sans text-lg font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                    type="button"
                  >
                    
                      <span>Dashboard</span>
                    
                  </button>
                  </Link>
                </li>
                <li>
                  <button
                    className="select-none rounded-lg bg-gradient-to-tr bg-orange-600 py-2 px-4 text-center align-middle font-sans text-lg font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-xl hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                    type="button"
                    onClick={logout}
                  >
                    
                      <span>Logout</span>
                    
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button
                    className="px-4 py-2 font-sans text-lg font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                    type="button"
                  >
                    <Link to="/login" className="flex items-center">
                      <span>Log In</span>
                    </Link>
                  </button>
                </li>
                <li>
                  <button
                    className="select-none rounded-lg bg-gradient-to-tr bg-orange-600 py-2 px-4 text-center align-middle font-sans text-lg font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-xl hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                    type="button"
                  >
                    <Link to="/signup" className="flex items-center">
                      <span>Sign up</span>
                    </Link>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
