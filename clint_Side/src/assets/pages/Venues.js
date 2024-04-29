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
  const [filteredVenues, setFilteredVenues] = useState([]); // State for filtered venues
  const [currentPage, setCurrentPage] = useState(1);
  const [venuesPerPage] = useState(12); // Number of venues per page
  const [sortOrder, setSortOrder] = useState('asc'); // Default sort order

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get(`${API}api/venues`);
        setVenues(response.data.venues);
        setFilteredVenues(response.data.venues); // Initialize filteredVenues with all venues
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching venues:', error);
      }
    };

    fetchVenues();
  }, []);

  // Function to handle sorting venues
  const handleSort = (sortBy) => {
    const sortedVenues = mergeSort(filteredVenues, sortBy, sortOrder);
    setFilteredVenues(sortedVenues);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sort order after sorting
  };

  // Merge sort function for sorting venues
  const mergeSort = (array, sortBy, sortOrder) => {
    if (array.length <= 1) {
      return array;
    }

    const mid = Math.floor(array.length / 2);
    const left = mergeSort(array.slice(0, mid), sortBy, sortOrder);
    const right = mergeSort(array.slice(mid), sortBy, sortOrder);

    return merge(left, right, sortBy, sortOrder);
  };
  const merge = (left, right, sortBy, sortOrder) => {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;
  
    while (leftIndex < left.length && rightIndex < right.length) {
      let comparison;
      if (sortBy === 'recent' || sortBy === 'updatedRecent') {
        comparison = sortOrder === 'asc' ?
          (left[leftIndex][sortBy] < right[rightIndex][sortBy]) :
          (left[leftIndex][sortBy] > right[rightIndex][sortBy]);
      } else if (sortBy === 'pricePerHour') {
        comparison = sortOrder === 'asc' ?
          (parseFloat(left[leftIndex][sortBy]) > parseFloat(right[rightIndex][sortBy])) :
          (parseFloat(left[leftIndex][sortBy]) < parseFloat(right[rightIndex][sortBy]));
      } else if (sortBy === 'capacity') {
        comparison = sortOrder === 'asc' ?
          (left[leftIndex][sortBy] < right[rightIndex][sortBy]) :
          (left[leftIndex][sortBy] > right[rightIndex][sortBy]);
      } else {
        comparison = sortOrder === 'asc' ?
          (left[leftIndex][sortBy] < right[rightIndex][sortBy]) :
          (left[leftIndex][sortBy] > right[rightIndex][sortBy]);
      }
      if (comparison) {
        result.push(left[leftIndex++]);
      } else {
        result.push(right[rightIndex++]);
      }
    }
  
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  };
  
  
  // Pagination logic for all venues
  const indexOfLastVenue = currentPage * venuesPerPage;
  const indexOfFirstVenue = indexOfLastVenue - venuesPerPage;
  const currentVenues = filteredVenues.slice(indexOfFirstVenue, indexOfLastVenue);

  // Pagination logic for filtered venues
  const totalFilteredPages = Math.ceil(filteredVenues.length / venuesPerPage);
  const handleFilteredPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle search
  const handleSearch = (query, location) => {
    const filtered = venues.filter((venue) =>
      venue.name.toLowerCase().includes(query.toLowerCase()) &&
      venue.location.toLowerCase().includes(location.toLowerCase())
    );
    setFilteredVenues(filtered);
    setCurrentPage(1); // Reset to the first page when searching
  };

  return (
    <>
      <Navbar />
      <VenueHero onSearch={handleSearch} onSort={handleSort} />
      <Venuelist venues={currentVenues} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalFilteredPages} // Pass total pages of filtered venues
        onPageChange={handleFilteredPageChange} // Pass the function to handle page change for filtered venues
      />
      <Footer />
    </>
  );
}
