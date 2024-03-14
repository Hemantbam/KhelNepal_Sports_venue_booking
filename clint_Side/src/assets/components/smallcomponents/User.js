import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../../Data/baseIndex';

const User = ({ userid }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API}api/allusers?id=${userid}`);
        setUser(response.data.users); // Assuming the response contains the user object
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userid]);

  return (
    <div className="flex items-center">
      {user && (
        <>
          <img src={`${API}${user.profilePicture}`} alt="Profile" className="w-8 h-8 rounded-full mr-4" />
          <div>
            <h2 className="text-lg font-semibold">{user.firstName}</h2>
            <p className="text-gray-500">{user.username}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default User;
