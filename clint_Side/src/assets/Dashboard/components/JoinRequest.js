import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../../Data/baseIndex';
import Cookies from 'js-cookie'; // Import the Cookies library
import { useNavigate } from 'react-router-dom';

const JoinRequest = ({ onMenuClick }) => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${API}api/allusers?venuereq=wanted`);
             
                if (Array.isArray(response.data.users)) {
                    setUsers(response.data.users);
                } else {
                    throw new Error('Invalid response data');
                }
            } catch (error) {
                console.error('Error fetching join requests:', error);
                // Handle error state or display an error message
            }
        };
    
        fetchUsers();
    }, []);

    const handleViewProfile = (userId) => {
        // Set the user ID in a cookie
        Cookies.set('selectedUserId', userId);
        // Trigger the menu click to switch to the edit profile page
        onMenuClick('editProfile');
    };

    return (
        <div className='text-center pt-5'>
            <h1 className="text-3xl font-semibold mb-4 text-orange-600 mx-auto w-full">Join Requests</h1>
            <div className="container mx-auto py-8 px-4 text-center">
                {users.length === 0 ? (
                    <p>No join requests found</p>
                ) : (
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="border py-2 px-4">S.N</th>
                                <th className="border py-2 px-4">Name</th>
                                <th className="border py-2 px-4">Email</th>
                                <th className="border py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id}>
                                    <td className="border py-2 px-4">{index + 1}.</td>
                                    <td className="border py-2 px-4">{user.fullName}</td>
                                    <td className="border py-2 px-4">{user.email}</td>
                                    <td className="border py-2 px-4">
                                        <button
                                            className="bg-orange-600 text-white px-3 py-1 rounded mr-2 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-600"
                                            onClick={() => handleViewProfile(user._id)}
                                        >
                                            View Profile
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default JoinRequest;
