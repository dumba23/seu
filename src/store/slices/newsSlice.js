import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    fetchNewsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchNewsSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchNewsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchNewsStart, fetchNewsSuccess, fetchNewsFailure } =
  newsSlice.actions;

export default newsSlice.reducer;
