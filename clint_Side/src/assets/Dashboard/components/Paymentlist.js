import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../../Data/baseIndex';
import { Link } from 'react-router-dom';
import User from '../../components/smallcomponents/User';

export default function PaymentList() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const paymentsResponse = await axios.get(`${API}api/payments?all=true`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const paymentsData = paymentsResponse.data.payments;
                const paymentsWithDetails = [];

                for (const payment of paymentsData) {
                    const bookingResponse = await axios.get(`${API}api/bookings?id=${payment.bookingid}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    const venueResponse = await axios.get(`${API}api/venues?id=${payment.venueid}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    const bookingDetails = bookingResponse.data[0];
                    const bookerName = bookingDetails?.fullName;
                    const bookerId = bookingDetails?.user;
                    const bookingStatus = bookingDetails?.status;
                    const manager=venueResponse.data.venues[0]?.managedBy;
                    const venueName = venueResponse.data.venues[0]?.name;

                    const paymentWithDetails = {
                        ...payment,
                        bookerName,
                        bookerId,
                        bookingStatus,
                        venueName,
                        manager
                    };

                    paymentsWithDetails.push(paymentWithDetails);
                }

                setPayments(paymentsWithDetails);
                setLoading(false);
                setError(null);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
                setLoading(false);
                setPayments([]);
            }
        };

        fetchData();
    }, []);

    console.log(payments);

    const handlePaymentClick = async (paymentId) => {
        const confirmed = window.confirm('Are you sure you want to proceed with payment?');

        if (confirmed) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.put(`${API}api/payments`, { id: paymentId, setRedirect: true }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log(response.data.message);

                setPayments(prevPayments => prevPayments.map(payment => {
                    if (payment._id === paymentId) {
                        return { ...payment, redirected: true };
                    }
                    return payment;
                }));
            } catch (error) {
                console.error('Error updating payment:', error);
                // Handle error
            }
        } else {
            console.log('Payment canceled');
            // Handle cancellation
        }
    };

    return (
        <div className="container mx-auto py-8 px-4 text-center">
            <h1 className="text-3xl font-semibold mb-4 text-orange-600 mx-auto">Payments</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <div>
                    {payments.length === 0 ? (
                        <p>No payments available.</p>
                    ) : (
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="border py-2 px-4">S.N</th>
                                    <th className="border py-2 px-4">Booker Name</th>
                                    <th className="border py-2 px-4">Venue Name</th>
                                    <th className="border py-2 px-4">Booker Profile</th>
                                    <th className="border py-2 px-4">Payment Amount</th>
                                    <th className="border py-2 px-4">Status</th>
                                    <th className="border py-2 px-4">Booking Status</th>
                                    <th className="border py-2 px-4">Managed By</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((payment, index) => (
                                    <tr key={payment._id} style={{ backgroundColor: payment.redirected ? '#eaeaea' : 'rgba(0, 255, 0, 0.3)' }}>
                                        <td className="border py-2 px-4">{index + 1}</td>
                                        <td className="border py-2 px-4">
                                            {payment.bookerName}
                                        </td>
                                        <td className="border py-2 px-4 text-orange-600 font-bold">
                                            <Link to={`/venues/${payment.venueid}`}>{payment.venueName}</Link>
                                        </td>
                                        <td className="border py-2 px-4 text-orange-600 font-bold">
                                            <Link to={`/profile/${payment.bookerId}`}><User userid={payment.bookerId} /></Link>
                                        </td>
                                        <td className="border py-2 px-4">Rs. {payment.amount / 100}/-</td>
                                        <td className="border py-2 px-4">
                                            {payment.redirected ? 'Already Paid' : (
                                                <button className='bg-orange-600 text-white px-3 py-2 rounded-md hover:bg-orange-800 transition-colors active:scale-90' onClick={() => handlePaymentClick(payment._id)}>Pay Now</button>
                                            )}
                                        </td>
                                        <td className="border py-2 px-4">
                                            {payment.bookingStatus}
                                        </td>
                                        <td className="border py-2 px-4 text-orange-600 font-bold">
                                        <Link to={`/profile/${payment.manager}`}><User userid={payment.manager} /></Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
}
