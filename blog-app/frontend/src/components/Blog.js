import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import blogService from "../services/blogs";
import { blogDeleted, blogUpdated } from "../reducers/blogSlice";
import { createNotification } from "../reducers/notificationSlice";

function Blog({ blog, isOwner }) {
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useDispatch();

  async function deleteBlog() {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id);
        dispatch(blogDeleted(blog.id));

        dispatch(
          createNotification({
            message: "A blog was deleted",
            type: "success",
          })
        );
      } catch (error) {
        dispatch(
          createNotification({
            message: "Blog could not be deleted",
            type: "error",
          })
        );
      }
    }
  }

  async function updateLikes() {
    try {
      const updatedBlog = await blogService.update(blog.id, {
        likes: blog.likes + 1,
      });
      dispatch(blogUpdated(updatedBlog));
    } catch (error) {
      console.log(error);
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div className="blog" style={blogStyle}>
      <div>
        <span>
          {blog.title} {blog.author}
        </span>{" "}
        <button
          className="blog__view-btn"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? "hide" : "view"}
        </button>
      </div>
      {showDetails && (
        <>
          <div>{blog.url}</div>
          <div>
            <span className="blog__likes">likes: {blog.likes}</span>{" "}
            <button className="blog__like-btn" onClick={updateLikes}>
              like
            </button>
          </div>
          <div>{blog.user !== null && blog.user.name}</div>
          {isOwner && (
            <button className="blog__delete-btn" onClick={deleteBlog}>
              delete
            </button>
          )}
        </>
      )}
    </div>
  );
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
