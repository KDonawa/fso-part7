import { selectNotification } from "../reducers/notificationSlice";
import { useSelector } from "react-redux";

function Notification() {
  const notification = useSelector(selectNotification);

  return notification ? (
    <div className={notification.type}>{notification.message}</div>
  ) : null;
}

export default Notification;
