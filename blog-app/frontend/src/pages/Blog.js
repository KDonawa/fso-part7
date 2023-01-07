import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectBlogById } from "../reducers/blogSlice";
import Blog from "../components/Blog";
import Comments from "../components/Comments";

function BlogPage() {
  const id = useParams().id;
  const blog = useSelector(selectBlogById(id));

  return !blog ? null : (
    <>
      <Blog blog={blog} />
      <Comments comments={blog.comments} blogId={id} />
    </>
  );
}

export default BlogPage;
