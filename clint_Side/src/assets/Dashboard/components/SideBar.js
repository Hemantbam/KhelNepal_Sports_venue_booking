import React, { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import { API } from "../../Data/baseIndex";
import axios from "axios";
const Sidebar = ({ isOpen, onMenuClick }) => {
  const [unreachedCount, setUnreachedCount] = useState(0);
  const [venueReqCount, setvenueReqCount] = useState(0);
  const [Basic, setBasic] = useState();
  const [Admin, setAdmin] = useState();

  useEffect(() => {
    const fetchUnreachedContacts = async () => {
      try {
        const response = await axios.get(`${API}api/contact`);
        const unreachedContacts = response.data.filter(contact => !contact.reached);
        setUnreachedCount(unreachedContacts.length);
        const response1 = await axios.get(`${API}api/allusers?venuereq=wanted`);
        setvenueReqCount(response1.data.users.length);
      } catch (error) {
        console.error('Error fetching unreached contacts:', error);
      }
    };

    fetchUnreachedContacts();
  }, []);

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");
    window.location.href = '/';
    // Navigate to the login page or perform any other logout action
    // You might need to implement routing or other logic here
  };

  const sidebarClassName = isOpen ? "block" : "hidden";
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.role == 'basic') {
        setBasic(true);
      }
      if (decodedToken.role == 'admin') {
        setAdmin(true);
      }
    }

  }, []);
  return (
    <aside
      id="sidebar"
      className={`fixed z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75 ${sidebarClassName}`}
      aria-label="Sidebar"
    >
      <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex-1 px-3 bg-white divide-y justify-between space-y-1 flex flex-col">
            <ul className="space-y-2 pb-2 ">
              {/* Dashboard */}
              {!Basic?<li className="cursor-pointer">
                <span
                  onClick={() => onMenuClick("dashboard")}
                  className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group"
                >
                  <svg
                    className="w-6 h-6 mr-3 text-gray-500 group-hover:text-gray-900 transition duration-75"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5c0-1.1.9-2 2-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                    />
                  </svg>

                  Dashboard
                </span>
              </li>
:<></>}
              {/* Edit Profile */}
              <li className="cursor-pointer">
                <span
                  onClick={() => onMenuClick("editProfile")}
                  className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group"
                >
                  <svg
                    className="w-6 h-6 mr-3 text-gray-500 group-hover:text-gray-900 transition duration-75"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 14a7 7 0 01-7 7"
                    />
                  </svg>

                  Edit Profile
                </span>
              </li>
              {Basic ? <li className="cursor-pointer">
                <span
                  onClick={() => onMenuClick("join")}
                  className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M21 3v4.586c0 .346-.08.687-.232 1H19M16.414 19l-2.293-2.293a2 2 0 0 0-2.828 0l-7 7" />
                    <path d="M18 10l3-3-3-3" />
                    <path d="M18 10l3 3-3 3" />
                  </svg>


                  Join
                </span>
              </li> : <></>}

              {!Basic ? <li className="cursor-pointer">
                <span
                  onClick={() => onMenuClick("addVenue")}
                  className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group"
                >
                  <svg
                    className="w-6 h-6 mr-3 text-gray-500 group-hover:text-gray-900 transition duration-75"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add Venue
                </span></li> : <></>}
              {!Basic ? <li className="cursor-pointer">
                <span
                  onClick={() => onMenuClick("venues")}
                  className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="mr-3"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M21 3v4.586c0 .346-.08.687-.232 1H19M16.414 19l-2.293-2.293a2 2 0 0 0-2.828 0l-7 7" />
                    <path d="M18 10l3-3-3-3" />
                    <path d="M18 10l3 3-3 3" />
                  </svg>


                  Venue List
                </span>
              </li> : <></>}
              {!Basic && Admin ? <li className="cursor-pointer">
                <span
                  onClick={() => onMenuClick("userlist")}
                  className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="mr-3"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M21 3v4.586c0 .346-.08.687-.232 1H19M16.414 19l-2.293-2.293a2 2 0 0 0-2.828 0l-7 7" />
                    <path d="M18 10l3-3-3-3" />
                    <path d="M18 10l3 3-3 3" />
                  </svg>


                  Users List
                </span>
              </li> : <></>}

              {!Basic && Admin ? <li className="cursor-pointer">
                <span
                  onClick={() => onMenuClick("subscriberlist")}
                  className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="mr-3"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M21 3v4.586c0 .346-.08.687-.232 1H19M16.414 19l-2.293-2.293a2 2 0 0 0-2.828 0l-7 7" />
                    <path d="M18 10l3-3-3-3" />
                    <path d="M18 10l3 3-3 3" />
                  </svg>


                  Subscriber List
                </span>
              </li> : <></>}
              {!Basic && Admin ? <li className="cursor-pointer relative">
                <span
                  onClick={() => onMenuClick("contactlist")}
                  className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="mr-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 3v4.586c0 .346-.08.687-.232 1H19M16.414 19l-2.293-2.293a2 2 0 0 0-2.828 0l-7 7" />
                    <path d="M18 10l3-3-3-3" />
                    <path d="M18 10l3 3-3 3" />
                  </svg>

                  Contact List
                  {unreachedCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                      {unreachedCount}
                    </span>
                  )}
                </span>
              </li> : <></>}
              {!Basic && Admin ? (
                <li className="cursor-pointer relative">
                  <span
                    onClick={() => onMenuClick("venuereqlist")}
                    className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group relative" // Added relative class
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="mr-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 3v4.586c0 .346-.08.687-.232 1H19M16.414 19l-2.293-2.293a2 2 0 0 0-2.828 0l-7 7" />
                      <path d="M18 10l3-3-3-3" />
                      <path d="M18 10l3 3-3 3" />
                    </svg>
                    Request List (Manager)
                    {venueReqCount > 0 && (
                      <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                        {venueReqCount}
                      </span>
                    )}
                  </span>
                </li>
              ) : (
                <></>
              )}

                <li className="cursor-pointer relative">
                  <span
                    onClick={() => onMenuClick("bookinglist")}
                    className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group relative" // Added relative class
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="mr-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 3v4.586c0 .346-.08.687-.232 1H19M16.414 19l-2.293-2.293a2 2 0 0 0-2.828 0l-7 7" />
                      <path d="M18 10l3-3-3-3" />
                      <path d="M18 10l3 3-3 3" />
                    </svg>
                    Booking List
                    
                  </span>
                </li>
             

            </ul>


            <ul className="space-y-2 pb-2 ">


              {/* Log Out */}
              <li className="cursor-pointer ">
                <span
                  onClick={() => {
                    onMenuClick("logout");
                    handleLogout();
                  }}
                  className="text-base text-orange-600 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group"
                >
                  <svg
                    className="w-6 h-6 mr-3 text-orange-600 group-hover:text-orange-700 transition duration-75"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5zm4 12h6m-3-3v6"
                    />
                  </svg>

                  Log Out
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
