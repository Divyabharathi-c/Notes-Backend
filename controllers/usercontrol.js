import { User } from "../models/users.js";
import jwt from "jsonwebtoken";

export function getUserMail( request){
    return User.findOne({email:request.body.email,});
}

export function getuserdetails(id){
    return User.findById(id).select('_id firstname lastname email')
}

export function generateToken(id){
    return jwt.sign({id},process.env.SecretKey)
}
