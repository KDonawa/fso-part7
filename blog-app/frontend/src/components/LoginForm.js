import React, { useState } from "react";

function LoginForm({ loginUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const loggedIn = await loginUser({ username, password });

    if (loggedIn) {
      //reset form
      setUsername("");
      setPassword("");
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
