import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { API } from "../Data/baseIndex";

const About = () => {
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
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center py-12 px-6 bg-gray-100 pt-10">
        <h2 className="text-4xl text-gray-800 font-extrabold mb-4 py-16">
          About Us
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="md:w-1/2 max-w-2xl text-center md:text-left mb-8">
            <p className="text-lg text-gray-700">
              Welcome to{" "}
              <span className="font-bold text-xl text-orange-600">
                KhealNepal
              </span>
              ,where your passion for sports meets seamless convenience. We are
              not just a booking website.we're the bridge between enthusiasts
              and the perfect venue for your games, events, and celebrations.
              Born from a love of sports, our platform simplifies the process of
              finding and booking diverse sports facilities. With easy booking,
              transparent information, and a passionate community, we are
              committed to enhancing your sports experience. Join us in creating
              unforgettable moments.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1631194758628-71ec7c35137e?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="About Us"
              className="w-full md:max-w-md rounded-md shadow-lg"
            />
          </div>
        </div>
      </div>
      <div className="py-12 bg-gray-100">
        <div className="mx-auto max-w-4xl">
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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
