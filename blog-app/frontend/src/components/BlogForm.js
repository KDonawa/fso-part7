import React, { useState } from "react";

function BlogForm({ addBlog }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const isSuccessful = await addBlog({ title, author, url });

    if (isSuccessful) {
      //reset form
      setTitle("");
      setAuthor("");
      setUrl("");
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
            required
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
            required
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
            required
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
