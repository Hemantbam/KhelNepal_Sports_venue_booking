import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../../Data/baseIndex';

export default function SubscriberList() {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await axios.get(`${API}api/subscribe`);
        setSubscribers(response.data);
      } catch (error) {
        console.error('Error fetching subscribers:', error);
      }
    };

    fetchSubscribers();
  }, []);

  const handleEditSubscriber = (id) => {
    // Handle edit action
    console.log('Edit subscriber:', id);
  };

  const handleDeleteSubscriber = (id) => {
    // Handle delete action
    console.log('Delete subscriber:', id);
  };

  return (
    <div className="container mx-auto py-8 px-4 text-center">
      <h1 className="text-3xl font-semibold mb-4 text-orange-600 mx-auto">Subscribers</h1>
      {subscribers.length === 0 ? (
        <p>No subscribers yet</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border py-2 px-4">S.N</th>
              <th className="border py-2 px-4">Email</th>
              <th className="border py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((subscriber, index) => (
              <tr key={subscriber._id} className="bg-blue-100">
                <td className="border py-2 px-4">{index + 1}.</td>
                <td className="border py-2 px-4">{subscriber.email}</td>
                <td className="border py-2 px-4">
                  <div className="flex flex-col sm:flex-row justify-center">
                    <button
                      className="bg-orange-600 text-white px-3 py-1 rounded mb-2 sm:mr-2 sm:mb-0 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-600"
                      onClick={() => handleEditSubscriber(subscriber._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                      onClick={() => handleDeleteSubscriber(subscriber._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
