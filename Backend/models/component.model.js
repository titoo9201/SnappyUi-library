import mongoose from "mongoose"

const componentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Component name is required"]
    },
    code:{
        type:String,
        required:[true,"Component code is required"]
    },
    props:[String],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",

    },
   visibility:{
    type:String,
    enum:["public","private"],
    default:"private"
   },
   npmpackage:{
    type:String
   }
},{timestamps:true})

export const componentModel = mongoose.model("component",componentSchema)

