import NoteNav from "../components/NoteNav";
import { useState, useEffect } from "react";
import NoteCard from "../components/NoteCard";
import toast from "react-hot-toast";

const Notes = () => {
    const [loading, setLoading] = useState(false);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            const url = "http://localhost:5001/api/notes";
            const bearerToken = `Bearer ${localStorage.getItem("accessToken")}`
            try {
                setLoading(true);
                const res = await fetch(url, {
                    headers: { "authorization":  bearerToken }
                });
                const data = await res.json();
                if (!res.ok) {
                    const fetchRefresh = await fetch("http://localhost:5001/api/refresh");
                    if (!fetchRefresh.ok) {
                        throw new Error("error failed to fetch refresh");
                    }
                    const reFetch = await fetch(url, {
                        headers: { "authorization":  bearerToken }
                    });
                    if (!reFetch.ok) {
                        throw new Error("error failed to refetch");
                    }
                    throw new Error("error failed to fetch");
                }
                setNotes([...data]);
            } catch (err) {
                toast.error("failed to fetch note");
                console.log("error occured while fetching", err);
            } finally {
                setLoading(false);
            }
        };
        fetchNotes();
    }, []);

    

  return (
    <div>
        <NoteNav />
        {notes.map(note => (
            <NoteCard
            key={note.title}
            note={note}
            notes={notes}
            setNotes={setNotes}
            />
        ))}
        {!notes.length && (
            <div>
                Theres no notes to display. Please create more
            </div>
        )}
    </div>
  )
}
export default Notes