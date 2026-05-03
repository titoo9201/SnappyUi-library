import {userModel} from "../models/user.model.js";
import {componentModel} from "../models/component.model.js"
export const saveComponent= async(req,res)=>{
try{
    const {name,code,props}=req.body
    const user = await userModel.findById(req.userId)
    if(!user){
        return res.status(404).json({
            message:"User not found"
        })
    }
    if(user.role==="admin"){
        const exisitingComponent = await componentModel.findOne({
            name,
            visibility:"public",
            
        })
        if(exisitingComponent){
            return res.status(400).json({
                message:"Admin cannot create duplicate public component name"
            })
        }
    }
    if(user.role==="user"){
        const exisitingComponent = await componentModel.findOne({
            name,
            owner:req.userId,
        })
        if(exisitingComponent){
            return res.status(400).json({
                message:"you have already created a component with the same name, please choose a different name"
            })
        }
    }
    const newComponent = await componentModel.create({
        name,
        code,
        props,
        owner:req.userId,

    })
    return res.status(201).json(newComponent)
}catch(err){
    return res.status(500).json({
        message:"Internal Server Error",
        error:err.message
    })
}
}