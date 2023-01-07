import React, { useState } from "react";
import { useSelector } from "react-redux";
import BlogForm from "./BlogForm";
import Toggleable from "./Toggleable";
import { selectBlogs } from "../reducers/blogSlice";
import Stack from "react-bootstrap/Stack";
import BlogCard from "./BlogCard";

function BlogList() {
  const [blogFormVisibility, setBlogFormVisibility] = useState(false);

  const blogs = useSelector(selectBlogs);
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <>
      <h2>Blogs</h2>

      <Stack gap={3}>
        {sortedBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}

        <Toggleable
          isVisible={blogFormVisibility}
          show={() => setBlogFormVisibility(true)}
          buttonLabel="New blog"
        >
          <BlogForm hide={() => setBlogFormVisibility(false)} />
        </Toggleable>
      </Stack>
    </>
  );
}

export default BlogList;
