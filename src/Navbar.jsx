import { NavLink } from "react-router-dom";

function Navbar() {
  const linkStyle = ({ isActive }) => ({
    color: isActive ? "orange" : "white",
    fontWeight: isActive ? "bold" : "normal",
    marginRight: "20px",
    textDecoration: "none"
  });

  return (
    <nav
      style={{
        backgroundColor: "#222",
        padding: "15px",
        display: "flex",
        alignItems: "center"
      }}
    >
      <h2 style={{ color: "white", marginRight: "30px" }}>
        Doctor Discovery
      </h2>

      <NavLink to="/" end style={linkStyle}>
        Home
      </NavLink>

      <NavLink to="/doctors" style={linkStyle}>
        Doctors
      </NavLink>

      <NavLink to="/register" style={linkStyle}>
        Register
      </NavLink>
    </nav>
  );
}

export default Navbar;
