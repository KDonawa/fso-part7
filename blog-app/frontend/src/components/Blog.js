import { Link } from "react-router-dom";
import { useNotification } from "../hooks";
import { useNavigate } from "react-router-dom";
import blogService from "../services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { blogDeleted, blogUpdated } from "../reducers/blogSlice";
import { selectUserId } from "../reducers/userSlice";
import Button from "./Button";
import Card from "react-bootstrap/Card";

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
      <Card>
        <Card.Body>
          <Card.Title>{blog.title}</Card.Title>
          <p>
            <a href={`${blog.url}`}>{blog.url}</a>
          </p>
          <p>
            Added by <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
          </p>
          <p>
            <Button
              variant="primary"
              size="sm"
              className="blog__like-btn"
              onClick={updateLikes}
            >
              Likes: {blog.likes}
            </Button>
          </p>
          {blog.user.id === userId && (
            <Button
              variant="outline-danger"
              size="sm"
              className="blog__delete-btn my-1"
              onClick={deleteBlog}
            >
              Delete
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Blog;
