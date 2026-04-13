import * as userModel from "../models/user.model.js"
import { generateToken } from "../configs/token.js"

export const registerUser = async(req,res)=>{
   try {
     const {name,email}=req.body
    if(!name || !email){
        return res.status(400).json({
            message:"Name and Email are required"
        })
    }
    const existingUser = await userModel.findOne({email})
    if(existingUser){
        return res.status(400).json({
            message:"User with this email already exists"
        })
    }
    const newUser = new userModel({name,email})
    const token = await generateToken(newUser._id)
    res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        sameSite:"strict",
        maxAge:24*60*60*1000
    })
    return res.status(201).json({
        message:"User registered successfully",
        user:newUser,
        token
    })
   } catch (error) {
 return res.status(500).json({
    message:"Internal Server Error",
    error:error.message
})
    
   }

}

export const logoutUser = async(req,res)=>{
    try {
        await res.clearCookie("token",{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
        })
        return res.status(200).json({
            message:"User logged out successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        })
    }
}