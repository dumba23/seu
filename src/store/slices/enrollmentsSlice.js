import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    fetchEnrollmentsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchEnrollmentsSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchEnrollmentsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchEnrollmentsStart,
  fetchEnrollmentsSuccess,
  fetchEnrollmentsFailure,
} = enrollmentsSlice.actions;

export default enrollmentsSlice.reducer;
