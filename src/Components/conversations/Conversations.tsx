import { useEffect, useState } from "react";
import { useConversationsContext } from "../../context/conversationsContext";
import { Connection } from "../connection/Connection";
import { Chat } from "../connection/Connection.types";

export const Conversations = () => {
  const { conversations } = useConversationsContext();

  // TODO: Add loading state to this component
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (conversations) {
      setLoading(false);
    }
  }, [conversations]);

  if (loading) {
    return <section>Loading...</section>;
  }

  return (
    <section className=" h-16/21 overflow-y-auto">
      <ul className="flex flex-col mt-4">
        {conversations &&
          conversations.map((conversation: Chat) => (
            <Connection key={conversation._id} />
          ))}
      </ul>
    </section>
  );
};
