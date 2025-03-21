import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default local storage
import cartReducer from "./cartslice.js";
import authApi from "./auth/authApi.js";
import authReducer from "./auth/authSlice.js"; // Ensure this is correctly imported
import productsApi from "./products/productapi.js";
import reviewApi from "./reviews/reviewsApi.js";

const persistConfig = {
  key: "root",
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer, // Corrected from auth: auth
    [productsApi.reducerPath]:productsApi.reducer,
    [reviewApi.reducerPath]:reviewApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(authApi.middleware,productsApi.middleware,reviewApi.middleware),
});

export const persistor = persistStore(store);
