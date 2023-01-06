import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import blogService from "../services/blogs";

import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Toggleable from "./Toggleable";

import { createNotification } from "../reducers/notificationSlice";

function BlogList({ user }) {
  const dispatch = useDispatch();

  const [blogs, setBlogs] = useState([]);
  const [blogFormVisibility, setBlogFormVisibility] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  async function addBlog(data) {
    try {
      const blog = await blogService.create(data);
      setBlogs(blogs.concat(blog));

      dispatch(
        createNotification({
          message: `A new blog - ${blog.title} by ${blog.author} was added!`,
          type: "success",
        })
      );

      setBlogFormVisibility(false);

      return true;
    } catch (error) {
      dispatch(
        createNotification({
          message: "A new blog could not be created",
          type: "error",
        })
      );

      return false;
    }
  }
  async function deleteBlog(id) {
    try {
      await blogService.remove(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));

      dispatch(
        createNotification({
          message: "A blog was deleted",
          type: "success",
        })
      );
    } catch (error) {
      console.log(error);

      dispatch(
        createNotification({
          message: "Blog could not be deleted",
          type: "error",
        })
      );
    }
  }
  async function updateLikes(blog) {
    try {
      const updatedBlog = await blogService.update(blog.id, {
        likes: blog.likes + 1,
      });
      const updatedBlogs = blogs.map((blog) => {
        if (blog.id === updatedBlog.id) {
          return { ...blog, likes: updatedBlog.likes };
        }
        return blog;
      });
      setBlogs(updatedBlogs);
    } catch (error) {
      console.log(error);
    }
  }

  blogs.sort((a, b) => b.likes - a.likes);

  return (
    <>
      <h2>Blogs</h2>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateLikes={updateLikes}
          deleteBlog={() => deleteBlog(blog.id)}
          isOwner={user && user.id === blog.user.id}
        />
      ))}

      <Toggleable
        isVisible={blogFormVisibility}
        toggleVisibility={setBlogFormVisibility}
        buttonLabel={{ visible: "Cancel", hidden: "New blog" }}
      >
        <BlogForm addBlog={addBlog} />
      </Toggleable>
    </>
  );
}

BlogList.propTypes = {
  user: PropTypes.object.isRequired,
};

export default BlogList;
