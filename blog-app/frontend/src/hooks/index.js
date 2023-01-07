import { useDispatch } from "react-redux";
import { createNotification } from "../reducers/notificationSlice";

export function useNotification() {
  const dispatch = useDispatch();

  function notify({ message, type }) {
    dispatch(createNotification({ message, type }));
  }

  return notify;
}
