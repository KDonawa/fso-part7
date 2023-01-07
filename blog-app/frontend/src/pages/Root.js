import { Outlet } from "react-router-dom";
import Notification from "../components/Notification";
import LoginForm from "../components/LoginForm";
import { useSelector } from "react-redux";
import { selectUser } from "../reducers/userSlice";
import Navigation from "../components/Navigation";
import Container from "react-bootstrap/Container";

function Root() {
  const user = useSelector(selectUser);

  return (
    <div>
      <Navigation user={user} />

      <Container className="my-4">
        <Notification />
        {user === null ? <LoginForm /> : <Outlet />}
      </Container>
    </div>
  );
}

export default Root;
