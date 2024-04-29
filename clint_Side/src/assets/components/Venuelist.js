import React from 'react';
import { Link } from "react-router-dom";
import { API } from '../Data/baseIndex';
import User from './smallcomponents/User';

export default function Venuelist({ venues }) {
  return (
    <div className="min-h-screen bg-gray-200">
      <div className="max-w-7xl mx-auto py-7 px-4 sm:px-6 lg:px-8">
        <h1 className="text-6xl mt-16 font-bold text-center text-orange-600">
          Venue List
        </h1>
      </div>
      {/* Service List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-start">
          {venues.map((res, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-4 mb-8">
              <div className="max-w-lg bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                <img className="w-full h-44 sm:h-44 object-cover object-center" src={`${API}${res.image}`} alt='Venue' />
                <div className="p-5">
                  <User userid={res.managedBy} />
                  <h2 className="text-lg font-semibold text-gray-800 mb-2 mt-2 overflow-hidden line-clamp-3 h-14">{res.name}</h2>
                  <p className="text-gray-600 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 inline-block mr-3' viewBox="0 0 384 512">
                      <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
                    </svg>
                    {res.location}
                  </p>
                  <small className='text-gray-800'>Capacity: {res.capacity}</small>
                  <p className="text-orange-600 mb-2 font-bold">Rs.{res.pricePerHour}</p>
                  <Link to={`/venues/${res._id}`} className="block w-full">
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
