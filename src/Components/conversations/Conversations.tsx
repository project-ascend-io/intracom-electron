import { useEffect, useState } from "react";
import { useConversationsContext } from "../../context/conversationsContext";
import { Connection } from "../connection/Connection";
import { Chat } from "../connection/Connection.types";
import { ConversationsLoader } from "./ConversationsLoader";

export const Conversations = () => {
  const { filteredConversations, conversations } = useConversationsContext();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (conversations) {
      setLoading(false);
    }
  }, [conversations]);

  if (loading) {
    return <ConversationsLoader />;
  }

  const conversationsToDisplay =
    filteredConversations === null ? conversations : filteredConversations;

  return (
    <section className="h-16/21 overflow-y-auto">
      <ul className="flex flex-col mt-4">
        {conversationsToDisplay.map((conversation: Chat) => (
          <Connection key={conversation._id} conversation={conversation} />
        ))}
      </ul>
    </section>
  );
};
