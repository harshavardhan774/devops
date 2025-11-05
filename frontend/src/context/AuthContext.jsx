import { createContext, useContext, useState } from "react";


export const AuthContext = createContext();//feature from react

//create new hook to actually store signup user in localstorage
export const useAuthContext = () => {
    return useContext(AuthContext);
};

//inside provider we'll provide values that we can use throught app
export const AuthContextProvider = ({ children }) => {

    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);
    //above takes user input data as its string so convert it in object and pass as values below
    //childern is prop
    return <AuthContext.Provider value={{authUser, setAuthUser}}>
        {children}
    </AuthContext.Provider>;
};