import jwt from "jsonwebtoken";
import User from "../model/User.js";

const refreshController = async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const foundUser = await User.findOne({refreshToken});
    if (!foundUser) return res.sendStatus(401);
    const id = foundUser._id;
    const username = foundUser.username;
    const roles = Object.values(foundUser.roles);
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(401);
            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        id,
                        username,
                        roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "10m" }
            );
            res.status(200).json(accessToken);
            next();
        }
    );
};


export default refreshController;