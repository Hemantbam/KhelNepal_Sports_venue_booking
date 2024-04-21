import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../../Data/baseIndex';
import ClipLoader from 'react-spinners/ClipLoader';
import Cookies from 'js-cookie';

export default function EditVenue() {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        pricePerHour: '',
        description: '',
        capacity: '',
        facilities: [], // Make sure it's initialized as an array
        image: null,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [venueId] = useState(Cookies.get("selectedVenueId"));
    useEffect(() => {
        const fetchVenue = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API}api/venues?id=${venueId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const { name, location, pricePerHour, description, capacity, facilities } = response.data.venues[0];
                // Convert facilities string to an array
                const facilitiesArray = facilities.split(',').map(item => item.trim());
                setFormData(prevFormData => ({
                    ...prevFormData,
                    name,
                    location,
                    pricePerHour,
                    description,
                    capacity,
                    facilities: facilitiesArray, // Ensure facilities is an array
                    image: null,
                }));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching venue:', error);
                setLoading(false);
                setError('Error fetching venue. Please try again later.');
            }
        };
    
        fetchVenue();
    }, [venueId]);
    

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (name === 'facilities') {
            const newValue = value.split(',').map(item => item.trim());
            setFormData({ ...formData, [name]: newValue });
        } else if (type === 'file') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const formDataWithImage = new FormData();
            // Append form data
            for (const key in formData) {
                formDataWithImage.append(key, formData[key]);
            }
    
            const response = await axios.put(`${API}api/venues?id=${venueId}`, formDataWithImage, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            setSuccess(response.data.message);
            setError(null);
            setLoading(false);
            // Redirect to dashboard
            window.location.href = '/dashboard';
        } catch (error) {
            console.error('Error updating venue:', error);
            setError(error.response?.data?.message || 'An error occurred while updating the venue.');
            setSuccess(null);
            setLoading(false);
        }
    };
    if (loading && venueId) {
        return <ClipLoader color="#FFA500" loading={loading} size={50} />;
    }

    return (
        <div className="bg-gray-50 min-h-screen flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
                <h1 className="text-2xl font-bold mb-4 text-orange-600">Edit Venue</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Name</label>
                        <input
                            className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-orange-500"
                            type="text" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="location">Location</label>
                        <input
                            className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-orange-500"
                            type="text" name="location" value={formData.location} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="pricePerHour">Price Per Hour</label>
                        <input
                            className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-orange-500"
                            type="number" name="pricePerHour" value={formData.pricePerHour} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="description">Description</label>
                        <textarea
                            className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-orange-500"
                            name="description" value={formData.description} onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="capacity">Capacity</label>
                        <input
                            className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-orange-500"
                            type="number" name="capacity" value={formData.capacity} onChange={handleChange} />
                    </div>
                    <div>
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="capacity">Facilities</label>

                        <input
                            className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-orange-500"
                            type="text"
                            name="facilities"
                            value={formData.facilities ? formData.facilities.join(',') : ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="image">Image</label>
                        <input
                            className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-orange-500"
                            type="file" name="image" accept="image/*" onChange={handleChange} />
                    </div>
                    {error && <div className="text-red-600">{error}</div>}
                    {success && <div className="text-green-600">{success}</div>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V2C5.373 2 2 5.373 2 10h2zm2 0a6 6 0 016-6V2C7.373 2 4 4.402 4 8h2zm6 6a6 6 0 01-6 6v-2a8 8 0 008-8h-2zm6-6a8 8 0 00-8 8h2c0-3.627 2.402-6 6-6v-2z"></path>
                                </svg>
                                <span>Submitting...</span>
                            </span>
                        ) : (
                            <span>Submit</span>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
