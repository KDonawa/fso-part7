import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createNotification } from "../reducers/notificationSlice";
import { userLogout } from "../reducers/userSlice";

function Navigation({ user }) {
  const dispatch = useDispatch();

  function logoutUser() {
    dispatch(userLogout());

    dispatch(
      createNotification({
        message: "You have successfully logged out",
        type: "success",
      })
    );
  }
  return (
    <nav style={{ backgroundColor: "lightgrey" }}>
      <div>
        <Link to="/">Blogs</Link> <Link to="/users">Users</Link>{" "}
        {user && (
          <>
            <span>{user.name} logged in</span>{" "}
            <button className="logout-btn" onClick={logoutUser}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
