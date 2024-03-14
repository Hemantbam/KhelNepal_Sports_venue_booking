import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VenueHero from '../components/VenueHero';
import Venuelist from '../components/Venuelist';
import Pagination from '../components/smallcomponents/Pagination';
import { API } from '../Data/baseIndex';

export default function Venue() {
  const [venues, setVenues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [venuesPerPage] = useState(12); // Number of venues per page

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get(`${API}api/venues`);
        setVenues(response.data.venues);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching venues:', error);
      }
    };

    fetchVenues();
  }, []);

  // Pagination logic
  const indexOfLastVenue = currentPage * venuesPerPage;
  const indexOfFirstVenue = indexOfLastVenue - venuesPerPage;
  const currentVenues = venues.slice(indexOfFirstVenue, indexOfLastVenue);

  const totalPages = Math.ceil(venues.length / venuesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Navbar />
      <VenueHero />
      <Venuelist venues={currentVenues} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      <Footer />
    </>
  );
}
