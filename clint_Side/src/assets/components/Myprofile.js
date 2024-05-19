import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { API } from "../Data/baseIndex";
import { ClipLoader } from "react-spinners";

export default function MyProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [bookingCount, setBookingCount] = useState(0);
  const [venueCount, setVenueCount] = useState(0);
  const [favoriteVenue, setFavoriteVenue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [AlreadyFriend, setAlreadyFriend] = useState(false);
  const [AlreadySent, setAlreadySent] = useState(false);
  const [friendList, setfriendList] = useState(null);
  const [AlreadyReceive, setAlreadyReceive] = useState(false);
  const [UserData, setUserData] = useState({
    email: "", phoneNumber: "", address: {
      city
        :
        null,
      country
        :
        null,
      postalCode
        :
        null,
      state
        :
        null,
      street
        :
        null
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        const userResponse = await axios.get(`${API}api/allusers?id=${id}`);
        const userData = userResponse.data.users;
        setUser(userData);

        const bookingResponse = await axios.get(`${API}api/bookings?user=${id}`);
        const bookings = bookingResponse.data;
        setBookingCount(bookings.length);

        const venueCounts = {};
        let mostOccurringVenueId = null;
        let maxCount = 0;

        bookings.forEach((booking) => {
          const { venue } = booking;
          venueCounts[venue] = (venueCounts[venue] || 0) + 1;

          if (venueCounts[venue] > maxCount) {
            maxCount = venueCounts[venue];
            mostOccurringVenueId = venue;
          }
        });

        if (mostOccurringVenueId) {
          const venueResponse = await axios.get(`${API}api/venues?id=${mostOccurringVenueId}`);
          const mostOccurringVenue = venueResponse.data.venues[0];
          setFavoriteVenue(mostOccurringVenue);
        }

        // Check if token exists before fetching friend data
        const token = localStorage.getItem("token");
        if (token) {
          const friendResponse = await axios.get(`${API}api/friends-list/${id}`);
          const friendData = friendResponse.data.friendData;

          // Check if there are any friend requests for the user corresponding to `id`
          const hasSentRequest = Array.isArray(friendData.requests) && friendData.requests.some(req => req.receiver === id);
          setAlreadySent(hasSentRequest);

          const hasReceiveReqest=Array.isArray(friendData.requests) && friendData.requests.some(req => req.sender === id);
          setAlreadyReceive(hasReceiveReqest);
          // Determine if the user corresponding to `id` is already a friend
          const decodedToken = jwtDecode(token);
          const isAlreadyFriend = Array.isArray(friendData.friendsList) && friendData.friendsList.some(friend => friend.friend === decodedToken.id);
          setAlreadyFriend(isAlreadyFriend);

          const response = await axios.get(`${API}api/getfrienddata/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Use `Bearer ${token}` for Authorization header
            },
          });

          console.log(response.data);
          setUserData(response.data.userData);

        }




        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const handleFriendRequest = async () => {
    try {
      if (!localStorage.getItem("token")) {
        alert("Please log in to send a friend request.");
        navigate("/login");
        return;
      }

      setLoading(true);

      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);

      const response = await axios.post(`${API}api/send-request`, {
        senderId: decodedToken.id,
        receiverId: id,
      });

      console.log("Friend request sent:", response.data);
      setRequestSent(true);
    } catch (error) {
      alert(error.response.data.message);
      console.error("Error sending friend request:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-4">
        <ClipLoader color="#ea580c" size={50} />
        <p className="mt-4">(If it is loading forever, this ID may be deleted or not registered yet.)</p>
      </div>
    );
  }

  const { fullName, profilePicture, _id: userId, username, role } = user;
  const decodedToken = localStorage.getItem('token') ? jwtDecode(localStorage.getItem("token")) : null;
  const isFriend = Array.isArray(friendList) && friendList.some((friend) => friend._id === decodedToken?.id);

  return (
    <div className="font-sans antialiased">
      <main className="bg-gray-100 pt-10">
        <section className="relative  block h-64 sm:h-80 md:h-96">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${API}${profilePicture.replace(/\\/g, "/")})`,
            }}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold">
              {fullName || "Anonymous User"}
            </h1>
          </div>
        </section>

        <section className="py-0 px-4 sm:px-6 lg:px-8">
          <div className={`max-w-4xl mx-auto bg-gray-300 hover:bg-gray-400 rounded-lg shadow-lg relative -top-20 p-8 md:flex md:items-center hover:scale-110 duration-100 transition-all`}>
            <div className="md:flex-shrink-0">
              {profilePicture && (
                <img
                  className="h-48 w-48 object-cover rounded-full mx-auto md:mx-0 md:mr-6"
                  src={`${API}${profilePicture}`}
                  alt="Profile"
                />
              )}
            </div>
            <div className="md:flex-1 mt-4 md:mt-0">
              <div className="text-center md:text-left">
                <div className="flex md:justify-between flex-wrap items-start mt-2 justify-center">
                  <p className="text-lg font-semibold">{fullName || "Anonymous User"}</p>
                  {!isFriend && decodedToken?.id !== id && (
                    <button
                      className={` text-white font-bold py-2 m-2 px-4 rounded ${requestSent || AlreadySent || AlreadyFriend||AlreadyReceive ? "bg-green-500" : "bg-orange-600 hover:bg-orange-700"} ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                      onClick={handleFriendRequest}
                      disabled={loading || requestSent || AlreadyFriend||AlreadyReceive}
                    >
                      {loading ? (
                        <ClipLoader color="#fff" size={20} />
                      ) : requestSent || AlreadySent ? (<>
                        <i className="fas fa-user-check" aria-hidden="true"></i> Request Sent</>
                      ) : AlreadyFriend ? (<>
                        <i className="fa fa-user-friend" aria-hidden="true"></i> Friend</>
                      ) : AlreadyReceive?(<>
                        <i className="fa fa-user-checks" aria-hidden="true"></i>  Review Request</>
                      ):(<>
                        <i className="fa fa-user-plus" aria-hidden="true"></i> Add Friend</>
                      )}
                    </button>
                  )}
                </div>
                <div className="flex md:justify-start justify-center items-start mt-2">
                  <div>
                    <p className="text-sm">Role: <span className="font-bold text-orange-600">{role}</span></p>
                    <p className="text-sm">Username: <span className="font-bold">{username}</span></p>
                    <p className="text-sm">User ID: <span className="font-bold">{userId}</span></p>
                  </div>
                </div>
                <div className="mt-4 text-sm">
                  <p>Total Bookings: <span className="font-bold">{bookingCount}</span></p>
                  <p>Total Venues Added: <span className="font-bold">{venueCount}</span></p>
                  {favoriteVenue && (
                    <p>
                      Most Booked Venue:{" "}
                      <Link to={`/venues/${favoriteVenue._id}`} className="text-orange-600 font-bold">
                        {favoriteVenue.name}
                      </Link>
                    </p>
                  )}
                  {AlreadyFriend?
                  <>
                   <p>Email: <span className="font-bold ">{UserData.email}</span></p>
                   <p>Phone No: <span className="font-bold">{UserData.phoneNumber}</span></p>
                   <p>Address: <span className="font-bold">{UserData.address.street+","}{UserData.address.city+","}{UserData.address.state+","}{UserData.address.country+"("}{UserData.address.postalCode+")"}</span></p>
               </> 
                  :""}
                  </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
