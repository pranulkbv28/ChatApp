import { useEffect, useRef } from "react";
import useGetMessages from "../../../hooks/useGetMessages";
import MessageSkeleton from "../../Skeletons/MessageSkeleton";
import { SingleMessage } from "./!messageContainerExports";
import useListenMessages from "../../../hooks/useListenMessages";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();

  // if (messages.newMessage) {
  //   console.log("this is the new message: ", messages.newMessage);
  // }

  console.log("Messages Collection: ", messages);
  console.log("Messages Collection Length: ", messages.length);
  console.log("Last message: ", messages[length - 2]);

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
        messages.map((message, index) => {
          const isLastMessage = index === messages.length - 1;
          // message = messages.newMessage ? messages.newMessage : message;
          return (
            <div key={message._id} ref={isLastMessage ? lastMessageRef : null}>
              <SingleMessage key={message._id} message={message} />
            </div>
          );
        })}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
