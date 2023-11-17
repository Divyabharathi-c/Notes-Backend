import express from 'express';
import { getAllUserDocs } from '../controllers/markcontrol.js';
import { Mark } from '../models/mark.js';

const route = express.Router();

// Get all user documents
route.get('/all', async (req, res) => {
    try {
        const mark = await getAllUserDocs(req);
        if (!mark || mark.length <= 0) {
            return res.status(404).json({ message: "Content not available" });
        }
        res.status(200).json(mark);
    } catch (error) {
        console.error(error); // Use console.error for logging errors
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Add a new user document
route.post('/add', async (req, res) => {
    try {
        const { title, document } = req.body; // Destructure title and doc from req.body

        const newdoc = new Mark({ title, document, user: req.user._id }); // Simplify document creation

        await newdoc.save();

        res.status(201).json({ message: "Document added successfully", doc: newdoc }); // Return the added document in the response
    } catch (error) {
        console.error(error); // Use console.error for logging errors
        res.status(500).json({ error: "Internal Server Error" }); // Improved error message
    }
});

route.get('/edit/:id', async (req, res) => {
    try {
        const editdata = await Mark.findById(req.params.id);
        if (editdata) {
            res.status(200).json(editdata);
        } else {
            res.status(404).json({ message: 'Data not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// Edit a user document
route.put('/edit/:id', async (req, res) => {
    try {
        const { title, document } = req.body; // Destructure title and doc from req.body
        const updatedDoc = await Mark.findByIdAndUpdate(req.params.id, { title, document }, { new: true });
        res.status(200).json({ message: "Document Update Successful", updatedDoc });
    } catch (error) {
        console.error(error); // Use console.error for logging errors
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete a user document
route.delete('/delete/:id', async (req, res) => {
    try {
        const deletedDoc = await Mark.findByIdAndDelete(req.params.id);
        if (!deletedDoc) {
            return res.status(404).json({ message: "Document not found" });
        }
        res.status(200).json({ message: "Document deleted successfully", deletedDoc });
    } catch (error) {
        console.error(error); // Use console.error for logging errors
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export const markRouter = route;
