import { NavLink } from "react-router"; 
import SearchNote from "./SearchNote";

const NoteNav = () => {
  return (
    <div className="note-nav">
        <SearchNote />
      <NavLink
        to="/createNote"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        New Note
      </NavLink>
    </div>
  );
};

export default NoteNav;
