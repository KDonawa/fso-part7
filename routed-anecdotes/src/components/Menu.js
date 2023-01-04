import { NavLink } from "react-router-dom";

function Menu() {
  const padding = {
    paddingRight: 5,
  };
  return (
    <nav>
      <NavLink style={padding} to="/">
        anecdotes
      </NavLink>
      <NavLink style={padding} to="/create">
        create new
      </NavLink>
      <NavLink style={padding} to="/about">
        about
      </NavLink>
    </nav>
  );
}

export default Menu;
