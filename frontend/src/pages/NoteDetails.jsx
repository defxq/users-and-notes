import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const NoteDetails = () => {
    const [note, setNote] = useState({
        title: "",
        content: ""
    });
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    
    useEffect(() => {
        const fetchNote = async () => {
            const url = "http://localhost:5001/api/notes/" + id
            const bearerToken = `Bearer ${localStorage.getItem("accessToken")}`
            try {
                setFetchLoading(true);
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
                }
                setNote(data);
            } catch (err) {
                toast.error("failed to fetch note");
                console.log("error occured while fetching", err);
            } finally {
                setFetchLoading(false);
            }
        };
        fetchNote();
    }, []);

    const updateNote = async (newNote) => {
        const url = "http://localhost:5001/api/notes/" + id;
        try {
            if (!note?.title || !note?.content) {
                toast.error("Please provide both title and content");
                return;
            }
            setLoading(true);
            const res = await fetch(url, {
                method: "PUT", 
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newNote)
            });
            if (!res.ok) {
                toast.error("failed to update note");
                throw new Error("error failed to fetch");
            }
            toast.success("Note Updated Successfully");
            navigate("/notes");
        } catch (err) {
            toast.error("failed to update note");
            console.log("error occured while fetching", err);
        } finally {
            setLoading(false);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        updateNote(note);
    };

    const handleDelete = async () => {
        const url = "http://localhost:5001/api/notes/" + id;
        try {
            setLoading(true);
            const res = await fetch(url, {
                method: "DELETE", 
                headers: { "Content-Type": "application/json" }
            });
            if (!res.ok) {
                toast.error("failed to delete note");
                throw new Error("error failed to fetch");
            }
            toast.success("Note Deleted Successful");
            navigate("/notes");
        } catch (err) {
            toast.error("failed to delete note");
            console.log("error occured while fetching", err);
        } finally {
            setLoading(false);
        }
    };

    if (fetchLoading) return (
        <p>Fetching Note...</p>
    )

  return (
    <div className="createNote-card">
        <form action="" onSubmit={handleSubmit}>
            <div>
                <h4>Title</h4>
                <input
                type="text"
                value={note.title}
                onChange={(e) => setNote((prev) => { return {...prev, title: e.target.value }})}
                />
            </div>
            <div>
                <h4>Content</h4>
                <textarea
                type="text"
                value={note.content}
                onChange={(e) => setNote((prev) => { return {...prev, content: e.target.value }})}
                ></textarea>
            </div>
            <button type="submit" disabled={loading}>
                {loading ? "Updating Note" : "Update Note"}
            </button>
            
            <button type="button" onClick={handleDelete} disabled={loading}>
                {loading ? "deleting Note" : "Delete"}
            </button>
        </form>
    </div>
  )
}
export default NoteDetails