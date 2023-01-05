import { useState, useEffect } from "react";
import BlogList from "./components/BlogList";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";

const App = () => {
  const storageKey = "blogAppUser";
  const [notification, setNotification] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const blogAppUserJSON = window.localStorage.getItem(storageKey);
    if (blogAppUserJSON) {
      const user = JSON.parse(blogAppUserJSON);
      setUser(user);
      blogService.setAuth(user.token);
    }
  }, []);

  function displayNotification(notification, timeoutSeconds = 5) {
    setNotification(notification);
    setTimeout(() => setNotification(null), timeoutSeconds * 1000);
  }

  async function loginUser(credentials) {
    try {
      const user = await loginService.login(credentials);
      // save user credentials
      setUser(user);
      blogService.setAuth(user.token);
      window.localStorage.setItem(storageKey, JSON.stringify(user));

      displayNotification({
        message: "You have successfully logged in",
        type: "success",
      });

      return true;
    } catch (error) {
      displayNotification({
        message: "Invalid username or password",
        type: "error",
      });

      return false;
    }
  }
  function logoutUser() {
    setUser(null);
    window.localStorage.removeItem(storageKey);

    displayNotification({
      message: "You have successfully logged out",
      type: "success",
    });
  }

  return (
    <div>
      {notification && <Notification notification={notification} />}
      {user === null ? (
        <LoginForm loginUser={loginUser} />
      ) : (
        <>
          <p>{user.name} logged in</p>
          <button className="logout-btn" onClick={logoutUser}>
            Logout
          </button>

          <BlogList user={user} notify={displayNotification} />
        </>
      )}
    </div>
  );
};

export default App;
