import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";

import { createNotification } from "./reducers/notificationSlice";
import {
  selectUser,
  previousUserLogin,
  userLogout,
} from "./reducers/userSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(previousUserLogin());
  }, [dispatch]);

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
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <>
          <p>{user.name} logged in</p>
          <button className="logout-btn" onClick={logoutUser}>
            Logout
          </button>

          <BlogList user={user} />
        </>
      )}
    </div>
  );
};

export default App;
