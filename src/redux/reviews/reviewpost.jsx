import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useFetchProductByIdQuery } from '../products/productapi';
import { usePostReviewMutation } from '../../redux/reviews/reviewsApi';

const ReviewPost = ({ isModelOpen, handleClose }) => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { refetch } = useFetchProductByIdQuery(id, { skip: !id });
  const [postReview] = usePostReviewMutation();

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim() || rating === 0) {
      alert("Please provide a comment and a rating.");
      return;
    }

    const newComment = {
      comment,
      rating,
      userId: user?._id,
      productId: id,
    };

    try {
      await postReview(newComment).unwrap();
      alert("Comment posted successfully!");
      setComment('');
      setRating(0);
      refetch();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="review-modal">
      <h2>Post A Review</h2>
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleRating(star)}
            className="cursor-pointer text-yellow-500"
          >
            {rating >= star ? <i className="ri-star-fill"></i> : <i className="ri-star-line"></i>}
          </span>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows="4"
        className="w-full border border-gray-300 p-2 rounded-md mb-4"
        placeholder="Write your review..."
      ></textarea>
      <div>
        <button onClick={handleClose} className="btn btn-secondary">Cancel</button>
        <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
      </div>
    </div>
  );
};

export default ReviewPost;
