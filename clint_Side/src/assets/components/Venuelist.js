import React from 'react';
import { Link } from "react-router-dom";

export default function Venuelist() {
  var list = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col justify-center items-center">
      <div className="max-w-7xl mx-auto py-7 sm:px-6 lg:px-8">
        <h1 className="text-6xl mt-16 font-bold text-center text-orange-600">
          Venue List
        </h1>
      </div>
      {/* Service List */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap  -mx-4">
          {list.map((res, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mx-auto px-4 mb-8">
              <div className="max-w-lg bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                <img className="w-full h-64 sm:h-80 object-cover object-center" src='https://images.unsplash.com/photo-1589487391730-58f20eb2c308?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='Venue' />
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">Venue Name</h2>
                  <p className="text-gray-600 mb-2">Location</p>
                  <p className="text-gray-600 mb-4">Description</p>
                  <Link to="/venues/1121" className="block w-full ">
                    <button className="px-4 py-2 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700 transition duration-300">Book now</button>
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
