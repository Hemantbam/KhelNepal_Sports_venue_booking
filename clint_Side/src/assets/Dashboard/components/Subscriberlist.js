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
              <th className="border py-2 px-4">Joined At</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((subscriber, index) => (
              <tr key={subscriber._id} className="bg-blue-100">
                <td className="border py-2 px-4">{index + 1}.</td>
                <td className="border py-2 px-4">{subscriber.email}</td>
                <td className="border py-2 px-4">{formatJoinedAt(subscriber.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// Function to format the joined at date
function formatJoinedAt(dateString) {
  const date = new Date(dateString);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short'
  };
  return date.toLocaleString(undefined, options);
}
