import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import blogService from "./services/blogs";
import loginService from "./services/login";

import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";

import { createNotification } from "./reducers/notificationSlice";

const App = () => {
  const dispatch = useDispatch();
  const storageKey = "blogAppUser";
  const [user, setUser] = useState(null);

  useEffect(() => {
    const blogAppUserJSON = window.localStorage.getItem(storageKey);
    if (blogAppUserJSON) {
      const user = JSON.parse(blogAppUserJSON);
      setUser(user);
      blogService.setAuth(user.token);
    }
  }, []);

  async function loginUser(credentials) {
    try {
      const user = await loginService.login(credentials);
      // save user credentials
      setUser(user);
      blogService.setAuth(user.token);
      window.localStorage.setItem(storageKey, JSON.stringify(user));

      dispatch(
        createNotification({
          message: "You have successfully logged in",
          type: "success",
        })
      );

      return true;
    } catch (error) {
      dispatch(
        createNotification({
          message: "Invalid username or password",
          type: "error",
        })
      );

      return false;
    }
  }
  function logoutUser() {
    setUser(null);
    window.localStorage.removeItem(storageKey);

    dispatch(
      createNotification({
        message: "You have successfully logged out",
        type: "success",
      })
    );
  }

  return (
    <div>
      <Notification />
      {user === null ? (
        <LoginForm loginUser={loginUser} />
      ) : (
        <>
          <p>{user.name} logged in</p>
          <button className="logout-btn" onClick={logoutUser}>
            Logout
          </button>

          <BlogList user={user} />
        </>
      )}
    </div>
  );
};

export default App;
