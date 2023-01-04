import { useLoaderData } from "react-router-dom";

function Anecdote() {
  const anecdote = useLoaderData();
  const { content, author, votes, info } = anecdote;

  return (
    <div>
      <h2>
        {content} by {author}
      </h2>
      <p>
        has {votes} {votes === 1 ? "vote" : "votes"}
      </p>
      <p>
        for more info see <a href={info}>{info}</a>
      </p>
    </div>
  );
}

export default Anecdote;
