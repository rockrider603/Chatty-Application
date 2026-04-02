import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersfromSidebar = async (req, res) => {
    try {
        //get all the users except for the logged in user 
        const loggedinUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedinUserId } }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("error in getting users from sidebar", error.messsage);
        res.status(500).json({ message: "Internal Server Error" });

    }

}

export const getMessages = async (req, res) => {
    try {
        //we change the name of the dynamic id to UsertoChatId(user we're messaging) so that its easier to understand its functionality.
        const { id: UsertoChatId } = req.params;
        //get the id of the sender
        const myId = req._id;
        //in this we are asking the db to search for a message either sent by us and recieved by the user or viceversa.
        //the or statement means either of the conditions when satisfied is stored in messages.
        const messages = await Message.find({
            $or: [
                {
                    senderId: myId, recieverId: UsertoChatId
                },
                {
                    senderId: UsertoChatId, recieverId: myId
                }
            ]
        });
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in get messages controller",error.message);
        res.status(500).json({message:"Internal Server Error"}); 
    }

}

export const sendMessage=async(req,res) =>{
    try {
        //get the text and image to be input by  the user and define the sender and reciever id
        const {text,image}=req.body;
        const senderId=req.user._id;
        const recieverId=req.params;

        //if an image is present then uplaod it to cloudinary and get a url for it
        let imageurl;
        if(image){
            const uploadResponse=await cloudinary.uploader.upload(image); 
            imageurl=uploadResponse.secure_url;
        }
        //define a new message putting all the important properties(senderid, reciever id,text,image)
        const newMessage=new Message({
            senderId,
            recieverId,
            text,
            image:imageurl
        });
        //save the message
        await newMessage.save();
        //give status 201 saying message sent
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendind error",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}