
import {userModel} from "../models/user.model.js";
export const getCurrentUser = async(req,res)=>{
    try {
       const user = await userModel.findById(req.userId)
       if(!user)
       {
        return res.status(404).json({
            message:"User not found"
        })
       }
       return res.status(200).json({
        message:"User fetched successfully",
        user
       })

    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error",
            error: error.message
        })

    }
}