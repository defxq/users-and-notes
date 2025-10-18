import allowedOrigins from "../config/allowedOrigins.js";

const credentials = (req, res, next) => {
    if (allowedOrigins.includes(req.headers.origin)) {
        res.header("Access-Control-Allow-Credentials", true);
    }
    next();
};

export default credentials;