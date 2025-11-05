import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: '15d'
    });
    //in curly brackets we set options 
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, //ms
        httpOnly: true,
        sameSite: "strict", //prevent from csrf attacks
        secure: process.env.NODE_ENV !== "development"
    });
}

export default generateTokenAndSetCookie;