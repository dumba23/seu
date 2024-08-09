import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const benefitsSlice = createSlice({
  name: "benefits",
  initialState,
  reducers: {
    fetchBenefitsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchBenefitsSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchBenefitsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchBenefitsStart,
  fetchBenefitsSuccess,
  fetchBenefitsFailure,
} = benefitsSlice.actions;

export default benefitsSlice.reducer;
