import logHandler from "../utils/logHandler.js";

const errorHandler = (err, req, res, next) => {
    logHandler(`${err.message}`, "errLog.txt");
    console.log(err.message);
};

export default errorHandler;