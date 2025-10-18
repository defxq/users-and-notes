import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";


const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        const url = "http://localhost:5001/api/users/register";
        try {
            if (!username || !password) {
                toast.error("Please provide both username and password");
                return;
            }
            setLoading(true);
            const res = await fetch(url, {
                method: "POST", 
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
            if (!res.ok) {
                throw new Error("error failed to fetch");
            }
            toast.success("Sign-up Successful");
            navigate("/notes");
        } catch (err) {
            toast.error("Sign-up failed");
            console.log("error occured while fetching", err);
        } finally {
            setLoading(false);
        }
    };

  return (
    <div>
        <h2>Sign-Up</h2>
        <form action="" onSubmit={handleRegister}>
            <label htmlFor="username">Username:</label>
            <input
            id="username"
            type="text"
            value={username}
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <label htmlFor="password">Password:</label>
            <input
            id="password"
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button type="submit" disabled={loading}>
                {loading ? "Signing Up..." : "Sign Up"}
            </button>
        </form>
    </div>
  )
}
export default RegisterPage