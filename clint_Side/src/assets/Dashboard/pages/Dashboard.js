import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory for navigation
import Nav from "../components/Nav";
import Sidebar from "../components/SideBar";
import Das from "../components/Das";
import EditProfile from "../components/Editprofile";
import AddVenue from "../components/AddVenue";
import Join from "../components/Join";
import { Check } from "../../Data/baseIndex";
import VenueList from "../components/Venuelist";


export default function DasBoard() {
  const [content, setContent] = useState(<Das />);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const history = useNavigate(); // Access the history object for navigation
  useEffect(() => {
  
    // Check if token exists in local storage
    const token = localStorage.getItem("token");
    if (!token) {
      // Navigate to login page if token is not found
      history("/login");
     
    }
  }, []);
  Check();
  const handleMenuClick = (menuItem) => {

    switch (menuItem) {
      case "dashboard":
        setContent(<Das />);
        break;
      case "editProfile":
        setContent(<EditProfile />);
        break;
      case "addVenue":
        setContent(<AddVenue />);
        break;
      case 'join':
        setContent(<Join />)
        break;
        case 'venues':
          setContent(<VenueList/>)
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
