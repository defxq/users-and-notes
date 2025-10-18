import express from "express";
const router = express.Router();
import { getAllNotes, getNoteById, createNewNote, updateNote, deleteNote } from "../../controllers/notesController.js";
import rolesList from "../../config/rolesList.js";
import verifyRoles from "../../middleware/verifyRoles.js";

router.get("/", verifyRoles(rolesList.User, rolesList.Admin), getAllNotes);
router.get("/:id", verifyRoles(rolesList.User, rolesList.Admin), getNoteById);
router.post("/", verifyRoles(rolesList.User, rolesList.Editor, rolesList.Admin), createNewNote);
router.put("/:id", verifyRoles(rolesList.Editor, rolesList.Admin), updateNote);
router.delete("/:id", verifyRoles(rolesList.Admin), deleteNote);

export default router;