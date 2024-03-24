import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sectionsState: {
    product: false,
    order: false,
  },
  currentSection: null,
  currentAction: null,
  currentProduct: null,
};

const sellerDashboardSlice = createSlice({
  name: "sellerDashboard",
  initialState,
  reducers: {
    toggleSection: (state, action) => {
      const sectionName = action.payload;
      state.sectionsState[sectionName] = !state.sectionsState[sectionName];
    },
    selectSellerAction: (state, action) => {
      const { selectedSection, selectedAction } = action.payload;
      state.currentSection = selectedSection;
      state.currentAction = selectedAction;
      Object.keys(state.sectionsState).forEach((key) => {
        if (key !== selectedSection) {
          state.sectionsState[key] = false;
        }
      });
    },
    closeSection: (state) => {
      state.currentSection = null;
      state.currentAction = null;
    },
    selectSellerProduct: (state, action) => {
      state.currentProduct = action.payload;
    },
  },
});

export const {
  toggleSection,
  selectSellerAction,
  closeSection,
  selectSellerProduct,
} = sellerDashboardSlice.actions;

export default sellerDashboardSlice.reducer;
