import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNotification } from "../reducers/notificationSlice";
import { userLogin } from "../reducers/userSlice";
import loginService from "../services/login";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      dispatch(userLogin(user));

      dispatch(
        createNotification({
          message: "You have successfully logged in",
          type: "success",
        })
      );
    } catch (error) {
      dispatch(
        createNotification({
          message: "Invalid username or password",
          type: "error",
        })
      );
    }
  }

  return (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            required
          />
        </label>
        <br></br>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            required
          />
        </label>
        <br></br>
        <button className="login-btn" type="submit">
          Login
        </button>
      </form>
    </>
  );
}

export default LoginForm;
