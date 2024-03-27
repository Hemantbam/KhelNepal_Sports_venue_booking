import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../../Data/baseIndex';
import User from '../../components/smallcomponents/User';
import { jwtDecode } from 'jwt-decode';

export default function VenueList() {
  const [venues, setVenues] = useState([]);
  const [decode] = useState(jwtDecode(localStorage.getItem('token')));
  console.log(decode);
  useEffect(() => {
    const fetchVenues = async () => {

      try {
        console.log(decode.role);
        if (decode.role == 'admin') {
          const response = await axios.get(`${API}api/venues`);
          setVenues(response.data.venues);
          console.log(response.data);
        } else {
          const response = await axios.get(`${API}api/venues?managedBy=${decode.id}`);
          setVenues(response.data.venues);
          console.error(response.data);
        }
      } catch (error) {
        console.error('Error fetching venues:', error);
      }
    };

    fetchVenues();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4 text-center">
      <h1 className="text-3xl font-semibold mb-4 text-orange-600 mx-auto">Venues</h1>
      {venues.length==0?'Nothing Added yet':<table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border py-2 px-4">S.N</th>
            <th className="border py-2 px-4">Name</th>
            {decode.role == 'admin' ? <th className="border py-2 px-4">User</th> : ''}
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
              <td className="border py-2 px-4">{venue.name}</td>
              {decode.role == 'admin' ? <td className="border py-2 px-4"><User userid={venue.managedBy} /></td> : ""}
              <td className="border py-2 px-4">{venue.location}</td>
              <td className="border py-2 px-4">{venue.capacity}</td>
              <td className="border py-2 px-4">Rs. {venue.pricePerHour}/-</td>
              <td className="border py-2 px-4">
                <div className="flex flex-col sm:flex-row justify-center">
                  <button
                    className="bg-orange-600 text-white px-3 py-1 rounded mb-2 sm:mr-2 sm:mb-0 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-600"
                  // onClick={() => handleEditVenue(venue._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                  // onClick={() => handleDeleteVenue(venue._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>}
    </div>
  );
}
