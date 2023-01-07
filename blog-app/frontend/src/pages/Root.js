import { Outlet } from "react-router-dom";
import Notification from "../components/Notification";
import LoginForm from "../components/LoginForm";
import { useSelector } from "react-redux";
import { selectUser } from "../reducers/userSlice";
import Navigation from "../components/Navigation";

function Root() {
  const user = useSelector(selectUser);

  return (
    <div>
      <Navigation user={user} />

      <h1>Blog App</h1>

      <Notification />

      {user === null ? <LoginForm /> : <Outlet />}
    </div>
  );
}

export default Root;
