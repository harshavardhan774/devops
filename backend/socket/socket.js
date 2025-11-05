import { Server } from "socket.io";
import http from "http";
import express from "express";
import exp from "constants";
import { Socket } from "net";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    //as socket give some cors error so below part is necessary.
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
    },
});

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}
//for onlinestatus feature
const userSocketMap = {}; //{userId: socketId}


//listen for connection. below socket means user that connected.
//socket.on() is used to listen to events. can be used on client and server side.
io.on("connection", (socket) => {
    console.log("a user is connected", socket.id);

    const userId = socket.handshake.query.userId;
    if(userId != "undefined") userSocketMap[userId] = socket.id;

    //io.emit() is used to send events to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));//going to use this events on socketcontext on client side

    socket.on("disconnect" , () => {
        console.log("user disconnect", socket.id);
        //when user disconnects we need to remove online wala mark
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
 });
});


export {app, server, io}