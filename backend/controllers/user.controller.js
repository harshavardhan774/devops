import User from "../model/user.model.js";

export const getUsersForSidebar = async (req,res) => {
    try {
        const loggedInUser = req.user._id;
        //below is mdb query that gets all users in db by id attribute and exclude loggedin user and users passwd
        const filteredUsers = await User.find({_id: {$ne: loggedInUser} }).select("-password");

        res.status(200).json(filteredUsers);
        
    } catch (error) {
        res.status(500).json({error: "Internal server error"});
        console.log("Error in getuserforsiderbar controller", error.message);
    }
}