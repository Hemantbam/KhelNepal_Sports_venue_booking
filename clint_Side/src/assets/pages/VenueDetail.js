import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { API } from '../Data/baseIndex';

export default function SingleVenue() {
  const { id } = useParams(); // Get the venue ID from the URL params
  const [venue, setVenue] = useState(null);
  const [facilities, setfacilities] = useState(null);
  useEffect(() => {
    // Fetch venue data by ID
    axios.get(`${API}api/venues?id=${id}`)
      .then(res => {
        setVenue(res.data.venues[0]); // Set the fetched venue data to state
        setfacilities(res.data.venues[0].facilities.split(','));
      })
      .catch(err => console.error(err));
  }, [id]); // Trigger useEffect whenever the ID changes

  // If venue data is still loading, display a loading message
  if (!venue) {
    return <div>Loading...</div>;
  }

  // Once venue data is fetched, display the venue details
  return (
    <>
      <Navbar />
      <section className="text-gray-300 bg-white dark:bg-gray-200 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt={venue.name}
              className="lg:w-1/2 w-full lg:h-96 h-64 object-contain object-center rounded shadow-md"
              src={`${API}${venue.image}`} // Replace with venue image URL
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 text-2xl">
              <h2 className="text-sm title-font text-gray-500 dark:text-gray-900 tracking-widest">
                Venue
              </h2>
              <h1 className="text-gray-900 dark:text-gray-900 text-3xl title-font font-medium mb-1">
                {venue.name} {/* Display venue name */}
              </h1>
              <div className="flex mb-4">
                {/* Display star rating */}
                <span className="flex items-center">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <svg
                      key={index}
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className={`w-4 h-4 text-${venue.starRating > index ? 'orange' : 'gray'}-600`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  ))}
                  <span className="text-gray-900 dark:text-gray-900 ml-3">
                    {venue.starRating} Star Reviews
                  </span>
                </span>
              </div>
              
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-800">
                  Price Per Hour<br/>
               <span className='text-orange-600'>   Rs. {venue.pricePerHour}/hr {/* Display venue price per hour */}</span>
                </span>
              </div>
              <div className="py-2 mb-2 mt-2">
                
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Facilities:</h2>
              <ul className="list-disc list-inside">
                {facilities.map((facility, index) => (
                  <li key={index} className="text-gray-800 dark:text-gray-800 text-sm ">qq</li>
                ))}
              </ul>
              </div>
              <Link
                key={venue._id} to={`/venues/booking/${venue._id}`}
                className="ml-auto mt-4 rounded-md bg-orange-600 px-3.5  py-2 text-base font-semibold leading-7 text-white hover:bg-red-500"
              >
                Book Now
              </Link>
            </div>
            <p className="leading-relaxed dark:text-gray-800">
                {venue.description} {/* Display venue description */}
              </p>
          </div>

        </div>
      </section>
      <Footer />
    </>
  );
}
