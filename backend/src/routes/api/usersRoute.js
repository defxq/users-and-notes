import express from "express";
const router = express.Router();
import authController from "../../controllers/authController.js";
import logoutController from "../../controllers/logoutController.js";
import registerController from "../../controllers/registerController.js";

router.post("/register", registerController);
router.post("/login", authController);
router.get("/logout", logoutController);

export default router;