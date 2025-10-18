import { Link, useNavigate, NavLink } from "react-router";


const NavBar = () => {
  return (
    <nav className="" >
        <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
        >
            🏠 Home Page
        </NavLink>
        <NavLink
            to="/notes"
            className={({ isActive }) => (isActive ? "active" : "")}
        >
            📝 Notes
        </NavLink>
        <NavLink
            to="/settings"
            className={({ isActive }) => (isActive ? "active" : "")}
        >
            ⚙️ Settings
        </NavLink>
        <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "active" : "")}
        >
            🔑 Log-In
        </NavLink>
        <NavLink
            to="/register"
            className={({ isActive }) => (isActive ? "active" : "")}
        >
            🔏 Sign-Up
        </NavLink>
        <NavLink
            to="/logout"
            className={({ isActive }) => (isActive ? "active" : "")}
        >
            🔓 Log out
        </NavLink>
    </nav>
  )
}

export default NavBar