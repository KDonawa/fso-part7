import { Outlet } from "react-router-dom";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import Notification from "../components/Notification";

function Root({ notification }) {
  return (
    <>
      <h1>Software Anecdotes</h1>
      <Menu />
      <Notification notification={notification} />
      <Outlet />
      <Footer />
    </>
  );
}

export default Root;
