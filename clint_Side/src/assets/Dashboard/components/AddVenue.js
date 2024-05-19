import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../../Data/baseIndex';
import { jwtDecode } from 'jwt-decode';
import ClipLoader from 'react-spinners/ClipLoader';

export default function AddVenue() {
  const [UserId, setUserId] = useState(jwtDecode(localStorage.getItem('token')).id);
  const [usernames, setUsernames] = useState([]);
  const [basic, setBasic] = useState(false);
  const [Admin, setAdmin] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    pricePerHour: '',
    description: '',
    capacity: '',
    facilities: [],
    image: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    if (decodedToken.role === 'basic') {
      setBasic(true);
    }
    if (decodedToken.role === 'admin') {
      setAdmin(true);
    }
    fetchUsernames(); // Fetch usernames when the component mounts
  }, []);

  const fetchUsernames = async () => {
    try {
      const response = await axios.get(`${API}api/allusers`);
      setUsernames(response.data.users.filter(res=>res.role!='basic'));
    } catch (error) {
      console.error('Error fetching usernames:', error);
    }
  };
  const handleCapacity = (e) => {
    const value = parseInt(e.target.value);
    if (value < 1 || value > 1000) {
      setError('Capacity must be a positive number between 0 and 1000.');
    } else {
      setFormData({ ...formData, capacity: value });
      setError(null);
    }
  };

  const handlePrice = (e) => {
    const value = parseInt(e.target.value);
    if (value < 1 || value > 1000) {
      setError('Price must be a positive number between 0 and 1000.');
    } else {
      setFormData({ ...formData, pricePerHour: value });
      setError(null);
    }
  };
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

    const { name, location } = formData;

    // Check if name or location is empty
    if (!name.trim() || !location.trim()) {
      setError("Please enter valid Name and Location.");
      setTimeout(() => {
        setError("");
      }, 1000);
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }
      const decodedToken = jwtDecode(token);
      const formDataWithImage = new FormData();
      // Append form data
      for (const key in formData) {
        formDataWithImage.append(key, formData[key]);
      }
      // Append userid to form data
      formDataWithImage.append('userid', decodedToken.role === 'admin' ? UserId : decodedToken.id);
  
      const response = await axios.post(`${API}api/venues`, formDataWithImage, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess(response.data.message);
      setError(null);
      // Reset form data except userid
      setFormData({
        name: '',
        location: '',
        pricePerHour: '',
        description: '',
        capacity: '',
        facilities: [],
        image: null,
      });
      setTimeout(() => {
        setSuccess(null);
        setLoading(false);
        setError(null);
        window.location.pathname = '/dashboard';
      }, 2000);
    } catch (error) {
      console.error('Error adding venue:', error);
      setError(error.response?.data?.message || 'An error occurred while adding the venue.');
      setSuccess(null);
      setTimeout(() => {
        setSuccess(null);
        setLoading(false);
        setError(null);
      }, 2000);
    }
  };

  if (basic) {
    return (
      <>
        <div className='p-5'>
          First join, then you can use this function.
        </div>
      </>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
        <h1 className="text-2xl font-bold mb-4 text-orange-600 text-center">Add Venue</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Admin && (
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="usernames">Select User</label>
              <select
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="usernames"
                name="usernames"
                onChange={(e) => {
                  setUserId(e.target.value);
                }}
                value={UserId}
              >
                <option value="">Select a user</option>
                {usernames.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Name</label>
            <input
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Venue Name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="location">Location</label>
            <input
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Venue Location"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="pricePerHour">Price Per Hour</label>
            <input
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              placeholder="Price Per Hour"
              name="pricePerHour"
              required
              value={formData.pricePerHour}
              onChange={handlePrice}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="description">Description</label>
            <textarea
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Venue Description"
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="capacity">Capacity</label>
            <input
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              placeholder="Venue Capacity"
              name="capacity"
              required
              value={formData.capacity}
              onChange={handleCapacity}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="facilities">Facilities (comma-separated)</label>
            <input
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Facilities"
              name="facilities"
              required
              value={formData.facilities.join(',')}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="image">Image</label>
            <input
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="file"
              accept="image/*"
              name="image"
              required
              value={FormData.image}
              onChange={handleChange}
            />
          </div>
          {error && <div className="text-red-600 text-sm mb-4">{error}</div>}
          {success && <div className="text-green-600 text-sm mb-4">{success}</div>}
          <div className="flex items-center justify-center md:justify-end">
            <button
              type="submit"
              className="w-full relative flex justify-center items-center text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
              disabled={loading}
            >
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <ClipLoader color="#fff" loading={loading} size={20} />
                </div>
              )}
              <span style={{ visibility: loading ? 'hidden' : 'visible' }}>Add Venue</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
