import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const announcementsSlice = createSlice({
  name: "announcements",
  initialState,
  reducers: {
    fetchAnnouncementsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAnnouncementsSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchAnnouncementsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchAnnouncementsStart,
  fetchAnnouncementsSuccess,
  fetchAnnouncementsFailure,
} = announcementsSlice.actions;

export default announcementsSlice.reducer;
