import React, { useState, useEffect } from "react";
import logo from "../../image/unnamed.png";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const Navbar = ({ onMenuClick }) => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        // Fetch the username based on the decoded token
        const decodedToken = jwtDecode(localStorage.getItem('token'));
        setUsername(decodedToken.username);
        setName(decodedToken.fullName);
        setId(decodedToken.id);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();

  }, []);

  const handleMenuClick = () => {
    onMenuClick(); // Call the parent component's function to toggle the sidebar
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              id="toggleSidebarMobile"
              aria-expanded="true"
              aria-controls="sidebar"
              className="md:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
              onClick={handleMenuClick}
            >
              <svg
                id="toggleSidebarMobileHamburger"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <a href="/" className="text-xl font-bold flex items-center lg:ml-2.5">
              <img src={logo} className="max-h-12 me-3 " alt="Windster Logo" />
            </a>
          </div>
          <div className=" ml-auto"> {/* Right-aligned content */}
            <Link to={`/profile/${id}`} className="text-orange-600 text-sm float-right block  mr-0  font-bold">
            <span className="invisible sm:visible"> Hello </span>{username} <span className="invisible sm:visible">{name!=""&&name!=null?`(${name})`:""}</span>
            </Link> {/* Show username */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
