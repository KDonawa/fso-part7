import blogService from "../services/blogs";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  blogDeleted,
  blogUpdated,
  selectBlogById,
} from "../reducers/blogSlice";
import { selectUserId } from "../reducers/userSlice";
import { createNotification } from "../reducers/notificationSlice";

function Blog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function deleteBlog() {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id);
        dispatch(blogDeleted(blog.id));

        dispatch(
          createNotification({
            message: "A blog was deleted",
            type: "success",
          })
        );

        navigate("/");
      } catch (error) {
        dispatch(
          createNotification({
            message: "Blog could not be deleted",
            type: "error",
          })
        );
      }
    }
  }
  async function updateLikes() {
    try {
      const updatedBlog = await blogService.update(blog.id, {
        likes: blog.likes + 1,
      });
      dispatch(blogUpdated(updatedBlog));
    } catch (error) {
      console.log(error);
    }
  }

  const id = useParams().id;
  const blog = useSelector(selectBlogById(id));
  const userId = useSelector(selectUserId);

  return !blog ? null : (
    <div>
      <h2>{blog.title}</h2>
      <a href={`${blog.url}`}>{blog.url}</a>
      <p>
        {blog.likes} likes <button onClick={updateLikes}>like</button>
      </p>
      <p>
        Added by <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
      </p>
      {blog.user.id === userId && <button onClick={deleteBlog}>Delete</button>}
    </div>
  );
}

export default Blog;
