import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../../Data/baseIndex';
import User from '../../components/smallcomponents/User';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

export default function VenueList({ onMenuClick }) {
  const [venues, setVenues] = useState([]);
  const [decode] = useState(jwtDecode(localStorage.getItem('token')));

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        let response;
        if (decode.role === 'admin') {
          response = await axios.get(`${API}api/venues`);
        } else {
          response = await axios.get(`${API}api/venues?managedBy=${decode.id}`);
        }
        setVenues(response.data.venues);
      } catch (error) {
        console.error('Error fetching venues:', error);
      }
    };

    fetchVenues();
  }, []);

  const handleVenueEdit = (id) => {
    console.log(`Editing venue with ID: ${id}`);
    // Set the venue ID in a cookie
    Cookies.set('selectedVenueId', id);
    // Trigger the menu click to switch to the edit venue page
    onMenuClick('editvenue');
  };

  const handleDeleteVenue = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(`${API}api/venues?id=${id}`, config);
      if (response.status === 200) {
        // Update the state to remove the deleted venue
        setVenues(venues.filter((venue) => venue._id !== id));
        alert('Venue deleted successfully');
      } else {
        alert('Failed to delete venue. Please try again later.');
      }
    } catch (error) {
      console.error('Error deleting venue:', error);
      alert('An error occurred while deleting venue. Please try again later.');
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 text-center">
      <h1 className="text-3xl font-semibold mb-4 text-orange-600 mx-auto">Venues</h1>
      {venues.length === 0 ? (
        <p>Nothing Added yet</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border py-2 px-4">S.N</th>
              <th className="border py-2 px-4">Name</th>
              {decode.role === 'admin' && <th className="border py-2 px-4">User</th>}
              <th className="border py-2 px-4">Location</th>
              <th className="border py-2 px-4">Capacity</th>
              <th className="border py-2 px-4">Price Per Hour</th>
              <th className="border py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {venues.map((venue, index) => (
              <tr key={venue._id} className="odd:bg-gray-100">
                <td className="border py-2 px-4">{index + 1}.</td>
                <td className="border py-2 px-4 font-bold text-orange-600"><Link to={`/venues/${venue._id}`}>{venue.name}</Link></td>
                {decode.role === 'admin' && <td className="border py-2 px-4"><Link to={`/profile/${venue.managedBy}`}> <User userid={venue.managedBy}/></Link></td>}
                <td className="border py-2 px-4">{venue.location}</td>
                <td className="border py-2 px-4">{venue.capacity}</td>
                <td className="border py-2 px-4">Rs. {venue.pricePerHour}/-</td>
                <td className="border py-2 px-4">
                  <div className="flex flex-col sm:flex-row justify-center">
                    <button
                      onClick={() => handleVenueEdit(venue._id)} // Pass a function reference
                      className="bg-orange-600 text-white px-3 py-1 rounded mb-2 sm:mr-2 sm:mb-0 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-600"
                    >
                      Edit
                    </button>
                    {(decode.role === 'admin' || decode.role === 'venue') && (
                      <button
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                        onClick={() => handleDeleteVenue(venue._id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
