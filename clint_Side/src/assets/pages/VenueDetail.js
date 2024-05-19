import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { API } from '../Data/baseIndex';
import Review from '../components/smallcomponents/Review';
import Comment from '../components/smallcomponents/CommentAndReviw';
import Newsletter from '../components/Newesletter';
import BookBy from '../components/smallcomponents/Recent';
import Fromthis from '../components/smallcomponents/FromthisPerson';
import ReactStars from "react-rating-stars-component";
import User from '../components/smallcomponents/User';
import { jwtDecode } from 'jwt-decode';

export default function SingleVenue() {
  const { id } = useParams(); // Get the venue ID from the URL params
  const [venue, setVenue] = useState(null);
  const [facilities, setFacilities] = useState(null);
  const [averageRating, setAverageRating] = useState(0);


  useEffect(() => {
    const fetchVenueAndReviews = async () => {
      try {
        // Fetch venue data by ID
        const venueResponse = await axios.get(`${API}api/venues?id=${id}`);
        setVenue(venueResponse.data.venues[0]);
        setFacilities(venueResponse.data.venues[0].facilities.split(','));

        // Fetch reviews
        const reviewsResponse = await axios.get(`${API}api/reviews?venueid=${id}`);
        const fetchedReviews = reviewsResponse.data.reviews;

        
        // Calculate average rating
        if (fetchedReviews.length > 0) {
          const totalRating = fetchedReviews.reduce((sum, review) => sum + review.rating, 0);
          setAverageRating(totalRating / fetchedReviews.length);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchVenueAndReviews();
  }, [id]); // Trigger useEffect whenever the ID changes

  // If venue data is still loading, display a loading message
  if (!venue) {
    return <div>Loading...</div>;
  }


  // Once venue data is fetched, display the venue details
  return (
    <>
      <Navbar />
      <section className="text-gray-900 bg-gray-100 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap bg-white rounded-lg shadow-md overflow-hidden">
            <div className="lg:w-2/3 w-full relative">
              <img
                alt={venue.name}
                className={`w-full max-h-screen object-scale-down object-center rounded shadow-md cursor-pointer transition-transform duration-300 transform-gpu`}
                src={`${API}${venue.image}`}

              />
              
            </div>
            <div className="lg:w-1/3 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 text-2xl p-4">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                Venue
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {venue.name}
              </h1>
              <div className="mb-2">
                {averageRating ?
                  <div className="flex mb-4 items-center">
                    <ReactStars
                      count={5}
                      size={24}
                      isHalf={true}
                      edit={false}
                      value={averageRating}
                      emptyIcon={<i className="far fa-star"></i>}
                      halfIcon={<i className="fa fa-star-half-alt"></i>}
                      fullIcon={<i className="fa fa-star"></i>}
                      activeColor="#ea580c"
                    />
                    <span className="text-orange-600 font-bold ml-3 text-sm">
                      {averageRating.toFixed(1)}
                    </span>
                  </div>
                  : <></>}
                <Link to={`/profile/${venue.managedBy}`}>
                  <User userid={venue.managedBy}/>
                </Link>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-800">
                    Price Per Hour<br />
                    <span className='text-orange-600'>Rs. {venue.pricePerHour}/hr</span>
                  </span>
                </div>
                <div className="py-2 mb-2 mt-2">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Facilities:</h2>
                  <ul className="list-disc list-inside">
                    {facilities.map((facility, index) => (
                      <li key={index} className="text-gray-800 text-sm">{facility}</li>
                    ))}
                  </ul>
                </div>
                <Link
                  key={venue._id}
                  to={`/venues/booking/${venue._id}/${venue.managedBy}`}
                  className="ml-auto mt-4 rounded-md bg-orange-600 px-3.5 py-2 text-base font-semibold leading-7 text-white hover:bg-red-500"
                >
                  Book Now
                </Link>
              </div>
            </div>
            <div className='container mt-5 m-auto text-justify p-4'>
                <h2 className='text-xl font bold'>Description:</h2>
              <p>{venue.description}</p>
              </div>
          </div>
          <div className="flex text-gray-800 mx-auto container md:px-5 px-1 lg:px-10 md:px-4 sm:px-2 py-5">
            <div className="flex flex-wrap w-full lg:flex-nowrap">
              <div className="w-full lg:w-2/3 px-5 lg:mr-5 mb-5 lg:mb-0">
                <div className="py-10 bg-white rounded-lg p-4 shadow-md">
                  <h3 className="text-xl font-bold mb-3">Reviews</h3>
                  <Review id={venue._id} />
                  <hr className="border-gray-100 border-2 w-full" />
                  <Comment userID={localStorage.getItem("token") ? jwtDecode(localStorage.getItem("token")).id : null} venueID={venue._id} />
                </div>
              </div>
              <div className="w-full lg:w-1/3">
                <div className="px-5 py-10 bg-white rounded-lg shadow-md">
                  <BookBy id={venue._id} />
                  <hr className="border-gray-100 border-2 my-2 w-full" />
                  <Fromthis userid={venue.managedBy} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    
      <Newsletter />
      <Footer />
    </>
  );
}
