import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import { API } from "../../Data/baseIndex";
import { Link } from "react-router-dom";
import LineChart from "./Chart";
import { jwtDecode } from "jwt-decode";


const Dashboard = () => {
  const [payments, setPayments] = useState([]);
  const [totalPayments, setTotalPayments] = useState(0);
  const [bookingsData, setBookingsData] = useState([]);
  const [totalVenues, setTotalVenues] = useState(0);
  const [venues, setVenues] = useState([]); // Declare venues state
  const [reviewsByVenue, setReviewsByVenue] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);

        // Fetch venues managed by the current user
        const venuesResponse = await axios.get(`${API}api/venues?managedBy=${decodedToken.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setVenues(venuesResponse.data.venues);
        setTotalVenues(venuesResponse.data.venues.length);

        // Extract venue ids from the response
        const venueIds = venuesResponse.data.venues.map(venue => venue._id);

        // Fetch bookings associated with each venue
        let aggregatedBookingsData = [];
        for (const venueId of venueIds) {
          const bookingsResponse = await axios.get(`${API}api/bookings?venue=${venueId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if (bookingsResponse.data && Array.isArray(bookingsResponse.data)) {
            const uniqueBookings = bookingsResponse.data.filter(newBooking => {
              return !aggregatedBookingsData.some(existingBooking => existingBooking._id === newBooking._id);
            });
            aggregatedBookingsData = [...aggregatedBookingsData, ...uniqueBookings];
          } else {
            console.error('Invalid bookings data:', bookingsResponse.data);
          }
        }
        setBookingsData(aggregatedBookingsData);

        // Fetch reviews for each venue
        const reviewsPromises = venueIds.map(async venueId => {
          const reviewsResponse = await axios.get(`${API}api/reviews?venueid=${venueId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          return { venueId, reviews: reviewsResponse.data.reviews };
        });

        // Resolve all promises and set reviews by venue
        Promise.all(reviewsPromises).then(reviewsData => {
          const reviewsByVenueMap = {};
          reviewsData.forEach(({ venueId, reviews }) => {
            reviewsByVenueMap[venueId] = reviews;
          });
          setReviewsByVenue(reviewsData.flatMap(data => data.reviews));
        });

        // Fetch payments data
        const paymentResponse = await axios.get(`${API}api/payments`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPayments(paymentResponse.data.payments);

        // Calculate total payments
        const total = calculateTotalPayments(paymentResponse.data.payments);
        setTotalPayments(total);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  // Calculate total payments
  const calculateTotalPayments = (bookings) => {
    return bookings.reduce((total, booking) => total + booking.amount, 0);
  };
  return (
    <main>
      <div className="pt-6 px-4">
        <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
          <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 2xl:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-shrink-0">
                <span className="text-2xl sm:text-3xl leading-none font-bold text-orange-600">
                  Total: Rs.{totalPayments / 100}/-
                </span>
              </div>
            </div>
            <LineChart bookings={bookingsData} />
          </div>
          <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Latest Transactions
                </h3>
                <span className="text-base font-normal text-gray-500">
                  This is a list of latest transactions
                </span>
              </div>
            </div>
            <div className="flex flex-col mt-8">
              <div className="overflow-x-auto rounded-lg">
                <div className="align-middle inline-block min-w-full">
                  <div className="shadow overflow-hidden sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Transaction
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Date & Time
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {payments.map((payment, index) => (
                          <tr key={index}>
                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                              Payment from <span className="font-semibold">{payment.paymentdetails && JSON.parse(payment.paymentdetails).user && JSON.parse(payment.paymentdetails).user.name}</span>
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                              {payment.createdAt && new Date(payment.createdAt).toLocaleString()}
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                              Rs.{payment.amount && payment.amount / 100}/-
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                  {bookingsData ? bookingsData.length : 0}
                </span>
                <h3 className="text-base font-normal text-gray-500">
                  Total Bookings
                </h3>
              </div>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                  {totalVenues ? totalVenues : 0}
                </span>
                <h3 className="text-base font-normal text-gray-500">
                  Total Venues
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
          <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Venue</h3>
            <span className="text-base font-normal text-gray-500">
              This is a list of your Venues
            </span>
            <div className="flex flex-col mt-8">
              <div className="overflow-x-auto rounded-lg">
                <div className="align-middle inline-block min-w-full">
                  <div className="shadow overflow-hidden sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Location
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price Per Hour
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Capacity
                          </th>

                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Created At
                          </th>

                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {venues.map(venue => (
                          <tr key={venue._id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm  text-orange-600 font-bold">
                              <Link to={`/venues/${venue._id}`}>{venue.name}</Link>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {venue.location}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              Rs.{venue.pricePerHour}/-
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {venue.capacity}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(venue.createdAt).toLocaleString()}
                            </td>

                          </tr>
                        ))}
                      </tbody>

                    </table>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div className="bg-white shadow mt-3 rounded-lg p-4 sm:p-6 xl:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Customer Feedback
            </h3>
            <span className="text-base font-normal text-gray-500">
              This is a summary of customer feedback
            </span>
            <div className="flex flex-col mt-8">
              <div className="overflow-x-auto rounded-lg">
                <div className="align-middle inline-block min-w-full">
                  <div className="shadow overflow-hidden sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Comment
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Rating
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {reviewsByVenue.map(review => (
                          <tr key={review._id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900">
                              {review.comment}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900">
                              {review.rating} Star
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default Dashboard;
