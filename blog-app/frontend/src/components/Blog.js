import { Link } from "react-router-dom";
import { useNotification } from "../hooks";
import { useNavigate } from "react-router-dom";
import blogService from "../services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { blogDeleted, blogUpdated } from "../reducers/blogSlice";
import { selectUserId } from "../reducers/userSlice";

function Blog({ blog }) {
  const notify = useNotification();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function deleteBlog() {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id);
        dispatch(blogDeleted(blog.id));

        notify({
          message: "A blog was deleted",
          type: "success",
        });

        navigate("/");
      } catch (error) {
        notify({
          message: "Blog could not be deleted",
          type: "error",
        });
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

  const userId = useSelector(selectUserId);

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={`${blog.url}`}>{blog.url}</a>
      <p>
        <span className="blog__likes">{`${blog.likes} ${
          blog.likes === 1 ? "like" : "likes"
        }`}</span>{" "}
        <button className="blog__like-btn" onClick={updateLikes}>
          like
        </button>
      </p>
      <p>
        Added by <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
      </p>
      {blog.user.id === userId && (
        <button className="blog__delete-btn" onClick={deleteBlog}>
          Delete
        </button>
      )}
    </div>
  );
}

export default Blog;
