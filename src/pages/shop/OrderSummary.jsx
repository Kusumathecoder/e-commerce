import React from 'react';
import { useSelector } from 'react-redux';

const OrderSummary = () => {
    const cart = useSelector((store) => store.cart);
    console.log("Cart Data:", cart);
    console.log("Product IDs:", cart?.products?.map(p => p._id)); // Debugging

    return (
        <div className='bg-primary-light mt-5 rounded text-base'>
            <div className='px-6 py-4 space-y-5'>
                <h2 className='text-xl text-text-dark'>Order Summary</h2>
                <p>Selected Items: {cart?.selectedItems || 0}</p>
                <p>Total Price: ${cart?.totalPrice?.toFixed(2) || "0.00"}</p>
                <p>Tax: ${cart?.tax?.toFixed(2) || "0.00"}</p>
                <p>Grand Total: ${cart?.grandTotal?.toFixed(2) || "0.00"}</p>

                {/* Display cart items */}
                <ul>
                    {cart?.products?.length > 0 ? (
                        cart.products.map((product, index) => (
                            <li key={product._id || product.name || index}>  
                                {product.name} - {product.quantity} x ${product.price}
                            </li>
                        ))
                    ) : (
                        <p>No items in cart</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default OrderSummary;
