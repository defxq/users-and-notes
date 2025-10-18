import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import root from "./routes/root.js";
import errorHandler from "./middleware/errorHandler.js";
import reqLog from "./middleware/reqLog.js";
import usersRoute from "./routes/api/usersRoute.js";
import notesRoute from "./routes/api/notesRoute.js";
import corsOption from "./config/corsOption.js";
import verifyJWT from "./middleware/verifyJWT.js";
import credentials from "./middleware/credentials.js";
import refreshController from "./controllers/refreshController.js";
const app = express();
const PORT = process.env.PORT || 5001;

app.use(reqLog);

//
app.use(credentials);
app.use(cors(corsOption));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//
app.use("/", root);
app.use("/api/users", usersRoute);
app.use("/api/refresh", refreshController);
app.use(verifyJWT);
app.use("/api/notes", notesRoute);


app.all(/.*/, (_, res) => {
    res.status(404).json({ message: "Page not found" });
});


app.use(errorHandler);
const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => console.log(`Now listening PORT:${PORT}`));
};

startServer();