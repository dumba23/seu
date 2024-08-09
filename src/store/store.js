import { configureStore } from "@reduxjs/toolkit";
import linksReducer from "./slices/linksSlice";
import menusReducer from "./slices/menusSlice";
import benefitsReducer from "./slices/benefitsSlice";
import partnersReducer from "./slices/partnersSlice";
import announcementsReducer from "./slices/announcementsSlice";
import newsReducer from "./slices/newsSlice";
import enrollmentsReducer from "./slices/enrollmentsSlice";
import vacanciesReducer from "./slices/vacanciesSlice";

const store = configureStore({
  reducer: {
    links: linksReducer,
    menus: menusReducer,
    benefits: benefitsReducer,
    partners: partnersReducer,
    announcements: announcementsReducer,
    news: newsReducer,
    enrollments: enrollmentsReducer,
    vacancies: vacanciesReducer,
  },
});

export default store;
