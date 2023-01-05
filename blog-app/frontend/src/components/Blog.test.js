import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

const blog = {
  title: "A title",
  author: "An author",
  url: "/url",
  likes: 0,
};

describe.skip("Components are correctly rendered", () => {
  let container = null;

  beforeEach(() => {
    container = render(<Blog blog={blog} />).container;
  });

  test("renders the title and author, but not the url or number of likes by default", () => {
    const titleElement = screen.queryByText(blog.title);
    expect(titleElement).toBeDefined();

    const authorElement = screen.queryByText(blog.author);
    expect(authorElement).toBeDefined();

    const urlElement = screen.queryByText(blog.url);
    expect(urlElement).toBeNull();

    const likes = container.querySelector(".blog__likes");
    expect(likes).toBeNull();
  });

  test("url and number of likes are shown when the button controlling the shown details has been clicked", async () => {
    const blog = {
      title: "A title",
      author: "An author",
      url: "/url",
      likes: 0,
    };

    const { container } = render(<Blog blog={blog} />);

    const user = userEvent.setup();
    const button = container.querySelector(".blog__view-btn");
    await user.click(button);

    const urlElement = screen.queryByText(blog.url);
    expect(urlElement).toBeDefined();

    const likes = container.querySelector(".blog__likes");
    expect(likes).toBeDefined();
  });
});

test.skip("if the like button is clicked twice, the event handler the component received as props is called twice", async () => {
  const updateLikes = jest.fn();
  const { container } = render(<Blog blog={blog} updateLikes={updateLikes} />);

  const user = userEvent.setup();
  const button = container.querySelector(".blog__view-btn");
  await user.click(button);
  const likeBtn = container.querySelector(".blog__like-btn");
  await user.click(likeBtn);
  await user.click(likeBtn);

  expect(updateLikes.mock.calls).toHaveLength(2);
});
