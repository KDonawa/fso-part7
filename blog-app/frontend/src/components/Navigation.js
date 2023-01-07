import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNotification } from "../hooks";
import { userLogout } from "../reducers/userSlice";

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
