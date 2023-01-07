import { useDispatch } from "react-redux";
import { useNotification } from "../hooks";
import { userLogout } from "../reducers/userSlice";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "./Button";
import { LinkContainer } from "react-router-bootstrap";

function Navigation({ user }) {
  const dispatch = useDispatch();
  const notify = useNotification();

  function logoutUser() {
    dispatch(userLogout());

    notify({
      message: "You have successfully logged out",
      type: "success",
    });
  }
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand>Blog App</Navbar.Brand>
        <Nav className="me-auto">
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/users">
            <Nav.Link>Users</Nav.Link>
          </LinkContainer>
        </Nav>

        {user && (
          <>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>Signed in as: {user.name}</Navbar.Text>

              <Button className="logout-btn mx-2" onClick={logoutUser}>
                Logout
              </Button>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
}

export default Navigation;
