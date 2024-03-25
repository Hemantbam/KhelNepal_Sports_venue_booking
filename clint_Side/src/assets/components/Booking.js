import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KhaltiCheckout from "khalti-checkout-web";
import { API } from '../Data/baseIndex';
import { useNavigate, useParams } from 'react-router-dom';

const Booking = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [Venue, setVenue] = useState({ pricePerHour: 0 });
    const { id } = useParams();
    const history = useNavigate();
    
    const [bookingData, setBookingData] = useState({
        venue: id,
        fullName: '',
        phoneNumber: '',
        email: '',
        startDate: '',
        endDate: '',
        paymentType: 'khalti', // Default payment type
        price: 0, // Add a state for price
    });

    const handleInputChange = (e) => {
        setBookingData({
            ...bookingData,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        if(!localStorage.getItem('token')){
            alert("Login First");
            window.location.href= "/login"
        }
        axios.get(`${API}api/venues?id=${id}`).then((response) => {
            console.log('Venue Info : ', response.data.venues[0]);
            setVenue(response.data.venues[0]);
        });
    }, [id]);

    useEffect(() => {
        // Calculate price when startDate or endDate changes
        if (bookingData.startDate && bookingData.endDate) {
            const price = calculatePrice(bookingData.startDate, bookingData.endDate);
            setBookingData(prevState => ({ ...prevState, price }));
        }
    }, [bookingData.startDate, bookingData.endDate]);

    // const handleBooking = async (e) => {
    //     e.preventDefault();
    //     // Validate start date and end date
    //     const now = new Date();
    //     const startDate = new Date(Date.parse(bookingData.startDate));
    //     const endDate = new Date(Date.parse(bookingData.endDate));

    //     // Check if startDate is after now
    //     if (startDate <= now) {
    //         setError('Start date should be after the current date and time.');
    //         return;
    //     }

    //     // Check if endDate is greater than or equal to startDate
    //     if (endDate <= startDate) {
    //         setError('End date should be greater than the start date.');
    //         return;
    //     }

    //     // Check if the dates are the same
    //     const sameDay = startDate.toDateString() === endDate.toDateString();

    //     // If the dates are the same, compare the times
    //     if (sameDay && endDate <= startDate) {
    //         setError('End time should be greater than the start time.');
    //         return;
    //     }
    //     // Continue with booking process
    //     try {
    //         setLoading(true);
    //         setError(null);
    //         // Calculate price based on start date and end date (already done in useEffect)
    //         const price = bookingData.price;
    //         price.toFixed(2);
    //         // Get JWT token from local storage or wherever you store it
    //         const token = localStorage.getItem('token'); // Replace with your token retrieval logic
    //         // Initialize Khalti checkout
    //         const config = {
    //             // Replace the publicKey with yours
    //             "publicKey": "test_public_key_77a3097db0b14141b4fded4e175211fb",
    //             "productIdentity": Venue._id,
    //             "productName": Venue.name,
    //             "productUrl": window.location.href,
    //             "paymentPreference": [
    //                 "KHALTI"
    //             ],
    //             "eventHandler": {
    //                 onSuccess: async (payload) => {
    //                     // Send booking data and Khalti data to backend
    //                     try {
    //                         const response = await axios.post(`${API}api/bookings`, {
    //                             bookingData: bookingData,
    //                             token: token,
    //                             khaltiData: payload
    //                         });
    //                         setLoading(false);
    //                         setSuccess(true);
    //                         console.log(response.data);
    //                         // Redirect to venue detail page after 2 seconds
    //                         setTimeout(() => {
    //                             history(`/venues/${id}`); // Replace with your venue detail route
    //                         }, 2000);
    //                     } catch (error) {
    //                         setError(error.message || 'An error occurred during payment processing.');
    //                         setLoading(false);
    //                         console.error('Error processing payment:', error);
    //                         // Handle error, e.g., display an error message to the user
    //                     }
    //                 },
    //                 onError: (error) => {
    //                     setLoading(false)
    //                     setError("Payment Handeler Error")
    //                     console.log(error);
    //                 },
    //                 onClose: () => {
    //                     setLoading(false)
    //                     console.log('widget is closing');
    //                 }
    //             }
    //         };
    //         const checkout = new KhaltiCheckout(config);
    //         // Show Khalti checkout modal
    //         checkout.show({ amount: price }); // Pass calculated price to Khalti
    //     } catch (error) {
    //         setError(error.message || 'An error occurred during payment processing.');
    //         setLoading(false);
    //         console.error('Error processing payment:', error);
    //         // Handle error, e.g., display an error message to the user
    //     }
    // };

    const calculatePrice = (startDateStr, endDateStr) => {
        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);
        const durationInHours = (endDate - startDate) / (1000 * 60 * 60);
        const pricePerHour = Venue.pricePerHour;
        return durationInHours * pricePerHour<=0 ? 0 :durationInHours * pricePerHour;
    };

    return (
        <><div className="flex flex-col lg:flex-row min-h-screen justify-center align-middle items-center p-2"
            style={{
                backgroundImage: 'url("https://source.unsplash.com/random/1600x900")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
            <div className="flex flex-col bg-white items-center lg:w-1/3 md:2/3 w-1/1 shadow-xl justify-center mx-auto  p-5 my-10 rounded-xl">
                <div>
                    <h1 className="text-xl mt-2 font-bold leading-tight tracking-tight text-orange-600 md:text-2xl dark:text-orange-600 text-center">
                        Booking
                    </h1>
                    <div className="mx-auto w-full max-w-[550px] ">
                        <form >
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
                                    onChange={handleInputChange}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
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
                            <div className="-mx-3 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label htmlFor="startDate" className="mb-3 block text-base font-medium text-[#07074D]">
                                            Start Date<br/>
                                            <small>Start date should be greater than today 's date and current time.</small><br/>
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
                                </div>
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label htmlFor="endDate" className="mb-3 block text-base font-medium text-[#07074D]">
                                            End Date<br/>
                                            <small>End date should be greater than today 's date and current time and startDate.</small><br/>
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
                            </div>

                            <div className="mb-5 ">
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
                            <div className="mb-5">
                                <label htmlFor="price" className="mb-3 block text-base font-medium text-[#07074D]">
                                    Total Price(Rs.)
                                </label>
                                <input
                                    type="text"
                                    id="price"
                                    value={bookingData.price/100}
                                    readOnly
                                    className="w-full rounded-md border text-red-500 border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium outline-none"
                                />
                            </div>

                            {error && <p className="text-red-500 mt-2">{error}</p>}
                            {success && <p className="text-green-500 mt-2">Payment successful!</p>}
                            <div>
                                <button type="submit" className="hover:bg-orange-700 w-full rounded-md bg-orange-600 py-3 px-8 text-center text-base font-semibold text-white outline-none" disabled={loading}>
                                    {loading ? 'Processing...' : 'Book Now!!!'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Booking;
