import React, { useState } from "react";
import { useSelector } from "react-redux";
import BlogForm from "./BlogForm";
import Toggleable from "./Toggleable";
import { selectBlogs } from "../reducers/blogSlice";
import { Link } from "react-router-dom";

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

function Blog({ blog }) {
  return (
    <div className="blog">
      <Link to={`/blogs/${blog.id}`}>
        <span className="blog__info">
          {blog.title} - {blog.author}
        </span>
      </Link>
    </div>
  );
}

export default BlogList;
