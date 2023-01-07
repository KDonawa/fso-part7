import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNotification } from "../hooks";
import { userLogin } from "../reducers/userSlice";
import loginService from "../services/login";
import Button from "./Button";
import Form from "react-bootstrap/Form";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const notify = useNotification();

  const dispatch = useDispatch();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      dispatch(userLogin(user));

      notify({
        message: "You have successfully logged in",
        type: "success",
      });
    } catch (error) {
      notify({
        message: "Invalid username or password",
        type: "error",
      });
    }
  }

  return (
    <>
      <h3>Log in</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            id="username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Subscribe to newsletter!" />
        </Form.Group>

        <Button className="login-btn" type="submit">
          Login
        </Button>
      </Form>
    </>
  );
}

export default LoginForm;
