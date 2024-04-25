import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../../Data/baseIndex';
import { jwtDecode } from 'jwt-decode';
import VenueName from './venuename';

export default function BookingsList({ onMenuClick }) {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const decodedToken = jwtDecode(token);

            let bookingsData = [];

            if (decodedToken.role === 'admin') {
                const response = await axios.get(`${API}api/bookings`);
                bookingsData = response.data;
            } else if (decodedToken.role === 'venue') {
                const venueResponse = await axios.get(`${API}api/venues?managedBy=${decodedToken.id}`);
                const venues = venueResponse.data.venues;

                // Iterate over each venue ID and fetch bookings separately
                for (const venue of venues) {
                    const response = await axios.get(`${API}api/bookings?venue=${venue._id}`);
                    bookingsData.push(...response.data);
                }
            } else {
                const response = await axios.get(`${API}api/bookings?user=${decodedToken.id}`);
                bookingsData = response.data;
            }

            setBookings(bookingsData);
            setLoading(false);
            setError(null);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data');
            setLoading(false);
            setBookings([]);
        }
    };

    const handleConfirmBooking = async (bookingId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${API}api/bookings?id=${bookingId}`, { status: 'confirmed' }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                window.alert('Booking confirmed successfully!');
                fetchData();
            } else {
                throw new Error('Failed to confirm booking');
            }
        } catch (error) {
            console.error('Error confirming booking:', error);
            window.alert('Failed to confirm booking');
        }
    };

    const handleCancelBooking = async (bookingId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${API}api/bookings?id=${bookingId}`, { status: 'cancelled' }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                window.alert('Booking canceled successfully!');
                fetchData();
            } else {
                throw new Error('Failed to cancel booking');
            }
        } catch (error) {
            console.error('Error canceling booking:', error);
            window.alert('Failed to cancel booking');
        }
    };

    return (
        <div className="container mx-auto py-8 px-4 text-center">
            <h1 className="text-3xl font-semibold mb-4 text-orange-600 mx-auto">Bookings</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <div>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="border py-2 px-4">S.N</th>
                                <th className="border py-2 px-4">Venue</th>
                                <th className="border py-2 px-4">Start Date</th>
                                <th className="border py-2 px-4">End Date</th>
                                <th className="border py-2 px-4">Booked By</th>
                                <th className="border py-2 px-4">Phone No</th>
                                <th className="border py-2 px-4">Price</th>
                                <th className="border py-2 px-4">Action</th>
                                <th className="border py-2 px-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings && bookings.map((booking, index) => (
                                <tr key={booking._id} className={`${booking.status === 'completed' ? 'bg-purple-100' :
                                        booking.status === 'pending' ? 'bg-blue-100' :
                                            booking.status === 'confirmed' ? 'bg-green-100' :
                                                'bg-red-100'
                                    }`}>
                                    <td className="border py-2 px-4">{index + 1}</td>
                                    <td className="border py-2 px-4 text-orange-600 font-bold">
                                        <VenueName venueId={booking.venue} />
                                    </td>
                                    <td className="border py-2 px-4">{new Date(booking.startDate).toLocaleString()}</td>
                                    <td className="border py-2 px-4">{new Date(booking.endDate).toLocaleString()}</td>
                                    <td className="border py-2 px-4">{booking.fullName || "Not Given"}</td>
                                    <td className="border py-2 px-4">{booking.phoneNumber || "-"}</td>
                                    <td className="border py-2 px-4">{'Rs.' + booking.price || "-"}</td>
                                    <td className="border py-2 px-4">
                                        {(jwtDecode(localStorage.getItem('token')).role === 'basic' &&
                                            booking.status === 'pending') && (
                                                <button
                                                    onClick={() => handleCancelBooking(booking._id)}
                                                    className="bg-red-400 mt-2 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    Cancel
                                                </button>
                                            )}

                                        {(jwtDecode(localStorage.getItem('token')).role !== 'basic' &&
                                            booking.status === 'pending') && (
                                                <>
                                                    {jwtDecode(localStorage.getItem('token')).role === 'admin' ? (
                                                        <>
                                                            <button
                                                                onClick={() => handleConfirmBooking(booking._id)}
                                                                className="bg-green-400 mt-2 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
                                                                disabled={booking.status !== 'pending'}
                                                            >
                                                                Confirm
                                                            </button>
                                                            <button
                                                                onClick={() => handleCancelBooking(booking._id)}
                                                                className="bg-red-400 mt-2 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                                                disabled={booking.status !== 'pending'}
                                                            >
                                                                Cancel
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            {booking.user === jwtDecode(localStorage.getItem('token')).id ? (
                                                                <button
                                                                    onClick={() => handleCancelBooking(booking._id)}
                                                                    className="bg-red-400 mt-2 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                                                >
                                                                    Cancel
                                                                </button>
                                                            ) : (
                                                                <>
                                                                    <button
                                                                        onClick={() => handleConfirmBooking(booking._id)}
                                                                        className="bg-green-400 mt-2 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
                                                                        disabled={booking.status !== 'pending'}
                                                                    >
                                                                        Confirm
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleCancelBooking(booking._id)}
                                                                        className="bg-red-400 mt-2 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                                                        disabled={booking.status !== 'pending'}
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                </>
                                                            )}
                                                        </>
                                                    )}
                                                </>
                                            )}
                                    </td>


                                    <td className="border py-2 px-4 text-gray-800 font-bold">
                                        {booking.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
