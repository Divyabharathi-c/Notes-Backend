import { ObjectId } from "bson";
import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    date: { type: String, required: true },
    title: { type: String, required: true },
    document: { type: String, required: true },
    user:{type:ObjectId, ref:"Users"}
});

const Note = mongoose.model("Notes",noteSchema);

export { Note };