import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/User.js";

const authController = async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    if (!username || !password) return res.status(400).json({ message: "Both username and password are required" });
    try {
        const foundUser = await User.findOne({username});
        if (!foundUser) return res.sendStatus(401);
        const match = await bcrypt.compare(password, foundUser.password);
        if (!match) return res.status(401);
        const id = foundUser._id;
        const roles = Object.values(foundUser.roles);
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
        const refreshToken = jwt.sign(
            {id},
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
        );
        foundUser.refreshToken = refreshToken;
        await foundUser.save();

        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: "None", maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json(accessToken);        
    } catch (err) {
        console.error(err);
    }
};


export default authController;