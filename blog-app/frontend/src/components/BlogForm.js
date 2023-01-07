import React, { useState } from "react";
import { useDispatch } from "react-redux";
import blogService from "../services/blogs";
import { blogAdded } from "../reducers/blogSlice";
import { useNotification } from "../hooks";
import Button from "./Button";
import Form from "react-bootstrap/Form";

function BlogForm({ hide }) {
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

      hide();
    } catch (error) {
      notify({
        message: "A new blog could not be created",
        type: "error",
      });
    }
  }

  return (
    <>
      <h3>Add new blog post</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            id="title"
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            id="author"
            type="text"
            placeholder="Enter author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Url</Form.Label>
          <Form.Control
            id="url"
            type="text"
            placeholder="http://url.com"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </Form.Group>

        <Button
          variant="primary"
          className="blog-form__submit-btn mx-1"
          type="submit"
        >
          Submit
        </Button>
        <Button
          variant="outline-danger"
          className="blog-form__cancel-btn"
          type="button"
          onClick={hide}
        >
          Cancel
        </Button>
      </Form>
    </>
  );
}

export default BlogForm;
