import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  isOpen: false, 
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items.pop();
    },
    toggleWishlistVisibility: (state) => {
      state.isOpen = !state.isOpen;
    },
    setInitialWishlistItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { addItem, removeItem, toggleWishlistVisibility, setInitialWishlistItems } = wishlistSlice.actions;

export default wishlistSlice.reducer;
