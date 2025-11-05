import bcrypt from "bcryptjs";
import User from "../model/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup= async (req,res) => {
    try {
        const {fullName, username, password,confirmPassword, gender} = req.body;
        if (password != confirmPassword) {
            return res.status(400).json({error: "password do not match."});
        }

        const user = await User.findOne({username});//checks user in db

        if (user) {
            return res.status(400).json({error: "Username already exists."})
        }

        //hash password logic.
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //giving profilepic to users.
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`
        //create new user 
        const newUser= new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic : gender === "male" ? boyProfilePic : girlProfilePic

        });

        if (newUser) {
            //generate JWT tokens
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save(); //saving new user in db

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            });
        } else {
            res.status(400).json({error: "Invalid user data."})
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error: "Internal Sever Error.."})
    }
}

export const login= async (req,res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");//checks input passwd with passwd in db by doing bcrpt again to match

        if (!user || !isPasswordCorrect){
            return res.status(400).json({error: "Invalid username or password."});
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(201).json({
            _id : user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        });

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({error: "Internal Sever Error.."})
    }
}

export const logout= (req,res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Logged Out successfully"})
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({error: "Internal Sever Error.."})
    }
}