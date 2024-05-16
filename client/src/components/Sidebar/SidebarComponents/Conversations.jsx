// import React from 'react';
import useGetConversations from "../../../hooks/useGetConversations";
import { SingleConversation } from "./!sidebarcomponentsExports";
import { getRandomEmoji } from "../../../utils/emojis";
// import useConversation from "../../../store/useConversation"

const Conversations = () => {
  const { loading, conversations } = useGetConversations();

  // console.log("Conversations: ", conversations);

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => (
        <SingleConversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1}
        />
      ))}

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};
export default Conversations;
