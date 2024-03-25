import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API } from '../Data/baseIndex';

const Venue = () => {
  const [isMoving, setIsMoving] = useState(false);
  const [venues, setVenues] = useState([]);
 // Number of venues per page

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get(`${API}api/venues`);
        // Sort venues by creation date in descending order
        const sortedVenues = response.data.venues.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        // Take the first 6 venues
        const recentVenues = sortedVenues.slice(0, 6);
        setVenues(recentVenues);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching venues:', error);
      }
    };
    fetchVenues();
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  return (
    <Carousel
    responsive={responsive}
    ssr
    infinite={false}
    beforeChange={() => setIsMoving(true)}
    afterChange={() => setIsMoving(false)}
    containerClass="carousel-container"
    itemClass="carousel-item"
    >

        {venues.map(venue => (
          <div key={venue._id} className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <img className="w-full h-60 object-cover object-center" src={`${API}${venue.image}`} alt={venue.name} />
            <div className="p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{venue.name}</h2>
              <p className="text-gray-600 mb-2">Price per hour: ${venue.pricePerHour}</p>
              <p className="text-gray-600 mb-4">Location: {venue.location}</p>
              <Link to={`/venues/${venue._id}`} className="px-3 py-2 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700 transition duration-300">View Details</Link>
            </div>
          </div>
        ))}
        
    </Carousel>
  );
};

export default Venue;
