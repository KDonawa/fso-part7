import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

function AnecdoteForm({ addNew }) {
  const [content, resetContent] = useField("text");
  const [author, resetAuthor] = useField("text");
  const [info, resetInfo] = useField("text");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate("/");
  }
  function resetForm() {
    resetContent();
    resetAuthor();
    resetInfo();
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="submit">create</button>
        <button onClick={resetForm} type="button">
          reset
        </button>
      </form>
    </div>
  );
}

export default AnecdoteForm;
