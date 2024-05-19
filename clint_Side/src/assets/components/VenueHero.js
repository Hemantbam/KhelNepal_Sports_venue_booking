import React, { useState } from "react";

const VenueHero = ({ onSearch, onSort }) => {
  const backgroundImageUrl =
    "url('https://images.unsplash.com/photo-1602357280104-742c517a1d82?q=80&w=1550&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent'); // Default sorting option

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query, locationQuery); // Pass both search query and location query to the parent component
  };

  const handleLocationChange = (e) => {
    const location = e.target.value;
    setLocationQuery(location);
    onSearch(searchQuery, location); // Pass both search query and location query to the parent component
  };

  const handleSortChange = (e) => {
    const selectedSortBy = e.target.value;
    setSortBy(selectedSortBy);
    onSort(selectedSortBy); // Pass the selected sorting option to the parent component
  };

  return (
    <div
      className="bg-cover bg-center bg-orange-600 text-white py-9 "
      style={{ backgroundImage: backgroundImageUrl }}
    >
      <div className=" mx-auto px-4 min-h-96 flex align-middle flex-col mt-20">
        <p className="text-orange-300 font-bold text-center text-lg md:text-xl lg:text-2xl mb-4">Explore the Venues</p>
        <p className="text-white font-bold text-center text-lg md:text-xl lg:text-2xl mb-4">Connect, collaborate</p>
        <p className="text-orange-300 font-bold text-center text-lg md:text-xl lg:text-2xl mb-8">Your one-stop-shop for all your service needs</p>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row w-full justify-center items-start  flex-wrap lg:mr-4 mb-4 lg:mb-0">
            <input
              type="text"
              placeholder="Search venues..."
              className="text-gray-800 font-bold border border-gray-400 rounded-l-lg p-2 mb-2 lg:mb-0"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <input
              type="text"
              placeholder="Search by location..."
              className="text-gray-800 font-bold border border-gray-400 rounded-r-lg p-2"
              value={locationQuery}
              onChange={handleLocationChange}
            />
          </div>
          <div className="flex flex-row w-full mx-auto justify-center items-start flex-wrap lg:ml-4 mt-2">
            <select
              className="text-gray-800 font-bold border border-gray-400 rounded-lg p-2"
              value={sortBy}
              onChange={handleSortChange}
            >

              <option value="oldest">Oldest</option>
              <option value="newest">Newest</option>
              <option value="lowestCapacity">Capacity (Low to High)</option>
              <option value="highestCapacity">Capacity (High to Low)</option>
              <option value="lowestPrice">Price Per Hour (Low to High)</option>
              <option value="highestPrice">Price Per Hour (High to Low)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueHero;
