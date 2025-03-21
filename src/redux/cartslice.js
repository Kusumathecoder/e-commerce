import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  totalPrice: 0,
  tax: 0,
  grandTotal: 0,
};

const updateCartTotals = (state) => {
  state.totalPrice = state.products.reduce((total, item) => total + item.price * item.quantity, 0);
  state.tax = state.totalPrice * 0.05; // 5% tax
  state.grandTotal = state.totalPrice + state.tax;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.products.find(item => item.id === action.payload.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      updateCartTotals(state);
    },

    increaseQuantity: (state, action) => {
      const product = state.products.find(item => item.id === action.payload.id);
      if (product) product.quantity += 1;
      updateCartTotals(state);
    },

    decreaseQuantity: (state, action) => {
      const product = state.products.find(item => item.id === action.payload.id);
      if (product && product.quantity > 1) product.quantity -= 1;
      updateCartTotals(state);
    },

    removeFromCart: (state, action) => {
      state.products = state.products.filter(item => item.id !== action.payload.id);
      updateCartTotals(state);
    },

    clearCart: (state) => {
      state.products = [];
      state.totalPrice = 0;
      state.tax = 0;
      state.grandTotal = 0;
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
