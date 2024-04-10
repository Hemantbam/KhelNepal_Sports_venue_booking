import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import axios from "axios"; // Import Axios for making HTTP requests
import { API } from "../../Data/baseIndex";

const Comment = ({ userID, venueID }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Simulate checking if user is logged in (using useEffect with a mock implementation)
    useEffect(() => {
        // Here you can implement your logic to check if the user is logged in
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists
    }, []);

    const ratingChanged = (newRating) => {
        setRating(newRating);
    };

    const submitReview = async () => {
        try {
            if (!isLoggedIn) {
                setErrorMessage("Please log in to leave a comment.");
                return;
            }
            // Send a POST request to your backend endpoint to create the review
            const token = localStorage.getItem("token");
            const response = await axios.post(`${API}api/reviews`, {
                userId: userID,
                venueId: venueID,
                rating: rating,
                comment: comment
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Optionally, you can handle success response here
            console.log("Review submitted successfully:", response.data);
            setSuccessMessage("Review submitted successfully!");
            // Reset rating and comment after submission
            setRating(0);
            setComment("");
        } catch (error) {
            // Handle error here
            console.log(error.response.data.message);
            console.error("Error submitting review:", error.response.data.message||'');
            setErrorMessage(`Failed to submit review. Please try again later.\n${error.response.data.message}`);
        } finally {
            // Hide messages after 2 seconds
            setTimeout(() => {
                setErrorMessage("");
                setSuccessMessage("");
            }, 3000);
        }
    };

    return (
        <div className=" mx-auto bg-gray-100 rounded-xl shadow-xl overflow-hidden mt-2">
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
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Type your comment here..."
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    ></textarea>
                </div>
                <div className="mb-6">
                   <button onClick={submitReview} className="block bg-orange-600 text-white rounded-md shadow-md px-3 py-2">Give Review</button>
                </div>
                {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                {successMessage && <div className="text-green-500">{successMessage}</div>}
            </div>
        </div>
    );
};

export default Comment;
