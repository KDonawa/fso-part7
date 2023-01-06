import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogSlice";
import notificationReducer from "./reducers/notificationSlice";
import userReducer from "./reducers/userSlice";

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
  },
});
