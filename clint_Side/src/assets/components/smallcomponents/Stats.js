import React, { useEffect, useState } from 'react'
import { API } from '../../Data/baseIndex';
import axios from "axios";
const Stats = () => {
    const [stats, setStats] = useState([
        { id: 1, name: "Total Customers", value: "Calculating..." },
        { id: 2, name: "Total Venue", value: "Calculating..." },
        { id: 3, name: "Total Services", value: "Calculating..." },
      ]);
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            const usersResponse = await axios.get(`${API}api/allusers`);
            const bookingsResponse = await axios.get(`${API}api/bookings`);
            const venuesResponse = await axios.get(`${API}api/venues`);
    
            const totalUsers = usersResponse.data.users.length;
            const totalBookings = bookingsResponse.data.length;
            const totalVenues = venuesResponse.data.venues.length;
    
            setStats([
              { id: 1, name: "Total Customers", value: totalUsers.toString() },
              { id: 2, name: "Total Venue", value: totalVenues.toString() },
              { id: 3, name: "Total Bookings", value: totalBookings.toString() },
            ]);
          } catch (error) {
            console.error('Error fetching data:', error);
            // You can handle errors here
          }
        };
    
        fetchData();
      }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    {stats.map((stat) => (
      <div
        key={stat.id}
        className="mx-auto flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg"
      >
        <div className="text-lg font-semibold text-gray-600">
          {stat.name}
        </div>
        <div className="text-3xl font-bold text-orange-600 mt-2">
          {stat.value}
        </div>
      </div>
    ))}
  </div>
  )
}

export default Stats;