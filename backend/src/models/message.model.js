import mongoose from "mongoose";


//we are creating a new schema for a user to send messages 
const messageschema=new mongoose.Schema(
    {
        senderId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,

        },
        recieverId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        text:{
            type:String,
        },
        image:{
            type:String,
        }
        
    },
    //to remember when the message was created and updated
    {timestamps:true}
);

const Message= mongoose.model("Message",messageschema);
//we export this to create a model of any info(see message.controller.js line59)
export default Message;