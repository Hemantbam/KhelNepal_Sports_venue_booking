// Dashboard.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Nav from '../components/Nav';
import Sidebar from '../components/SideBar';
import Das from '../components/Das';
import EditProfile from '../components/Editprofile';
import AddVenue from '../components/AddVenue';
import Join from '../components/Join';
import { Check } from '../../Data/baseIndex';
import VenueList from '../components/Venuelist';
import UsersEdit from '../components/Usersedit';
import ContactList from '../components/Contactuslist';
import SubscriberList from '../components/Subscriberlist';
import JoinRequest from '../components/JoinRequest';
import { jwtDecode } from 'jwt-decode';
import EditVenue from '../components/EditVenue';
import BookingsList from '../components/BookingList';

export default function Dashboard() {
  const [content, setContent] = useState(jwtDecode(localStorage.getItem('token')).role=='basic'?<EditProfile/>:<Das />);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const history = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      history('/login');
    }
  }, []);

  const handleMenuClick = (menuItem) => {
 
    switch (menuItem) {
      case 'dashboard':
        setContent(<Das />);
        break;
      case 'editProfile':
        setContent(<EditProfile  />);
        break;
      case 'addVenue':
        setContent(<AddVenue />);
        break;
      case 'join':
        setContent(<Join />);
        break;
      case 'venues':
        setContent(<VenueList onMenuClick={handleMenuClick} />);
        break;
        case 'userlist':
          setContent(<UsersEdit  onMenuClick={handleMenuClick} />
          );
          break;
      case 'contactlist':
        setContent(<ContactList />);
        break;
      case 'subscriberlist':
        setContent(<SubscriberList />);
        break;
      case 'venuereqlist':
        setContent(<JoinRequest onMenuClick={handleMenuClick} />);
        break;
        case 'editvenue':
          setContent(<EditVenue  />);
          break;
          case 'bookinglist':
            setContent(<BookingsList  />);
            break;
      default:
        break;
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <Nav onMenuClick={toggleSidebar} />
      <div className="flex overflow-hidden bg-white pt-16">
        <Sidebar isOpen={isSidebarOpen} onMenuClick={handleMenuClick} />
        <div
          id="main-content"
          className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"
        >
          {content}
        </div>
      </div>
    </div>
  );
}
