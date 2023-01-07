import React, { useState } from "react";
import { useSelector } from "react-redux";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Toggleable from "./Toggleable";
import { selectBlogs } from "../reducers/blogSlice";

function BlogList() {
  const [blogFormVisibility, setBlogFormVisibility] = useState(false);

  const blogs = useSelector(selectBlogs);
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}

      <Toggleable
        isVisible={blogFormVisibility}
        toggleVisibility={setBlogFormVisibility}
        buttonLabel={{ visible: "Cancel", hidden: "New blog" }}
      >
        <BlogForm setVisibility={setBlogFormVisibility} />
      </Toggleable>
    </>
  );
}

export default BlogList;
