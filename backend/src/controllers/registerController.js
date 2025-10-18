import User from "../model/User.js";
import bcrypt from "bcrypt";

const registerController = async (req, res) => {
    const { username, password } = req.body;
    // console.log(username, password);
    if (!username || !password) return res.status(400).json({ message: "Both username and password are required" });
    try {
        const duplicate = await User.findOne({username});
        if (duplicate) return res.sendStatus(409);//conflict
        const hashedpwd = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hashedpwd });
        if (!newUser) return res.status(400).json({message: "Failed to create user" });
        res.status(201).json(newUser);        
    } catch (err) {
        console.error(err);
    }
};

export default registerController;