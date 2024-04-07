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
import Recent from '../components/smallcomponents/Recent';
import Fromthis from '../components/smallcomponents/FromthisPerson';
import ReactStars from "react-rating-stars-component";

export default function SingleVenue() {
  const { id } = useParams(); // Get the venue ID from the URL params
  const [venue, setVenue] = useState(null);
  const [facilities, setfacilities] = useState(null);

  useEffect(() => {
    // Fetch venue data by ID
    axios.get(`${API}api/venues?id=${id}`)
      .then(res => {
        setVenue(res.data.venues[0]); // Set the fetched venue data to state
        setfacilities(res.data.venues[0].facilities.split(','));
      })
      .catch(err => console.error(err));
  }, [id]); // Trigger useEffect whenever the ID changes

  // If venue data is still loading, display a loading message
  if (!venue) {
    return <div>Loading...</div>;
  }

  // Once venue data is fetched, display the venue details
  return (
    <>
      <Navbar />
      <section className="text-gray-300 bg-gray-100 body-font overflow-hidden"> {/* Changed background color here */}
        <div className=" px-5 py-24 mx-auto">
          <div className=" mx-auto flex flex-wrap bg-white rounded-lg shadow-md overflow-hidden"> {/* Added bg-white rounded-lg shadow-md overflow-hidden */}
            <img
              alt={venue.name}
              className="lg:w-2/3 w-full  object-contain object-center rounded shadow-md"
              src={`${API}${venue.image}`} // Replace with venue image URL
            />
            <div className="lg:w-1/3 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 text-2xl">
              <h2 className="text-sm title-font text-gray-500 dark:text-gray-900 tracking-widest">
                Venue
              </h2>
              <h1 className="text-gray-900 dark:text-gray-900 text-3xl title-font font-medium mb-1">
                {venue.name} {/* Display venue name */}
              </h1>
              <div className="flex mb-4">
                {/* Display star rating */}
                <span className="flex items-center">
                  <ReactStars
                    count={5}
                    size={24}
                    isHalf={true}
                    edit={false}
                    value={Number(3)}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ea580c"
                  />
                  <span className="text-orange-600 font-bold ml-3 text-sm">
                    3.0
                  </span>
                </span>
              </div>

              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-800">
                  Price Per Hour<br />
                  <span className='text-orange-600'>   Rs. {venue.pricePerHour}/hr {/* Display venue price per hour */}</span>
                </span>
              </div>

              <div className="py-2 mb-2 mt-2">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Facilities:</h2>
                <ul className="list-disc list-inside">
                  {facilities.map((facility, index) => (
                    <li key={index} className="text-gray-800 dark:text-gray-800 text-sm ">{facility}</li>
                  ))}
                </ul>
              </div>
              <Link
                key={venue._id} to={`/venues/booking/${venue._id}`}
                className="ml-auto mt-4 rounded-md bg-orange-600 px-3.5  py-2 text-base font-semibold leading-7 text-white hover:bg-red-500"
              >
                Book Now
              </Link>
            </div>
            <hr className='border-gray-100 border-2 w-full' />
            <div className=" lg:px-10 md:px-4 sm:px-2 py-5 text-start max-w-screen-md ">
              <h3 className='text-gray-800 text-xl font-bold'>Description:</h3>
              <p className="leading-relaxed text-justify dark:text-gray-800">
                {venue.description} {/* Display venue description */}
              </p>
            </div>
          </div>
          <div className="flex text-gray-800 mx-auto container lg:px-10 md:px-4 sm:px-2 py-5">
            <div className="lg:w-2/3 md:w-1/2 sm:w-full px-5 py-10 bg-white rounded-lg shadow-md ">
              <h3 className='text-gray-800 text-xl font-bold mb-3'>Reviews</h3>
              <Review />
              <hr className='border-gray-100 border-2 w-full' />
              <Comment />
            </div>
            <div className="lg:w-1/3 md:w-1/2 sm:w-full"><Recent /><Fromthis /></div>
          </div>

        </div>
      </section>
      <Newsletter />
      <Footer />
    </>
  );
}
