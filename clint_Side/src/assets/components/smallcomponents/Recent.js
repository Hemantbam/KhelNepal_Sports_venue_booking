import React, { useState, useEffect } from 'react';
import { API } from '../../Data/baseIndex';
import axios from 'axios';
import { Link } from 'react-router-dom';
import User from './User';

const BookBy = ({ id }) => {
  const [booking, setBooking] = useState([]);
  const [visibleItems, setVisibleItems] = useState(3);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`${API}api/bookings?venue=${id}`);
        setBooking(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBooking();
  }, [id]);

  const handleSeeMore = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + 10);
  };

  const handleShowLess = () => {
    setVisibleItems(prevVisibleItems => Math.max(prevVisibleItems - 10, 3));
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Previously Booked By</h2>
      <ul>
        {booking.slice(0, visibleItems).map((item, index) => (
          <li key={item._id} className="py-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              
              <div className="flex-1 md:ml-4">
              <span className="font-semibold w-6 mb-2 md:mb-0 md:mr-4">{index + 1}.</span>
                <p className="font-semibold"><User userid={item.user} /></p>
              </div>
              <Link to={`/profile/${item.user}`} className="mt-2 md:mt-0 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700">
                View Profile
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <div className="text-center mt-4">
      {visibleItems > 3 && (
          <button onClick={handleShowLess} className="text-orange-600 ml-2">
            Show Less
          </button>
        )}
        {booking.length > visibleItems && (
          <button onClick={handleSeeMore} className="text-orange-600">
            Show More
          </button>
        )}
      
      </div>
    </div>
  );
};

export default BookBy;
