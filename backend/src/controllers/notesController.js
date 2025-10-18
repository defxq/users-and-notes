import Note from "../model/Note.js";
import mongoose from "mongoose";

const getAllNotes = async (_, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (err) {
        res.status(400).json({ message: "Something went wrong in notesController" });
    }
};

const getNoteById = async (req, res) => {
    try {
        if (!mongoose.isObjectIdOrHexString(req.params.id)) return res.status(400).json({ message: "requested note not found" });
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(400).json({ message: "requested note not found" });
        res.status(200).json(note);
    } catch (err) {
        res.status(400).json({ message: "Something went wrong in notesController" });
    }
};


const createNewNote = async (req, res) => {
    try {
        if (!req?.body?.title || !req?.body?.content) return res.status(400).json({ message: "Both title and content are required to create new note" }); 
        const newNote = await Note.create({ title: req.body.title, content: req.body.content });
        if (!newNote) return res.status(400).json({ message: "failed to create new note" });
        res.status(201).json(newNote);
    } catch (err) {
        res.status(400).json({ message: "Something went wrong in notesController" });
    }
};


const updateNote = async (req, res) => {
    try {
        if (!mongoose.isObjectIdOrHexString(req.params.id)) return res.status(400).json({ message: "requested note not found" });
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(400).json({ message: "requested note not found" });
        if (req?.body?.title) note.title = req.body.title;
        if (req?.body?.content) note.content = req.body.content;
        const updated = await note.save();
        if (!updated) return res.status(400).json({ message: "failed to update note"});
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ message: "Something went wrong in notesController" });
    }
};


const deleteNote = async (req, res) => {
    try {
        if (!mongoose.isObjectIdOrHexString(req.params.id)) return res.status(400).json({ message: "requested note not found" });
        const isDeleted = await Note.findByIdAndDelete(req.params.id);
        if (!isDeleted) return res.status(400).json({ message: "note not found to delete" });
        res.status(204).json({ message: "note deleted successful" });
    } catch (err) {
        res.status(400).json({ message: "Something went wrong in notesController" });
    }
};


export {
    getAllNotes,
    getNoteById,
    createNewNote,
    updateNote,
    deleteNote
};