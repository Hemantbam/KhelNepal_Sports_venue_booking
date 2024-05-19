import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VenueHero from '../components/VenueHero';
import Venuelist from '../components/Venuelist';
import Pagination from '../components/smallcomponents/Pagination';
import { API } from '../Data/baseIndex';

const Venue = () => {
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const venuesPerPage = 12;

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get(`${API}api/venues`);
        const venuesData = response.data.venues;
        setVenues(venuesData);
        setFilteredVenues(venuesData);
      } catch (error) {
        console.error('Error fetching venues:', error);
      }
    };

    fetchVenues();
  }, []);

  const mergeSort = (array, sortBy) => {
    if (array.length <= 1) {
      return array;
    }

    const mid = Math.floor(array.length / 2);
    const left = array.slice(0, mid);
    const right = array.slice(mid);

    return merge(
      mergeSort(left, sortBy),
      mergeSort(right, sortBy),
      sortBy
    );
  };

  const merge = (left, right, sortBy) => {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      switch (sortBy) {
        case 'oldest':
          if (new Date(left[leftIndex].createdAt) <= new Date(right[rightIndex].createdAt)) {
            result.push(left[leftIndex]);
            leftIndex++;
          } else {
            result.push(right[rightIndex]);
            rightIndex++;
          }
          break;
        case 'newest':
          if (new Date(left[leftIndex].createdAt) >= new Date(right[rightIndex].createdAt)) {
            result.push(left[leftIndex]);
            leftIndex++;
          } else {
            result.push(right[rightIndex]);
            rightIndex++;
          }
          break;
        case 'highestPrice':
          if (parseFloat(left[leftIndex].pricePerHour) >= parseFloat(right[rightIndex].pricePerHour)) {
            result.push(left[leftIndex]);
            leftIndex++;
          } else {
            result.push(right[rightIndex]);
            rightIndex++;
          }
          break;
        case 'lowestPrice':
          if (parseFloat(left[leftIndex].pricePerHour) <= parseFloat(right[rightIndex].pricePerHour)) {
            result.push(left[leftIndex]);
            leftIndex++;
          } else {
            result.push(right[rightIndex]);
            rightIndex++;
          }
          break;
        case 'highestCapacity':
          if (left[leftIndex].capacity >= right[rightIndex].capacity) {
            result.push(left[leftIndex]);
            leftIndex++;
          } else {
            result.push(right[rightIndex]);
            rightIndex++;
          }
          break;
        case 'lowestCapacity':
          if (left[leftIndex].capacity <= right[rightIndex].capacity) {
            result.push(left[leftIndex]);
            leftIndex++;
          } else {
            result.push(right[rightIndex]);
            rightIndex++;
          }
          break;
        default:
          break;
      }
    }

    while (leftIndex < left.length) {
      result.push(left[leftIndex]);
      leftIndex++;
    }

    while (rightIndex < right.length) {
      result.push(right[rightIndex]);
      rightIndex++;
    }

    return result;
  };

  const handleSort = (sortBy) => {
    const sortedVenues = mergeSort(filteredVenues, sortBy);
    setFilteredVenues(sortedVenues);
    setCurrentPage(1); // Reset to the first page after sorting
  };

  const handleSearch = (query, location) => {
    const filtered = venues.filter((venue) =>
      venue.name.toLowerCase().includes(query.toLowerCase()) &&
      venue.location.toLowerCase().includes(location.toLowerCase())
    );
    setFilteredVenues(filtered);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const indexOfLastVenue = currentPage * venuesPerPage;
  const indexOfFirstVenue = indexOfLastVenue - venuesPerPage;
  const currentVenues = filteredVenues.slice(indexOfFirstVenue, indexOfLastVenue);
  const totalFilteredPages = Math.ceil(filteredVenues.length / venuesPerPage);

  const handleFilteredPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Navbar />
      <VenueHero onSearch={handleSearch} onSort={handleSort} />
      <Venuelist venues={currentVenues} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalFilteredPages}
        onPageChange={handleFilteredPageChange}
      />
      <Footer />
    </>
  );
};

export default Venue;
