import { useState } from "react";
import { useDispatch } from "react-redux";
import { blogUpdated } from "../reducers/blogSlice";
import blogService from "../services/blogs";
import Button from "./Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";

function Comments({ comments, blogId }) {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  async function addComment(event) {
    event.preventDefault();

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

      <Form onSubmit={addComment}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter comment here"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <Form.Text className="text-muted">
            All comments are anonymous.
          </Form.Text>
        </Form.Group>

        <Button type="submit">Add comment</Button>
      </Form>

      <Stack gap={3}>
        {comments.map((comment, i) => {
          return (
            <Card key={i}>
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p>{comment}</p>
                  <footer className="blockquote-footer">Anonymous</footer>
                </blockquote>
              </Card.Body>
            </Card>
          );
        })}
      </Stack>
    </>
  );
}

export default Comments;
