import User from "../model/User.js";

const logoutController = async (req, res) => {
    console.log("trying to log out")
    const cookies = req.cookies;
    const refreshToken = cookies.refreshToken;
    console.log(refreshToken);
    if (!refreshToken) return res.sendStatus(204);
    const foundUser = await User.findOne({refreshToken});
    if (!foundUser) {
        res.clearCookie("refreshToken", { httpOnly: true, secure: false, sameSite: "None" });
        return res.sendStatus(204);
    }
    console.log(2);
    res.clearCookie("refreshToken", { httpOnly: true, secure: false, sameSite: "None" });
    foundUser.refreshToken = "";
    console.log(3);
    await foundUser.save();
    return res.sendStatus(204);
};


export default logoutController;