import { createSlice } from "@reduxjs/toolkit";

const initialState = null;
let timeoutID = undefined;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (_, action) => action.payload,
    clearNotification: () => initialState,
  },
});

const { setNotification, clearNotification } = notificationSlice.actions;

export const selectNotification = (state) => state.notification;

export const createNotification =
  (notification, durationInSec = 5) =>
  (dispatch) => {
    if (timeoutID) clearTimeout(timeoutID);

    dispatch(setNotification(notification));
    timeoutID = setTimeout(
      () => dispatch(clearNotification()),
      durationInSec * 1000
    );
  };

export default notificationSlice.reducer;
