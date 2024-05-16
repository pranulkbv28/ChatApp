// import React from 'react';

import { useEffect, useRef } from "react";
import useGetMessages from "../../../hooks/useGetMessages";
import MessageSkeleton from "../../Skeletons/MessageSkeleton";
import { SingleMessage } from "./!messageContainerExports";

const Messages = () => {
  const { messages, loading } = useGetMessages();

  // console.log("Messages: ", messages);

  const lastMessageRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <SingleMessage message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};
export default Messages;
