import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../../Data/baseIndex';
import User from './User';
import ReactStars from "react-rating-stars-component";
const Review = ({id}) => {
    const [reviews, setReviews] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${API}api/reviews?venueid=${id}`);
                console.log(response.data.reviews); // Add this line
                setReviews(response.data.reviews);
                setLoading(false);
            } catch (error) {
                setError('Error fetching reviews. Please try again later.');
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {reviews.map(review => (
                <article key={review.id}>
                    <div className="flex items-center mb-4">
                    <User userid={review.userid} />
                    </div>
                    <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                    <div className="flex mb-4">
                {/* Display star rating */}
                <span className="flex items-center">
                  <ReactStars
                    count={5}
                    size={24}
                    isHalf={true}
                    edit={false}
                    value={Number(review.rating)}
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
                    </div>
                    <p className="mb-2 text-gray-500 line-clamp-2">
                        {review.comment}
                    </p>
                   
                    <hr className='border-gray-100 border-2 w-full' />
                </article>
                
            ))}
        </div>
    );
};

export default Review;
