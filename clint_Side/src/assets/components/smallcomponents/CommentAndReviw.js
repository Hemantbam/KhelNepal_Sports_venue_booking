import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";

const Comment = () => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const ratingChanged = (newRating) => {
        setRating(newRating);
        console.log(newRating); // You can perform any other logic here
    };

    return (
        <div className="max-w-md mx-auto bg-gray-100 rounded-xl shadow-xl overflow-hidden md:max-w-2xl mt-2">
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Leave a Comment</h2>
                <div className="flex items-center mb-6 align-middle">
                    <span className="mr-2 text-lg">Rating:</span>
                    <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={40}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ea580c"
                    /> 
                    <span className="text-orange-600 font-bold text-lg">{rating.toFixed(1)}</span> {/* Fixed decimal */}
                </div>
                <div className="mb-6">
                    <label htmlFor="comment" className="block text-lg mb-1">Your comment</label>
                    <textarea
                        id="comment"
                        rows="4"
                        value={comment}
                        onChange={(e) => { setComment(e.target.value)}}
                        placeholder="Type your comment here..."
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    ></textarea>
                </div>
                <div className="mb-6">
                   <input type="submit" className="block bg-orange-600 text-white rounded-md shadow-md px-3 py-2" value="Give Review" />
                </div>
            </div>
        </div>
    );
};

export default Comment;
