import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const vacanciesSlice = createSlice({
  name: "vacancies",
  initialState,
  reducers: {
    fetchVacanciesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchVacanciesSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchVacanciesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchVacanciesStart,
  fetchVacanciesSuccess,
  fetchVacanciessFailure,
} = vacanciesSlice.actions;

export default vacanciesSlice.reducer;
