import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Toggleable from "./Toggleable";
import { initializeBlogs, selectBlogs } from "../reducers/blogSlice";

function BlogList({ user }) {
  const [blogFormVisibility, setBlogFormVisibility] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const blogs = useSelector(selectBlogs);
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <>
      <h2>Blogs</h2>

      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          isOwner={user && user.id === blog.user.id}
        />
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
