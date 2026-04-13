import mongoose from "mongoose";
import { type } from "node:os";

const userSchema = new mongoose.Schema({
 name:{
    type:String,
    required:[true,"Name is required"]

 },
 email:{
    type:String,
    required:[true,"Email is required"],
    unique:true
 },
 role:{
    type:String,
    enum:["user","admin"],
    default:"user"
 },
 credits:{
    type:Number,
    default:350,
    

 }

},{timestamps:true});

export const userModel = new mongoose.model("User",userSchema);