import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialState = [];

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogs: (state, action) => action.payload,
    blogAdded: (state, action) => {
      state.push(action.payload);
    },
    blogDeleted: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload);
    },
    blogUpdated: (state, action) => {
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
    },
  },
});

export const { setBlogs, blogAdded, blogDeleted, blogUpdated } =
  blogSlice.actions;

export const selectBlogs = (state) => state.blogs;

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch(setBlogs(blogs));
};

export default blogSlice.reducer;
