import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";


const Logout = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleLogout = async () => {
            const url = "http://localhost:5001/api/users/logout";
            try {
                setLoading(true);
                const res = await fetch(url, {
                    credentials: "include"
                });
                if (!res.ok) {
                    throw new Error("error failed to fetch");
                }
                localStorage.clear();

                toast.success("Logged-Out Successful");
                navigate("/");
            } catch (err) {
                toast.error("failed to Logout");
                console.log("error occured while fetching", err);
            } finally {
                setLoading(false);
            }
        };
        handleLogout();
    }, []);

  return (
    <div>
        {loading ? "Logging-out..." : "log out failed"}
    </div>
  )
}
export default Logout