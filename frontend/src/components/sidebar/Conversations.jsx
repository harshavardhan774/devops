import React from 'react';
import Conversation from './Conversation.jsx';
import useGetConversations from '../../hooks/useGetConversations.js';
import { getRandomEmoji } from '../../utils/emojis.js';

const Conversations = () => {
  const {laoding, conversations} = useGetConversations();
  // console.log(conversations) it gives all users list in json format. so we now have access of users using conversations
  return (
    <div className='py-2 flex flex-col overflow-auto'>

      {conversations.map((conversation,idx) => (
       <Conversation 
       key= {conversation._id}
       conversation = {conversation}
       emoji = {getRandomEmoji()}
       lastIdx = {idx === conversations.length -1}//used to not include divider after last user
       />
      ))}


      {laoding ? <span className='loading loading-spinner'></span> :null}
    </div>
  );
}

export default Conversations;