import { selectNotification } from "../reducers/notificationSlice";
import { useSelector } from "react-redux";
import Alert from "react-bootstrap/Alert";

function Notification() {
  const notification = useSelector(selectNotification);

  if (!notification) return null;

  const variant = notification.type === "success" ? "success" : "danger";

  return (
    <Alert key={variant} variant={variant}>
      {notification.message}
    </Alert>
  );
}

export default Notification;
