// import React from 'react';
import { SingleConversation } from "./!sidebarcomponentsExports";

const Conversations = () => {
  return (
    <div className="py-2 flex flex-col overflow-auto">
      <SingleConversation />
      <SingleConversation />
      <SingleConversation />
      <SingleConversation />
      <SingleConversation />
    </div>
  );
};
export default Conversations;
