import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [{}],
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items = action.payload;
    },
    removeItem: (state, action) => {
      state.items.pop();
    },
    toggleCartVisibility: (state) => {
      state.isOpen = !state.isOpen;
    },
    setInitialCartItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const {
  addItem,
  removeItem,
  toggleCartVisibility,
  setInitialCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
