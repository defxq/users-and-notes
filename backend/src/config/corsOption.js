import allowedOrigins from "./allowedOrigins.js";

const corsOption = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Error: Blocked by Cors"));
        }
    }
};


export default corsOption;