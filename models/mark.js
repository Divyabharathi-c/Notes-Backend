import { ObjectId } from "bson";
import mongoose from "mongoose";

const markSchema = mongoose.Schema({
    date: { type: String, required: true },
    document: { type: String, required: true },
    user:{type:ObjectId, ref:"Users"}
});

const Mark = mongoose.model("Marks",markSchema);

export { Mark };