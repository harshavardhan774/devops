import { create } from "zustand";

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation : (selectedConversation) => set({selectedConversation}),
    //this is same we use in state and stater function
    messages: [],
    setMessages: (messages) => set({messages})
}));

export default useConversation;