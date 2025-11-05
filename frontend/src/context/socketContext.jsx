import { createContext, useContext, useEffect, useState } from "react";
import {useAuthContext} from "../context/AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

// creating hook to consume context accross app

export const useSocketContext = () => {
    return useContext(SocketContext);
}

//inside provider we'll provide values that we can use throught app

export const SocketContextProvider = ({children}) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const {authUser} = useAuthContext(); //get auth user data

    useEffect(() => {
        if(authUser) {
            const socket = io("https://chat-app-cvjw.onrender.com", {
                query: {
                    userId: authUser._id
                },
            });

            setSocket(socket);
//socket.on() is used to listen to events. can be used on client and server side.
            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            return () => socket.close();

        } else {
            if(socket) {
                socket.close();
                setSocket(null);
            }
        }
    },[authUser])



    return <SocketContext.Provider value={{socket, onlineUsers}}>
        {children}
    </SocketContext.Provider>
} 