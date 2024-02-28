import React, { useState } from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/SideBar";
import Das from "../components/Das";
import EditProfile from "../components/Editprofile"; // Import the EditProfile component or adjust the path accordingly
import AddVenue from "../components/AddVenue";
export default function DasBoard() {
  const [content, setContent] = useState(<Das />);

  const handleMenuClick = (menuItem) => {
    // Update the content based on the clicked menu item
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

      default:
        break;
    }
  };

  return (
    <div>
      <Nav />
      <div className="flex overflow-hidden bg-white pt-16">
        <Sidebar onMenuClick={handleMenuClick} />
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
