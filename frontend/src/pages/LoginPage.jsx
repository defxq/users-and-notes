import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";


const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        const url = "http://localhost:5001/api/users/login";
        try {
            if (!username || !password) {
                toast.error("Please provide both username and password");
                return;
            }
            setLoading(true);
            const res = await fetch(url, {
                method: "POST", 
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
                credentials: "include"
            });
            if (!res.ok) {
                throw new Error("error failed to fetch");
            }
            const accessToken = await res.json();
            localStorage.setItem("accessToken", accessToken)
            toast.success("Logged-In Successful");
            navigate("/");
        } catch (err) {
            toast.error("Log-In failed");
            console.log("error occured while fetching", err);
        } finally {
            setLoading(false);
        }
    };

  return (
    <div>
        <h2>Log-In</h2>
        <form action="" onSubmit={handleLogin}>
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
                {loading ? "Logging In..." : "Log In"}
            </button>
        </form>
    </div>
  )
}
export default LoginPage