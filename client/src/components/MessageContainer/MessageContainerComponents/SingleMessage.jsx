// import React from 'react';
import { useAuthContext } from "../../../context/AuthContext";
import useConversation from "../../../store/useConversation";
import { extractTime } from "../../../utils/extractTime";

const SingleMessage = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  let formattedTime = extractTime(message.createdAt);
  let fromMe = message.senderId === authUser._id;
  let chatClassName = fromMe ? "chat-end" : "chat-start";
  let profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  let bubbleBgColor = fromMe ? "bg-blue-500" : "";

  console.log(authUser._id);

  console.log("This is Single Message: ", message.newMessage);

  if (message.newMessage) {
    formattedTime = extractTime(message.newMessage.createdAt);
    fromMe = message.newMessage.senderId === authUser._id;
    chatClassName = fromMe ? "chat-end" : "chat-start";
    profilePic = fromMe
      ? authUser.profilePic
      : selectedConversation?.profilePic;
    bubbleBgColor = fromMe ? "bg-blue-500" : "";
  }

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>
        {message.newMessage ? message.newMessage.message : message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default SingleMessage;
