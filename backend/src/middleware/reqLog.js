import logHandler from "../utils/logHandler.js";

const reqLog = (req, _, next) => {
    logHandler(`${req.method}\t${req.headers.origin}`, "reqLog.txt");
    console.log(`${req.method}\t${req.url}`);
    next();
};

export default reqLog;