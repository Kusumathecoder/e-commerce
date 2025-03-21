import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart } from "../../redux/cartslice.js"

const CartModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const cart = useSelector((store) => store.cart);

    return (
        <div
            style={{
                position: 'fixed',
                zIndex: 1000,
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                transition: 'opacity 300ms',
                opacity: isOpen ? '1' : '0',
                pointerEvents: isOpen ? 'auto' : 'none',
            }}
        >
            <div
                style={{
                    position: 'fixed',
                    right: 0,
                    top: 0,
                    width: '100%',
                    maxWidth: '33%',
                    backgroundColor: 'white',
                    height: '100%',
                    overflowY: 'auto',
                    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
                    transition: 'transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    padding: '16px',
                }}
            >
                {/* Header Section */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '16px',
                    }}
                >
                    <h4 style={{ fontSize: '20px', fontWeight: '600' }}>Your Cart</h4>
                    <button
                        onClick={onClose}
                        style={{ color: '#4A5568', cursor: 'pointer', fontSize: '18px' }}
                    >
                        ✖
                    </button>
                </div>

                {/* Cart Items */}
                <div>
                    {cart.products.length === 0 ? (
                        <div style={{ textAlign: 'center', color: '#6B7280' }}>Your cart is empty</div>
                    ) : (
                        cart.products.map((item) => (
                            <div
                                key={item.id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
                                    padding: '10px',
                                    marginBottom: '16px',
                                    borderRadius: '8px',
                                }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        objectFit: 'cover',
                                        marginRight: '10px',
                                    }}
                                />

                                <div>
                                    <h5 style={{ fontWeight: '600', marginBottom: '4px' }}>{item.name}</h5>
                                    <p style={{ color: '#6B7280', fontSize: '14px' }}>
                                        ${Number(item.price).toFixed(2)}
                                    </p>
                                </div>

                                {/* Quantity Controls */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <button onClick={() => dispatch(decreaseQuantity({ id: item.id }))}>−</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => dispatch(increaseQuantity({ id: item.id }))}>+</button>
                                    <button onClick={() => dispatch(removeFromCart({ id: item.id }))} style={{ color: 'red' }}>
                                        ❌
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Order Summary */}
                {cart.products.length > 0 && (
                    <div style={{ marginTop: '20px', padding: '10px', borderTop: '1px solid #E2E8F0' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Order Summary</h3>
                        <p>Subtotal: ${cart.totalPrice.toFixed(2)}</p>
                        <p>Tax (5%): ${cart.tax.toFixed(2)}</p>
                        <p style={{ fontWeight: 'bold' }}>Grand Total: ${cart.grandTotal.toFixed(2)}</p>

                        {/* Proceed to Payment Button */}
                        <button
                            style={{
                                width: '100%',
                                padding: '10px',
                                backgroundColor: '#3182CE',
                                color: 'white',
                                borderRadius: '5px',
                                marginTop: '10px',
                                cursor: 'pointer',
                            }}
                            onClick={() => alert('Proceeding to Payment...')}
                        >
                            Proceed to Payment
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartModal;
