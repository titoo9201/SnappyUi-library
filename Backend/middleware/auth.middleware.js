import jwt from "jsonwebtoken";

const isAuth =  async (req, res, next) => {
    try {
        
        let {token} = req.cookies;
        if (!token) {
            return res.status(400).json({
                message: "user does not have token"
            })
        }
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({
                message:"user does not have valid token"
            })
        }
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
        
    }
}

export default isAuth;