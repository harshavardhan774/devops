import React, { useEffect, useRef } from 'react';
import Message from './Message';
import useGetMessages from '../../hooks/useGetMessages';
import MessageSkeleton from '../skeleton/messageSkeleton';
import useListenMessages from '../../hooks/useListenMessages';

const messages = () => {
  const {messages , loading}= useGetMessages();
  useListenMessages(); //listen incoming msgs from socket
  // console.log("MESSAGES:",messages);
  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({behavior: "smooth"});
    },50);
  },[messages]);

  return (
    <div className='px-4 flex-1 overflow-auto'>

      {/* //rendering msgs */}
      {!loading && messages.length > 0 && messages.map((message) => (
        <div key={message._id} ref={lastMessageRef}>
          <Message message={message} />
        </div>
      ))}

			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
			{!loading && messages.length === 0 && (
				<p className='text-center text-white'>Send a message to start the conversation</p>
      )}

    </div>
  )
}

export default messages;