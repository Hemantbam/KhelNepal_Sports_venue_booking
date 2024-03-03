import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { API } from '../../Data/baseIndex';

// Define the function to build FormData recursively for nested objects
function buildFormData(formData, data, parentKey) {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File) && !(data instanceof Blob)) {
    Object.keys(data).forEach(key => {
      buildFormData(formData, data[key], parentKey ? `${parentKey}.${key}` : key);
    });
  } else {
    const value = data == null ? '' : data;
    formData.append(parentKey, value);
  }
}

// Define the function to convert JSON data to FormData
function jsonToFormData(data) {
  const formData = new FormData();
  buildFormData(formData, data);
  return formData;
}

export default function EditProfile() {

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isBasicUser, setIsBasicUser] = useState(false);
  const [IsVenue, setIsVenue] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({
    id:'',
    username: '',
    fullName: '',
    email: '',
    PAN: '',
    phoneNumber: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
    businessDetails: {
      businessName: '',
      registrationNumber: '',
      taxIdentificationNumber: '',
    },
    profilePicture: '',
    role: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Token not found. Please log in again.');
          setSuccess(null);
          return;
        }
  
        const decodedToken = jwtDecode(token);
  
        switch (decodedToken.role) {
          case 'basic':
            const basicResponse = await axios.get(`${API}basicauth`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setUser(basicResponse.data.user);
            setIsBasicUser(true);
            break;
          case 'venue':
            const venueResponse = await axios.get(`${API}venueauth`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setUser(venueResponse.data.user);
            setIsVenue(true);
            break;
          case 'admin':
            const adminResponse = await axios.get(`${API}adminauth`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setUser(adminResponse.data.user);
            setIsAdmin(true);
            break;
          default:
            break;
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error.message || 'An error occurred while fetching user data.');
      }
    };
  
    fetchData();
  }, []);
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser((prevUser) => ({
        ...prevUser,
        profilePicture: file,
      }));
    } else {
      // If the file is null (user cleared the file input), reset the profilePicture to an empty string
      setUser((prevUser) => ({
        ...prevUser,
        profilePicture: '',
      }));
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the field name contains a dot (indicating a nested field),
    // split the field name and update the state accordingly
    if (name.includes('.')) {
      const [parentField, childField] = name.split('.');
      setUser((prevUser) => ({
        ...prevUser,
        [parentField]: {
          ...prevUser[parentField],
          [childField]: value !== 'null' ? value : null,
        },
      }));
    } else {
      // If the field name doesn't contain a dot, update the state normally
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value !== 'null' ? value : null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token not found. Please log in again.');
        setSuccess(null);
        return;
      }

      // Ensure that user is not null or undefined before processing
      if (!user) {
        setError('User data is missing.');
        setSuccess(null);
        return;
      }

      const formData = jsonToFormData(user); // Convert user object to FormData

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      const updateResponse = await axios.put(`${API}api/auth/update`, formData, config);
      setSuccess(updateResponse.data.message);
      setError(null);
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred while updating the profile.');
      }
      setSuccess(null);
    }
  };

  const handleButtonClick = () => {
    setError(null);
    setSuccess(null);
  };
  return (
    <section className="min-h-screen py-10 bg-gray-50 dark:bg-gray-200 flex justify-center bg-cover items-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl dark:border dark:border-gray-300 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-orange-600 dark:text-orange-600 text-center mb-6">
          Edit Profile
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
                 {/* Profile Picture */}

                 <div>
            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Profile Picture<br/>
              <small>Click on image to select New Profile</small>

            </label>
            <input
              type="file"
              id="image"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />

            <label htmlFor="image" className="w-60 mx-auto flex items-center justify-center h-60  cursor-pointer border bottom-2 border-gray-400 rounded-full p-2 text-center">
              { user.profile||user.profilePicture ? (
                <img
                  src={user.profilePicture instanceof File ? URL.createObjectURL(user.profilePicture) : `${API}${isBasicUser?user.profile:user.profilePicture}`}
                  alt="Selected Image"
                  className="max-h-60 min-h-60 min-w-60  object-cover rounded-full max-w-60 bg-cover mx-auto "
                  
                />
              ) : (
                <span>Select Image</span>
              )}


            </label>
          </div>
          {/* Username */}
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={user.username}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-400 p-2 text-sm"
            />
          </div>
          {/* Full Name */}
          {!isBasicUser && (
            <div>
              <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={user.fullName}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-400 p-2 text-sm"
              />
            </div>
          )}
          {/* Email */}

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-400 p-2 text-sm"
            />
          </div>

          {/* PAN */}
          {!isBasicUser && (
            <div>
              <label htmlFor="PAN" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                PAN
              </label>
              <input
                type="text"
                name="PAN"
                id="PAN"
                value={user.PAN}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-400 p-2 text-sm"
              />
            </div>
          )}
          {/* Phone Number */}
          {!isBasicUser && (
            <div>
              <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                value={user.phoneNumber}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-400 p-2 text-sm"
              />
            </div>
          )}
          {/* Address */}
          {!isBasicUser && (
            <>
              <div>
                <label htmlFor="street" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                  Street Address
                </label>
                <input
                  type="text"
                  name="address.street"
                  id="street"
                  value={user?.address?.street || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-400 p-2 text-sm"
                />
              </div>
              <div>
                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                  City
                </label>
                <input
                  type="text"
                  name="address.city"
                  id="city"
                  value={user?.address?.city || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-400 p-2 text-sm"
                />
              </div>
              <div>
                <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                  State
                </label>
                <input
                  type="text"
                  name="address.state"
                  id="state"
                  value={user?.address?.state || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-400 p-2 text-sm"
                />
              </div>
              <div>
                <label htmlFor="postalCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="address.postalCode"
                  id="postalCode"
                  value={user?.address?.postalCode || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-400 p-2 text-sm"
                />
              </div>
              <div>
                <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                  Country
                </label>
                <input
                  type="text"
                  name="address.country"
                  id="country"
                  value={user?.address?.country || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-400 p-2 text-sm"
                />
              </div>
            </>
          )}
          {/* Business Details */}
          {!isBasicUser && (
            <div>
              <label htmlFor="businessName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                Business Name
              </label>
              <input
                type="text"
                name="businessDetails.businessName"
                id="businessName"
                value={user?.businessDetails?.businessName || ''}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-400 p-2 text-sm"
              />
            </div>
          )}
          {!isBasicUser && (
            <div>
              <label htmlFor="registrationNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                Registration Number
              </label>
              <input
                type="text"
                name="businessDetails.registrationNumber"
                id="registrationNumber"
                value={user?.businessDetails?.registrationNumber || ''}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-400 p-2 text-sm"
              />
            </div>
          )}
          {!isBasicUser && (
            <div>
              <label htmlFor="taxIdentificationNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                Tax Identification Number
              </label>
              <input
                type="text"
                name="businessDetails.taxIdentificationNumber"
                id="taxIdentificationNumber"
                value={user?.businessDetails?.taxIdentificationNumber || ''}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-400 p-2 text-sm"
              />
            </div>
          )}
   

          {/* Role - Only visible for admins */}
          {isAdmin && (
            <div>
              <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={user.role}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-400 p-2 text-sm"
              >
                <option value="basic">Basic</option>
                <option value="venue">Venue</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          )}
          {/* Error message */}
          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}
          {/* Success message */}
          {success && (
            <div className="text-green-600 text-sm">{success}</div>
          )}
          {/* Button */}
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={handleButtonClick}
          >
            Update Profile
          </button>
        </form>
      </div>
    </section>
  );
}
