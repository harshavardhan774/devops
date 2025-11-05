import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const protectRoute = async (req,res,next) => {
    try {
        const token = req.cookies.jwt;

        if(!token) {
            return res.status(401).json({error: "Unauthorized - No Token Provided."});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);//verify token

        if (!decoded) {
            return res.status(401).json({error: "Unauthorized - Invalid Token."});
        }

        const user= await User.findById(decoded.userId).select("-password");

        if(!user) {
            return res.status(404).json({error: "User not found."});
        }
        
        req.user = user;
        next(); //goes to execute sendmessage function

    } catch (error) {
        res.status(500).json({error: "internal server error."});
        console.log("Error in protectRoute middleware", error.message);
    }
}

export default protectRoute;