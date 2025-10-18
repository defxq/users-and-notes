import { Routes, Route } from "react-router"
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import Notes from "./pages/Notes";
import UserPage from "./pages/UserPage";
import Settings from "./components/Settings";
import CreateNote from "./pages/CreateNote";
import NoteDetails from "./pages/NoteDetails";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Logout from "./pages/Logout";

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/users" element={<UserPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/createNote" element={<CreateNote />} />
        <Route path="/:id" element={<NoteDetails />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  )
}
export default App