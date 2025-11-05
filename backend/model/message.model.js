import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,//create automatic id by mdb
        ref: "User",//to refer from user collection
        required: true,
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,//create automatic id by mdb
        ref: "User",//to refer from user collection
        required: true,
    },
    message :{
        type: String,
        required: true
    },
    //createdAt, updatedAt

}, {timestamps: true});

const Message = mongoose.model("Message", messageSchema);

export default Message;