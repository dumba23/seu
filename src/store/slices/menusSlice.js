import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const menusSlice = createSlice({
  name: "menus",
  initialState,
  reducers: {
    fetchMenusStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchMenusSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchMenusFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchMenusStart, fetchMenusSuccess, fetchMenusFailure } =
  menusSlice.actions;

export default menusSlice.reducer;
