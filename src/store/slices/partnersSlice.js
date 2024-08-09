import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const partnersSlice = createSlice({
  name: "partners",
  initialState,
  reducers: {
    fetchPartnersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPartnersSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchPartnersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPartnersStart,
  fetchPartnersSuccess,
  fetchPartnersFailure,
} = partnersSlice.actions;

export default partnersSlice.reducer;
