import { useCurrentlySelectedChatContext } from "../../context/currentlySelectedChatContext";
import { Message } from "../message/Message";
import { ChatBoxLoader } from "./ChatBoxLoader";
import preProcessMessages from "./ChatBoxUtil";
import { useEffect, useRef } from "react";
import "./ChatBox.css";

export const ChatBox = () => {
  const { messages, loading } = useCurrentlySelectedChatContext();

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const processedMessages = preProcessMessages(messages);

  return (
    <>
      {loading ? (
        <ChatBoxLoader />
      ) : (
        <section
          id="messageList"
          ref={scrollRef}
          className="w-full h-[62%] pb-[2%] overflow-auto"
        >
          {processedMessages &&
            processedMessages.length > 0 &&
            processedMessages.map((item) => {
              if ("type" in item && item.type === "divider") {
                return (
                  <time
                    key={`divider-${item.date}`}
                    className="w-full pt-2 flex justify-center text-[#777777] text-sm"
                  >
                    {item.text}
                  </time>
                );
              } else if ("_id" in item) {
                return (
                  <Message
                    key={item._id}
                    sender={item.sender}
                    updatedAt={item.updatedAt}
                    content={item.content}
                  />
                );
              }
            })}
        </section>
      )}
    </>
  );
};
