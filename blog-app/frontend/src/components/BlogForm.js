import React, { useState } from "react";
import { useDispatch } from "react-redux";

import blogService from "../services/blogs";

import { blogAdded } from "../reducers/blogSlice";
import { useNotification } from "../hooks";

function BlogForm({ setVisibility }) {
  const dispatch = useDispatch();
  const notify = useNotification();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const blog = await blogService.create({ title, author, url });

      dispatch(blogAdded(blog));

      notify({
        message: `A new blog - ${blog.title} by ${blog.author} was added!`,
        type: "success",
      });

      setVisibility(false);
    } catch (error) {
      notify({
        message: "A new blog could not be created",
        type: "error",
      });
    }
  }

  return (
    <>
      <h2>Create new blog post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          Title:
          <input
            type="text"
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
        <br />
        <label htmlFor="author">
          Author:
          <input
            type="text"
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
        <br />
        <label htmlFor="url">
          Url:
          <input
            type="text"
            name="url"
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
        <br />
        <button className="blog-form__submit-btn" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default BlogForm;
