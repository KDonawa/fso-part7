import AnecdoteList from "../components/AnecdoteList";

function Home({ anecdotes, notification }) {
  return <AnecdoteList anecdotes={anecdotes} />;
}

export default Home;
