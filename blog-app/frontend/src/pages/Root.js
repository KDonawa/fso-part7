// import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Notification from "../components/Notification";
import LoginForm from "../components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, userLogout } from "../reducers/userSlice";
import { createNotification } from "../reducers/notificationSlice";

function Root() {
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

  const user = useSelector(selectUser);

  return (
    <div>
      <h1>Blog App</h1>

      <Notification />

      {user === null ? (
        <LoginForm />
      ) : (
        <>
          <p>{user.name} logged in</p>

          <button className="logout-btn" onClick={logoutUser}>
            Logout
          </button>

          <Outlet />
        </>
      )}
    </div>
  );
}

export default Root;
