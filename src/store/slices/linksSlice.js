import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const linksSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    fetchLinksStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchLinksSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchLinksFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchLinksStart, fetchLinksSuccess, fetchLinksFailure } =
  linksSlice.actions;

export default linksSlice.reducer;
