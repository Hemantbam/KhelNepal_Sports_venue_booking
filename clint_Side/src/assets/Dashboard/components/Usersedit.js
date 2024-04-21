// UsersEdit.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../../Data/baseIndex';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
export default function UsersEdit({ onMenuClick }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API}api/allusers`);
        setUsers(response.data.users);
        setLoading(false);
      } catch (error) {
        setError('Error fetching users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEditUser = (userId) => {
    console.log(`Editing user with ID: ${userId}`);
    // Set the user ID in a cookie
    Cookies.set('selectedUserId', userId);
    // Trigger the menu click to switch to the edit profile page
    onMenuClick('editProfile');
  };

  

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;
  
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${API}api/auth/deleteUser?id=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      alert('User deleted successfully! And Associated Venues too');
      // Refresh the user list after successful deletion
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.log('Error:', error.response);
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('An error occurred while deleting user.');
      }
      console.error('Error deleting user:', error);
    }
  };

  const loggedInUser = jwtDecode(localStorage.getItem('token'));

  return (
    <div className="container mx-auto py-8 px-4 text-center">
      <h1 className="text-3xl font-semibold mb-4 text-orange-600 mx-auto">Users</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border py-2 px-4">S.N</th>
                <th className="border py-2 px-4">Profile</th>
                <th className="border py-2 px-4">Name</th>
                <th className="border py-2 px-4">Username</th>
                <th className="border py-2 px-4">Email</th>
                <th className="border py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className={user.username === loggedInUser.username ? 'bg-blue-200' : user.role === 'admin' ? 'bg-red-200' : user.role === 'venue' ? 'bg-green-200' : 'bg-gray-200'}>
                  <td className="border py-2 px-4">{index + 1}</td>
                  <td className="border py-2 px-4">
                    <img src={`${API}${user.profilePicture}`} alt="Profile" className="h-10 w-10 rounded-full mx-auto sm:mx-0" />
                  </td>
                  <td className="border py-2 px-4">{user.fullName}</td>
                  <td className="border py-2 px-4">{user.username}</td>
                  <td className="border py-2 px-4">{user.email}</td>
                  <td className="border py-2 px-4">
                    <div className="flex flex-col sm:flex-row justify-center">
                      <button
                        className="bg-orange-600 text-white px-3 py-1 rounded mb-2 sm:mr-2 sm:mb-0 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-600"
                        onClick={() => handleEditUser(user._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            <div className="flex items-center mr-4">
              <div className="w-4 h-4 bg-blue-200 mr-2"></div>
              <span>Logged-in User</span>
            </div>
            <div className="flex items-center mr-4">
              <div className="w-4 h-4 bg-red-200 mr-2"></div>
              <span>Admin</span>
            </div>
            <div className="flex items-center mr-4">
              <div className="w-4 h-4 bg-green-200 mr-2"></div>
              <span>Venue</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-200 mr-2"></div>
              <span>Basic</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
