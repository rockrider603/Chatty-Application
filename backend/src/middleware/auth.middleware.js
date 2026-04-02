import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


export const protectroute = async (req, res, next) => {
    try {
        //get the token from the cookies using req.cookies.nameofcookie
        const token = req.cookies.jwt;

        //check if the token exists or send a 401 error
        if (!token) {
            return res.status(401).json({ message: "token not provided" });
        }

        console.log(token)  
        //decode the cookie (compare the token to process.env.JWT_SECRET)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //decoded is an object and when its true it means that the token is valid
        if (!decoded) {
            return res.status(401).json({ message: "token invalid" });
        }
        
        // if (!decoded.userID) {
        //     if (decoded.userId === null) {
        //         return res.status(401).json({ message: "user null" });
        //     }
        //     if (decoded.userId === undefined) {

        //         return res.status(401).json({ message: "user invalid" });
        //     }
        // }
        
        //now we extract the user from the decoded without the password
        const user = await User.findById(decoded.UserId).select("-password");

        //if the user exists then we send the next() function to be executed.
        if (!user) {
            return res.status(404).json({ message: "user doesnt exist" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protective route (middleware)",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }

}