import React from 'react';
import { Link } from "react-router-dom";
import { API } from '../Data/baseIndex';
import User from './smallcomponents/User';

export default function Venuelist({ venues }) {
  const calculateWidth = () => {
    // Calculate width based on the number of venues
    const venueCount = venues.length;
    if (venueCount === 1) {
      return 'w-full'; // If only one venue, take full width
    } else if (venueCount === 2) {
      return 'w-full sm:w-1/2'; // If two venues, each takes half width on small screens
    } else {
      return 'w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4'; // For three or more venues, use responsive grid
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col justify-center items-center">
      <div className="max-w-7xl mx-auto py-7 sm:px-6 lg:px-8">
        <h1 className="text-6xl mt-16 font-bold text-center text-orange-600">
          Venue List
        </h1>
      </div>
      {/* Service List */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap -mx-4">
          {venues.map((res, index) => (
            <div key={index} className={`${calculateWidth()} px-4 mb-8`}>

              <div className="max-w-lg bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                <img className="w-full h-64 sm:h-80 object-cover object-center" src={`${API}${res.image}`} alt='Venue' />
                <div className="p-5">
                  <User userid={res.managedBy} />
                  <h2 className="text-lg font-semibold text-gray-800 mb-2 mt-2">{res.name}</h2>
                  <p className="text-gray-600 mb-2">{res.location}</p>
                  <p className="text-orange-600 mb-4 font-bold ">Rs.{res.pricePerHour}</p>
                  <Link to={`/venues/${res._id}`} className="block w-full ">
                    <button className="px-4 py-2 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700 transition duration-300">View Details</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
