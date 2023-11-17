import { Mark } from "../models/mark.js";

export function getAllUserDocs(req){
             return Mark.find({user:req.user._id}).populate( "user","title doc");               

}

