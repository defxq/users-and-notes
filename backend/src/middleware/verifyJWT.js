import jwt from "jsonwebtoken";

const verifyJWT = async (req, res, next) => {
    const authHeader = req?.headers?.authorization;
    console.log("checking access token");
    if (!authHeader) return res.sendStatus(403);
    const token = authHeader.split(" ")[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403);
            req.username = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            req.id = decoded.UserInfo.id;
            next();
        }
    );
};


export default verifyJWT;