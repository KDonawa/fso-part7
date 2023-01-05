import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test.skip("calls the event handler it received as props with the right details when a new blog is created", async () => {
  const blog = {
    title: "Blog Title",
    author: "Blog author",
    url: "/url",
  };
  const addBlog = jest.fn();
  const user = userEvent.setup();

  const { container } = render(<BlogForm addBlog={addBlog} />);

  const titleInput = container.querySelector("#title");
  const authorInput = container.querySelector("#author");
  const urlInput = container.querySelector("#url");
  const submitBtn = container.querySelector(".blog-form__submit-btn");

  await user.type(titleInput, blog.title);
  await user.type(authorInput, blog.author);
  await user.type(urlInput, blog.url);
  await user.click(submitBtn);

  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0].title).toBe(blog.title);
  expect(addBlog.mock.calls[0][0].author).toBe(blog.author);
  expect(addBlog.mock.calls[0][0].url).toBe(blog.url);
});
