import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../../Data/baseIndex';

const JoinRequest = () => {
    const [users, setUsers] = useState([]);

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
    

    const handleAcceptRequest = (userId) => {
        // Implement functionality to accept the join request for the user with the specified userId
        console.log('Accepted join request for user:', userId);
    };

    const handleRejectRequest = (userId) => {
        // Implement functionality to reject the join request for the user with the specified userId
        console.log('Rejected join request for user:', userId);
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
                                    <td className="border py-2 px-4">{user.name}</td>
                                    <td className="border py-2 px-4">{user.email}</td>
                                    <td className="border py-2 px-4">
                                        <button
                                            className="bg-green-600 text-white px-3 py-1 rounded mr-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
                                            onClick={() => handleAcceptRequest(user._id)}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                                            onClick={() => handleRejectRequest(user._id)}
                                        >
                                            Reject
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
