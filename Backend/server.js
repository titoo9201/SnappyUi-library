import express from "express"
import dotenv from "dotenv"
import {connectDB} from "./configs/db.js"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"
import cors from "cors"

dotenv.config()
connectDB()



const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors(
   { origin:"http://localhost:5173",
    credentials:true

}
))
app.use("/api/auth",authRouter)
app.use("/api/users", userRouter)
app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Welcome to SnappyUI Backend"
    })
})

app.listen(process.env.PORT,()=>{
    console.log(`server is runnig on the port:${process.env.PORT}`);
    
})
