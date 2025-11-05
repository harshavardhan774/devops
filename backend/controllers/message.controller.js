import Conversation from "../model/conversation.model.js";
import Message from "../model/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async(req,res) => {
    try {
        const {message} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id; //it'll not directly work. so we'll need middleware here

        //access conversation
        let conversation = await Conversation.findOne({
            participants: {$all : [senderId, receiverId]} //its a mdb syntax
        });// find converation where participants array involve all this fields

        //if there is not converation present then create first
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }
        //creating new message
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });
        //push new message in message collection array
        if(newMessage) {
            conversation.messages.push(newMessage._id);
        }

        //save msg & conversation in our db
        // await conversation.save();
        // await newMessage.save();

        //this'll run in parallel
        await Promise.all([conversation.save(), newMessage.save()])

        //SOCKET IO FUNCTNALITY WILL GO HERE

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId){
            //io.to(<socket_id>).emit() is used to send events to specific client
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }


        //sent new message
        res.status(201).json(newMessage);

    } catch (error) {
        res.status(500).json({error: "internal server error"});
        console.log("error in sendmessage controller", error.message);
    }
}

export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // Populate with actual messages

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
}