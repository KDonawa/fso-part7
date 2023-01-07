import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { previousUserLogin } from "./reducers/userSlice";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Root from "./pages/Root";
import Users from "./pages/Users";
import User, { loader as userLoader } from "./pages/User";
import Blog from "./pages/Blog";
import { initializeBlogs } from "./reducers/blogSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "users", element: <Users /> },
      { path: "users/:id", element: <User />, loader: userLoader },
      { path: "blogs/:id", element: <Blog /> },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(previousUserLogin());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
