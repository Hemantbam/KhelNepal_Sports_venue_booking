import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KhaltiCheckout from "khalti-checkout-web";
import { API, khaltiPublic } from '../Data/baseIndex';
import {  useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Booking = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [Venue, setVenue] = useState({ pricePerHour: 0 });
    const [Bookings, setBookings] = useState(null);
    const { id, user } = useParams();
    const history = useNavigate();

    const [bookingData, setBookingData] = useState({
        venue: id,
        fullName: '',
        phoneNumber: '',
        email: '',
        startDate: '',
        endDate: '',
        paymentType: 'khalti', // Default payment type
        price: 0, // Price state initialized to 0
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookingData({
            ...bookingData,
            [name]: value
        });
    };

    const calculatePrice = (startDateStr, endDateStr) => {
        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);

        // Calculate duration in milliseconds
        const durationInMillis = endDate.getTime() - startDate.getTime();
        // Convert duration to hours
        const durationInHours = durationInMillis / (1000 * 60 * 60);
        // Get price per hour from Venue
        const pricePerHour = Venue.pricePerHour;
        // Calculate total price
        const totalPrice = Math.ceil(durationInHours * pricePerHour);

        return totalPrice <= 0 ? 0 : totalPrice;
    };
    const checkOverlap = (startDate1, endDate1, startDate2, endDate2) => {
        const start1 = new Date(startDate1);
        const end1 = new Date(endDate1);
        const start2 = new Date(startDate2);
        const end2 = new Date(endDate2);

        // Check for overlap
        return start1 < end2 && end1 > start2;
    };

    const handlephoneno=(e)=>{
        const value=e.target.value;
        if (value.length!=10) {
         setError("Phone no. must have 10 Numbers...");
         setTimeout(() => {
            setError("");
          }, 1000);
         return;
        }
        setBookingData((prevUser)=>({
         ...prevUser,
         phoneNumber:value
        }))
       }

    const handleBooking = async (e) => {
        e.preventDefault();
        const { fullName, email } = bookingData;

  // Check if fullName or email is not specified
  if (!fullName || !email || fullName.trim().length === 0 || email.trim().length === 0) {
    setError("Name and Email must be specified.");
    setTimeout(() => {
        setError("");
      }, 1000);
    return;
  }

        // Validate start date and end date
        const now = new Date();
        const startDate = new Date(Date.parse(bookingData.startDate));
        const endDate = new Date(Date.parse(bookingData.endDate));

        if (startDate <= now) {
            setError('Start date should be after the current date and time.');
            return;
        }
        if (endDate <= startDate) {
            setError('End date should be greater than the start date.');
            return;
        }
        let isOverlap = false;

        // Check for overlap with existing bookings
        if (Bookings) {
            Bookings.forEach(booking => {
                const { startDate: existingStart, endDate: existingEnd } = booking;
                if (checkOverlap(startDate, endDate, existingStart, existingEnd)) {
                    isOverlap = true;
                }
            });
        }

        if (isOverlap) {
            setError('Error: This time slot is already booked.');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem('token');

            const config = {
                "publicKey": khaltiPublic,
                "productIdentity": Venue._id,
                "productName": Venue.name?Venue.name:"Some",
                "productUrl": window.location.href,
                "paymentPreference": ["KHALTI"],
                "eventHandler": {
                    onSuccess: async (payload) => {
                        try {
                            const response = await axios.post(`${API}api/bookings`, {
                                bookingData: bookingData,
                                token: token,
                                khaltiData: payload
                            });
                            
                           if(response.status==200){
                            setSuccess(true);
                            setTimeout(() => {
                                setLoading(false);
                                history(`/venues/${id}`);
                            }, 2000);
                           }
                        } catch (error) {
                            setError(error.message || 'An error occurred during payment processing.');
                            setLoading(false);
                            console.error('Error processing payment:', error);
                        }
                    },
                    onError: (error) => {
                        setLoading(false);
                        setError("Payment Handler Error");
                        console.log(error);
                    },
                    onClose: () => {
                        setLoading(false);
                        console.log('Widget is closing');
                    }
                }
            };

            const checkout = new KhaltiCheckout(config);
            checkout.show({ amount: bookingData.price * 100 });

        } catch (error) {
            setError(error.message || 'An error occurred during payment processing.');
            setLoading(false);
            console.error('Error processing payment:', error);
        }
    };

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            alert("Login First");
            window.location.href = "/login"
        }
        if (user === jwtDecode(localStorage.getItem('token')).id) {
            alert("You cannot book your own Booking..");
            window.location.href = "/"
        }

        axios.get(`${API}api/venues?id=${id}`).then((response) => {
            console.log('Venue Info : ', response.data.venues[0]);
            setVenue(response.data.venues[0]);
        });
        axios.get(`${API}api/bookings?venue=${id}`).then((response) => {
            if (Array.isArray(response.data)) {
                const filteredBookings = response.data.filter(
                    res => res.status === "confirmed" && new Date(res.endDate) > new Date()
                );
                setBookings(filteredBookings)
            }
        });
    }, [id, user]);

    // Update price when startDate or endDate changes
    useEffect(() => {
        if (bookingData.startDate && bookingData.endDate) {
            const price = calculatePrice(bookingData.startDate, bookingData.endDate);
            setBookingData(prevData => ({
                ...prevData,
                price: price
            }));
        }
    }, [bookingData.startDate, bookingData.endDate]);


    return (
        <>
        <Navbar />
        <div className="flex flex-col  lg:flex-row min-h-screen justify-center items-start pt-20 p-2"
            style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Left Column - List of Bookings */}
            <section className="lg:w-1/2 p-5 mx-auto">
                <div className="container bg-gray-100 rounded-lg shadow flex py-2">
                    <div className="w-full mt-8 flex justify-center flex-col">
                        <h2 className="text-xl mt-2 font-bold leading-tight tracking-tight text-orange-600 md:text-2xl dark:text-orange-600 text-center">Booked Bookings</h2>
                        {Bookings && Bookings.length > 0 ? (
                            <table className="w-full table-auto">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2">S.N</th>
                                        <th className="px-4 py-2">Start</th>
                                        <th className="px-4 py-2">End</th>
                                        <th className="px-4 py-2">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Bookings.map((booking, index) => (
                                        <tr key={booking._id}>
                                            <td className="border px-4 py-2">{index + 1}</td>
                                            <td className="border px-4 py-2">{new Date(booking.startDate).toLocaleString()}</td>
                                            <td className="border px-4 py-2">{new Date(booking.endDate).toLocaleString()}</td>
                                            <td className="border px-4 py-2">{booking.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-500 text-center p-2">No confirmed bookings yet.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Right Column - Booking Form */}
            <section className="lg:w-1/2  p-5">
                <div className="bg-white shadow-xl rounded-xl p-5 ">
                    <h1 className="text-xl mt-2 font-bold leading-tight tracking-tight text-orange-600 md:text-2xl dark:text-orange-600 text-center">
                        Booking
                    </h1>
                    <form onSubmit={handleBooking} method="POST" className="mx-auto w-full ">
                        {/* Full Name Input */}
                        <div className="mb-5">
                            <label htmlFor="fullName" className="mb-3 block text-base font-medium text-[#07074D]">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                id="fullName"
                                required
                                placeholder="Full Name"
                                value={bookingData.fullName}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        {/* Phone Number Input */}
                        <div className="mb-5">
                            <label htmlFor="phoneNumber" className="mb-3 block text-base font-medium text-[#07074D]">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                name="phoneNumber"
                                id="phoneNumber"
                                required
                                placeholder="Phone Number"
                                value={bookingData.phoneNumber}
                                onChange={handlephoneno}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        {/* Email Address Input */}
                        <div className="mb-5">
                            <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                required
                                placeholder="Email Address"
                                value={bookingData.email}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        {/* Start Date Input */}
                        <div className="-mx-3 flex flex-wrap mb-5">
                            <div className="w-full px-3 sm:w-1/2">
                                <label htmlFor="startDate" className="mb-3 block text-base font-medium text-[#07074D]">
                                    Start Date
                                    <br />
                                    <small>Start date should be greater than today's date and time.</small>
                                </label>
                                <input
                                    type="datetime-local"
                                    name="startDate"
                                    id="startDate"
                                    required
                                    value={bookingData.startDate}
                                    onChange={handleInputChange}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                            {/* End Date Input */}
                            <div className="w-full px-3 sm:w-1/2">
                                <label htmlFor="endDate" className="mb-3 block text-base font-medium text-[#07074D]">
                                    End Date
                                    <br />
                                    <small>End date should be greater than start date.</small>
                                </label>
                                <input
                                    type="datetime-local"
                                    name="endDate"
                                    id="endDate"
                                    required
                                    value={bookingData.endDate}
                                    onChange={handleInputChange}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                        {/* Payment Type Input */}
                        <div className="mb-5">
                            <label htmlFor="paymentType" className="mb-3 block text-base font-medium text-[#07074D]">
                                Payment Type
                            </label>
                            <select
                                name="paymentType"
                                id="paymentType"
                                value={bookingData.paymentType}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            >
                                <option value="khalti">Khalti</option>
                            </select>
                        </div>
                        {/* Total Price Display (ReadOnly) */}
                        <div className="mb-5">
                            <label htmlFor="price" className="mb-3 block text-base font-medium text-[#07074D]">
                                Total Price (Rs.)
                            </label>
                            <input
                                type="text"
                                id="price"
                                value={bookingData.price}
                                readOnly
                                className="w-full rounded-md border text-red-500 border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium outline-none"
                            />
                        </div>
                        {/* Error or Success Messages */}
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                        {success && <p className="text-green-500 mt-2">Payment successful!</p>}
                        {/* Submit Button */}
                        <div>
                            <button type="submit" className="hover:bg-orange-700 w-full rounded-md bg-orange-600 py-3 px-8 text-center text-base font-semibold text-white outline-none" disabled={loading}>
                                {loading ? 'Processing...' : 'Book Now!!!'}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
        <Footer />
    </>
    );
}

export default Booking;
