import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../../Data/baseIndex';
import { jwtDecode } from 'jwt-decode';
import User from '../../components/smallcomponents/User';
import { Link } from 'react-router-dom';

export default function FriendList() {
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [allFriends, setAllFriends] = useState([]);
  const [loading, setLoading] = useState(false);

  // Define fetchFriendsList function to retrieve updated friends list
  const fetchFriendsList = async () => {
    try {
      const userId = jwtDecode(localStorage.getItem('token')).id;
      const response = await axios.get(`${API}api/friends-list/${userId}`);
      const { friendData } = response.data;
      return friendData.friendsList;
    } catch (error) {
      console.error('Error fetching friends list:', error);
      return []; // Return empty array or handle error appropriately
    }
  };

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        setLoading(true);
        const userId = jwtDecode(localStorage.getItem('token')).id;
        const response = await axios.get(`${API}api/friends-list/${userId}`);
        const { friendData } = response.data;
        const { requests, friendsList } = friendData;

        const incoming = [];
        const outgoing = [];

        requests.forEach((request) => {
          if (request.sender === userId) {
            outgoing.push(request);
          } else if (request.receiver === userId) {
            incoming.push(request);
          }
        });

        setIncomingRequests(incoming);
        setOutgoingRequests(outgoing);
        setAllFriends(friendsList);
      } catch (error) {
        console.error('Error fetching friend requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriendRequests();
  }, []);

  const handleAcceptRequest = async (sender, receiver, requestId) => {
    const token = localStorage.getItem('token') || '';


    try {
      setLoading(true);


      const response = await axios.post(
        `${API}api/respond-request`,
        {
          senderId: sender,
          receiverId: receiver,
          action: 'accept',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedIncomingRequests = incomingRequests.filter((request) => request._id !== requestId);
        setIncomingRequests(updatedIncomingRequests);

        const updatedFriendsList = await fetchFriendsList(); // Call fetchFriendsList to update friends list
        setAllFriends(updatedFriendsList);
      } else {
        console.error('Failed to accept friend request');
      }
    } catch (error) {
      console.error('Error accepting friend request:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleRejectRequest = async (sender, receiver, requestId) => {
    const token = localStorage.getItem('token') || '';
    try {
      setLoading(true);

      const response = await axios.post(
        `${API}api/respond-request`,
        {
          senderId: sender,
          receiverId: receiver,
          action: 'reject',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setIncomingRequests(incomingRequests.filter((request) => request._id !== requestId));
        // Perform additional actions if needed
        const updatedFriendsList = await fetchFriendsList(); // Call fetchFriendsList to update friends list
        setAllFriends(updatedFriendsList);
      } else {
        console.error('Failed to reject friend request');
      }
    } catch (error) {
      console.error('Error rejecting friend request:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelRequest = async (sender, receiver, requestId) => {
    const token = localStorage.getItem('token') || '';
    try {
      setLoading(true);

      const response = await axios.post(
        `${API}api/respond-request`,
        {
          senderId: sender,
          receiverId: receiver,
          action: 'cancel',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setOutgoingRequests(outgoingRequests.filter((request) => request._id !== requestId));
        const updatedFriendsList = await fetchFriendsList(); // Call fetchFriendsList to update friends list
        setAllFriends(updatedFriendsList);
        // Perform additional actions if needed
      } else {
        console.error('Failed to cancel friend request');
      }
    } catch (error) {
      console.error('Error canceling friend request:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnfriend = async (friendId) => {
    const token = localStorage.getItem('token') || '';
    const confirmUnfriend = window.confirm('Are you sure you want to unfriend this user?');
  
    if (confirmUnfriend) {
      try {
        setLoading(true);
  
        const response = await axios.post(
          `${API}api/respond-request`,
          {
            senderId: jwtDecode(token).id,
            receiverId: friendId,
            action: 'remove',
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.status === 200) {
          setAllFriends(allFriends.filter((friend) => friend._id !== friendId));
          const updatedFriendsList = await fetchFriendsList(); // Call fetchFriendsList to update friends list
          setAllFriends(updatedFriendsList);
          // Perform additional actions if needed
        } else {
          console.error('Failed to unfriend user');
        }
      } catch (error) {
        console.error('Error unfriending user:', error);
      } finally {
        setLoading(false);
      }
    } else {
      console.log('Unfriend operation canceled');
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 text-center">
      {/* Display incoming friend requests */}
      <h2 className="text-xl font-semibold mb-2">Incoming Requests</h2>
     
      {incomingRequests.length === 0 ? (
        <p>No incoming friend requests</p>
      ) : (<>
        <small className='text-red-600'>After Accepting Request your friend can see your email  and phone number.</small>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border py-2 px-4">S.N</th>
              <th className="border py-2 px-4">Sender</th>
              <th className="border py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {incomingRequests.map((request, index) => (
              <tr key={request._id} className="bg-green-100">
                <td className="border py-2 px-4">{index + 1}.</td>
                <td className="border py-2 px-4">
                  <Link to={`/profile/${request.sender}`}>
                    <User userid={request.sender} />
                  </Link>
                </td>
                <td className="border py-2 px-4">
                  <button
                    onClick={() => handleAcceptRequest(request.sender, request.receiver, request._id)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded mr-2"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRejectRequest(request.sender, request.receiver, request._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
     </> )}

      {/* Display outgoing friend requests */}
      <h2 className="text-xl font-semibold mb-2 mt-4">Outgoing Requests</h2>
      {outgoingRequests.length === 0 ? (
        <p>No outgoing friend requests</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border py-2 px-4">S.N</th>
              <th className="border py-2 px-4">Receiver</th>
              <th className="border py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {outgoingRequests.map((request, index) => (
              <tr key={request._id} className="bg-red-100">
                <td className="border py-2 px-4">{index + 1}.</td>
                <td className="border py-2 px-4">
                  <Link to={`/profile/${request.receiver}`}>
                    <User userid={request.receiver} />
                  </Link>
                </td>
                <td className="border py-2 px-4">
                  <button
                    onClick={() => handleCancelRequest(request.sender, request.receiver, request._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Display all friends */}
      <h2 className="text-xl font-semibold mb-2 mt-4">All Friends</h2>
      {allFriends.length === 0 ? (
        <p>No friends added yet</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border py-2 px-4">S.N</th>
              <th className="border px-4 py-2">Friend</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {allFriends.map((friend, index) => (
              <tr key={friend._id} className="bg-blue-100">
                <td className="border px-4 py-2">{index + 1}.</td>
                <td className="border px-4 py-2">
                  <Link to={`/profile/${friend.friend}`}>
                    <User userid={friend.friend} />
                  </Link>
                </td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleUnfriend(friend.friend)}
                  >
                    Unfriend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
