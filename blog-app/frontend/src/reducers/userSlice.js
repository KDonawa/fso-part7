import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const storageKey = "blogAppUser";
const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => action.payload,
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const selectUser = (state) => state.user;
export const selectUserId = (state) => state.user.id;

export const userLogin = (user) => (dispatch) => {
  dispatch(setUser(user));
  window.localStorage.setItem(storageKey, JSON.stringify(user));
  blogService.setAuth(user.token);
};

export const userLogout = () => (dispatch) => {
  dispatch(clearUser());
  window.localStorage.removeItem(storageKey);
};

export const previousUserLogin = () => (dispatch) => {
  const blogAppUserJSON = window.localStorage.getItem(storageKey);
  if (blogAppUserJSON) {
    const user = JSON.parse(blogAppUserJSON);
    dispatch(setUser(user));
    blogService.setAuth(user.token);
  }
};

export default userSlice.reducer;
