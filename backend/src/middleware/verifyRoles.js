const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        console.log("passing through verify roles")
        const rolesList = [...allowedRoles];
        const result = req.roles.map(role => rolesList.includes(role)).find(val => val === true);
        if (!result) return res.sendStatus(409);
        next();
    };
};


export default verifyRoles;