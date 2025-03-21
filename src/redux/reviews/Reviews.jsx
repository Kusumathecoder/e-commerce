import React from 'react';
import { useFetchProductByIdQuery } from '../../redux/products/productapi';

const Reviews = ({ productId }) => {
  const { data, isLoading, error } = useFetchProductByIdQuery(productId);

  if (isLoading) return <p>Loading reviews...</p>;
  if (error) return <p>Error loading reviews: {error.message}</p>;

  return (
    <div className="reviews">
      <h3>Customer Reviews</h3>
      {data?.reviews?.length > 0 ? (
        data.reviews.map((review) => (
          <div key={review._id} className="review">
            <p><strong>{review.user?.name || "Anonymous"}:</strong></p>
            <p>{review.comment}</p>
            <p>Rating: {"⭐".repeat(review.rating)}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet. Be the first to review!</p>
      )}
    </div>
  );
};

export default Reviews;
