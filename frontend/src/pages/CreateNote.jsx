import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const CreateNote = () => {
    const [note, setNote] = useState({
        title: "",
        content: ""
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const createNote = async (newNote) => {
        const url = "http://localhost:5001/api/notes";
        try {
            if (!note?.title || !note?.content) {
                toast.error("Please provide both title and content");
                return;
            }
            setLoading(true);
            const bearerToken = `Bearer ${localStorage.getItem("accessToken")}`
            const res = await fetch(url, {
                method: "POST", 
                headers: { 
                    "Content-Type": "application/json",
                    "authorization":  bearerToken
                },
                body: JSON.stringify(newNote)
            });
            if (!res.ok) {
                const fetchRefresh = await fetch("http://localhost:5001/api/refresh");
                if (!fetchRefresh.ok) {
                    throw new Error("error failed to fetch refresh");
                }
                const reFetch = await fetch(url, {
                    headers: { "authorization":  bearerToken }
                });
                if (!reFetch.ok) {
                    setErrorMessage("Failed to create note");
                    throw new Error("error failed to refetch");
                }
            } else {
                setErrorMessage(null);
            }
            toast.success("New Note Created Successful");
            navigate("/notes");
        } catch (err) {
            toast.error("failed to create note");
            console.log("error occured while fetching", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createNote(note);
    };
    

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
                {loading ? "Creating Note" : "Create Note"}
            </button>
        </form>

    </div>
  )
}
export default CreateNote