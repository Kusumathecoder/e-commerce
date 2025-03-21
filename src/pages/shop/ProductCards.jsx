import React from "react";
import { Link } from "react-router-dom";
import RatingStars from '../../components/RatingStars';  // Adjust if needed
import { useDispatch } from "react-redux";
const ProductCards = ({ products }) => {
    const dispatch=useDispatch();
    const handleAddToCart=(product)=>{
        dispatch(addToCart(product))
    }
    return (
        <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
            {/* Flexbox for row layout */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
                {products.map((product, index) => (
                    <div
                        key={index}
                        style={{
                            width: "250px",
                            background: "#fff",
                            borderRadius: "10px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            overflow: "hidden",
                            textAlign: "center",
                            padding: "10px",
                            position: "relative",
                            transition: "transform 0.3s",
                        }}
                        className="product-card"
                    >
                        {/* ✅ Corrected Link to SingleProduct Page */}
                        <Link to={`/shop/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                            <img
                                src={product.image}
                                alt={product.name}
                                style={{
                                    width: "100%",
                                    height: "180px",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                    transition: "transform 0.3s",
                                }}
                            />
                        </Link>

                        {/* Shopping Cart Icon */}
                        <div
                            className="cart-icon"
                            style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                opacity: 0, // Initially hidden
                                transition: "opacity 0.3s ease-in-out",
                            }}
                        >
                            <button 
                            onClick={(e)=>{
                                e.stopPropagation();
                                handleAddToCart(product)
                            }}
                            style={{
                                backgroundColor: "#007BFF",
                                color: "white",
                                padding: "10px",
                                borderRadius: "50%",
                                border: "none",
                                cursor: "pointer"
                            }}>
                                <i className="ri-shopping-cart-2-line" style={{ fontSize: "18px" }}></i>
                            </button>
                        </div>

                        {/* Product Info */}
                        <div>
                            <h4>{product.name}</h4>
                            <p>
                                ${product.price}{" "}
                                {product.oldPrice ? <s>${product.oldPrice}</s> : null}
                            </p>
                            <RatingStars rating={product.rating}/>
                        </div>
                    </div>
                ))}
            </div>

            {/* CSS for Hover Effect */}
            <style>
                {`
                    .product-card:hover .cart-icon {
                        opacity: 1;
                    }
                `}
            </style>
        </div>
    );
};

export default ProductCards;
