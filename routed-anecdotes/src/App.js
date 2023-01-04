import { useState } from "react";

// LAYOUTS
import Root from "./layouts/root";

// PAGES
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Create from "./pages/create";
import About from "./pages/about";
import Anecdote from "./pages/anecdote";

function App() {
  const [notification, setNotification] = useState("");
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  function addNew(anecdote) {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    displayNotification(`A new anecdote ${anecdote.content} was created!`);
  }
  function anecdoteLoader({ params }) {
    return anecdotes.find((anecdote) => anecdote.id === Number(params.id));
  }
  function displayNotification(message) {
    setNotification(message);
    setTimeout(() => {
      setNotification("");
    }, 5000);
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root notification={notification} />,
      children: [
        {
          index: true,
          element: <Home anecdotes={anecdotes} />,
        },
        {
          path: "anecdotes/:id",
          element: <Anecdote />,
          loader: anecdoteLoader,
        },
        { path: "create", element: <Create addNew={addNew} /> },
        { path: "about", element: <About /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
