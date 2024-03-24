import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../reducers/cartSlice";
import authSlice from "../reducers/authSlice";
import adminDashboardSlice from "../reducers/adminDashboardSlice";
import wishlistSlice from "../reducers/wishlistSlice";
import sellerDashboardSlice from "../reducers/sellerDashboardSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    wishlist: wishlistSlice,
    adminDashboard: adminDashboardSlice,
    sellerDashboard: sellerDashboardSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
