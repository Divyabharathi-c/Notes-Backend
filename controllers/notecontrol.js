import { Note } from "../models/notes.js";

export function getAllUserDocs(req){
             return Note.find({user:req.user._id}).populate( "user","title doc");               

}

