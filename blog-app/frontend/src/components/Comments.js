import { useState } from "react";
import { useDispatch } from "react-redux";
import { blogUpdated } from "../reducers/blogSlice";
import blogService from "../services/blogs";

function Comments({ comments, blogId }) {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  async function addComment() {
    try {
      const updatedBlog = await blogService.postComment({ comment }, blogId);
      dispatch(blogUpdated(updatedBlog));
      setComment("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h3>Comments</h3>

      <div>
        <input
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />{" "}
        <button type="submit" onClick={addComment}>
          Add comment
        </button>
      </div>

      <div>
        <ul>
          {comments.map((comment, i) => {
            return <li key={i}>{comment}</li>;
          })}
        </ul>
      </div>
    </>
  );
}

export default Comments;
