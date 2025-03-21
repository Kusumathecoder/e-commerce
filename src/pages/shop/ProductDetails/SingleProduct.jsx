import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addToCart } from '../../../redux/cartslice';
import products from '../../../data/products.json';
import Reviews from '../../../redux/reviews/Reviews';
import ReviewPost from '../../../redux/reviews/reviewpost';
import { useFetchProductByIdQuery } from '../../../redux/products/productapi';

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = products.find((item) => item.id === Number(id));
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  if (!product) {
    return <h2 style={{ textAlign: 'center', marginTop: '2rem', color: 'red' }}>Product Not Found</h2>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <>
      <div style={{ maxWidth: '1200px', margin: 'auto', padding: '1rem' }}>
        <section
          style={{
            backgroundColor: '#f3f4f6',
            padding: '1.5rem',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{product.name}</h2>
          <div style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
            <Link to="/" style={{ color: '#3b82f6', textDecoration: 'none' }}>Home</Link> &gt;
            <Link to="/shop" style={{ color: '#3b82f6', textDecoration: 'none', margin: '0 0.5rem' }}>Shop</Link> &gt;
            <span style={{ color: '#374151' }}>{product.name}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '10px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                ${product.price.toFixed(2)}
              </h3>
              <p style={{ color: '#4b5563', marginBottom: '1rem' }}>{product.description}</p>
              <p style={{ color: '#374151' }}><strong>Color:</strong> {product.color}</p>
              <p style={{ color: '#374151' }}><strong>Rating:</strong> ⭐ {product.rating.toFixed(1)}</p>
              <button
                style={{
                  marginTop: '1rem',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                }}
                onClick={handleAddToCart}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#2563eb')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#3b82f6')}
              >
                Add to Cart
              </button>
              <button
                style={{
                  marginLeft: '10px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                }}
                onClick={() => setIsReviewModalOpen(true)}
              >
                Write a Review
              </button>
            </div>
          </div>
        </section>

        <section className="section__container mt-8">
          <Reviews productId={id} />
        </section>

        {isReviewModalOpen && <ReviewPost isModelOpen={isReviewModalOpen} handleClose={() => setIsReviewModalOpen(false)} />}
      </div>
    </>
  );
};

export default SingleProduct;
