import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { API } from '../../Data/baseIndex';
import Cookies from 'js-cookie';
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
  const [readonly, setReadonly] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isBasicUser, setIsBasicUser] = useState(jwtDecode(localStorage.getItem('token')).role == 'basic');
  const [IsVenue, setIsVenue] = useState(jwtDecode(localStorage.getItem('token')).role == 'venue');
  const [isAdmin, setIsAdmin] = useState(jwtDecode(localStorage.getItem('token')).role == 'admin');
  const [decoded] = useState(jwtDecode(localStorage.getItem('token')));
  const userId = Cookies.get('selectedUserId') || decoded.id;
  console.log(userId);
  const [user, setUser] = useState({
    username: '',
    fullName: '',
    email: '',
    PAN: '',
    phoneNumber: '',
    venuereq: false,
    isrejected: false,
    panimage: '',
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

console.log(userId==decodedToken.id);
        if (decodedToken.id === userId) {
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
        } else if(decodedToken.id!=userId&&!isBasicUser) {
          const response = await axios.get(`${API}api/auth/user?id=${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setIsAdmin(true)
          setUser(response.data.user);
        }

        setError(null);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error.message || 'An error occurred while fetching user data.');
      }
    };

    fetchData();
  }, [userId]);


  const handleChangereject=(e)=>{
    console.log(user.isrejected,";;",e.target.value);
    setUser((prevUser)=>({
      ...prevUser,
      isrejected:e.target.value,
    }))
  }
  const handlephoneno=(e)=>{
    const value=e.target.value;
    if (value.length!=10) {
     setError("Phone no. must have 10 Numbers...");
     return;
    }
    setUser((prevUser)=>({
     ...prevUser,
     phoneNumber:value
    }))
   }
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
  const handlePanImageChange = (e) => {
    const file = e.target.files[0];
    setUser({
      ...user,
      panimage: file, // Update panimage in state
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!isBasicUser){
      if (!user || !user.fullName || user.fullName.trim().length === 0) {
        setError("Full Name must be provided.");
        setTimeout(() => {
          setError("");
        }, 1000);
        return;
      }
    }
    setError(null);
    setSuccess(null);
    console.log("Submitted:");
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

      // Set venuereq to false
      user.venuereq = false;

      const formData = jsonToFormData(user); // Convert user object to FormData

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      const updateResponse = await axios.put(`${API}api/auth/update?id=${userId}`, formData, config);
      setSuccess(updateResponse.data.message);
    setTimeout(() => {
      Cookies.remove("selectedUserId")
      window.location.href = '/dashboard';
      setError(null);
    }, 500);
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


 
  const handleToggleReadonly = () => {
    setReadonly(!readonly); // Toggle read-only mode
  };
  return (
    <section className="min-h-screen py-10 bg-gray-50 dark:bg-gray-200 flex justify-center bg-cover items-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl dark:border dark:border-gray-300 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-orange-600 dark:text-orange-600 text-center mb-6">
          Edit Profile
        </h1>
    
        <form className="space-y-6" onSubmit={handleSubmit} >

        <div className="flex items-center justify-between mb-4">
            <label htmlFor="readonly" className="text-sm font-medium text-gray-900 dark:text-gray-300">
              Read Only Mode
            </label>
            <div className="relative">
              <input
                type="checkbox"
                id="readonly"
                checked={readonly}
                onChange={handleToggleReadonly}
                className="sr-only"
              />
              <div
                className={`${
                  !readonly ? 'bg-gray-400' : 'bg-green-500'
                } w-12 h-6 rounded-full cursor-pointer relative transition-colors duration-300`}
                onClick={handleToggleReadonly}
              >
                <div
                  className={`${
                    !readonly ? 'translate-x-0' : 'translate-x-6'
                  } w-6 h-6 rounded-full bg-white shadow-md absolute top-0 left-0 transition-transform duration-300 ease-in-out`}
                />
              </div>
            </div>
          </div>
          {/* Profile Picture */}

          <div>
            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Profile Picture<br />
              <small>Click on image to select New Profile</small>

            </label>
            <input
              type="file"
              id="image"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
              disabled={readonly}
            />

            <label htmlFor="image" className="w-60 mx-auto flex items-center justify-center h-60  cursor-pointer border bottom-2 border-gray-400 rounded-full p-2 text-center">
              {user.profile || user.profilePicture ? (
                <img
                  src={user.profilePicture instanceof File ? URL.createObjectURL(user.profilePicture) : `${API}${isBasicUser ? user.profile : user.profilePicture}`}
                  alt="Selected Image Not Loaded"
                  className="max-h-60 min-h-60 min-w-60 object-cover rounded-full max-w-60 bg-cover mx-auto leading-5 text-center "

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
              required
              value={user.username}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-400 p-2 text-sm"
              disabled={true}
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
                required
                value={user.fullName}
                onChange={handleChange}
                disabled={readonly}
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
              required
              disabled={true}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-400 p-2 text-sm"
            />
          </div>

          {/* PAN */}
          {!isBasicUser && (
            <>
            <div>
              <label htmlFor="PAN" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                PAN
              </label>
              <input
                type="text"
                name="PAN"
                id="PAN"
                value={user.PAN}
                required
                disabled={readonly}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-400 p-2 text-sm"
              />
            </div>
          

          <div>
            <label htmlFor="panimage" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Pan Image:
              <br />
              <small>Click on image to select Pan Image.
              {/* <span className='text-red-500'>You cannot change Afterward..</span> */}
              </small>
            </label>
            <input
              type="file"
              id="panimage"
              className="hidden"
              accept="image/*"
              disabled={readonly}
       
              onChange={handlePanImageChange}
            />
            <label htmlFor="panimage" className="w-56 h-32 mx-auto flex items-center justify-center cursor-pointer border bottom-2 border-gray-400 p-2 text-center">
              {user.panimage ? (
                <img
                  src={user.panimage instanceof File ? URL.createObjectURL(user.panimage) : `${API}${isBasicUser ? user.panimage : user.panimage}`}
                  alt="Selected Image"
                  className="w-56 h-32 object-cover bg-contain mx-auto"
                />
              ) : (
                <span>Select Image</span>
              )}
            </label>
          </div>
          </>
          )}
          {/* Phone Number */}
          {!isBasicUser && (
            <div>
              <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                Phone Number(Khalti)
              </label>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                required
                disabled={readonly}
                value={user.phoneNumber}
                onChange={handlephoneno}
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
                  required
                  disabled={readonly}
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
                  required
                  disabled={readonly}
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
                  required
                  disabled={readonly}
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
                  required
                  disabled={readonly}
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
                  required
                  disabled={readonly}
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
                disabled={readonly}
                required
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
                disabled={readonly}
                required
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
                disabled={readonly}
                required
                value={user?.businessDetails?.taxIdentificationNumber || ''}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-400 p-2 text-sm"
              />
            </div>
          )}



          {isAdmin && (
            /* Render fields editable by admin only */
            <>
              {/* Role - Only visible for admins */}
              <div>
                <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={user.role}
                  disabled={readonly}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-400 p-2 text-sm"
                >
                  <option value="basic">Basic</option>
                  <option value="venue">Venue</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              {/* isRejected - Only visible for admins */}
              <div>
                <label htmlFor="isRejected" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                  Rejected
                </label>
                <select
                  id="isRejected"
                  name="isRejected"
                  disabled={readonly}
                  value={user.isrejected}
                  onChange={handleChangereject}
                  className="w-full rounded-md border border-gray-400 p-2 text-sm"
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>

            </>
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
          >
            Update Profile
          </button>
        </form>
      </div>
    </section>
  );
}
