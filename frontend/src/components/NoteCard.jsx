import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";

const NoteCard = ({ note, notes, setNotes }) => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleDelete = async (e) => {
        e.preventDefault();
        const noteId = note._id;
        const url = "http://localhost:5001/api/notes/" + noteId;
        try {
            setLoading(true);
            const res = await fetch(url, {
                method: "DELETE", 
                headers: { "Content-Type": "application/json" }
            });
            if (!res.ok) {
                toast.error("failed to delete note");
                setErrorMessage("Failed to create note");
                throw new Error("error failed to fetch");
            } else {
                setErrorMessage(null);
            }
            setNotes((prev) => prev.filter(value => value._id !== noteId));
            toast.success("Note Deleted Successful");

        } catch (err) {
            toast.error("failed to delete note");
            console.log("error occured while fetching", err);
        } finally {
            setLoading(false);
        }
    };


  return (
    <div className="note-card">
        <Link to={`/${note._id}`}>
            <div>
                <h3>{note.title}</h3>
            </div>
            <div>
                <p>{note.content.length < 24 ? note.content : note.content.slice(0, 25) + "..."}</p>
            </div>
            <div>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </Link>
    </div>
  )
}
export default NoteCard