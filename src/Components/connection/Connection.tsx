import { Avatar } from "../avatar/Avatar";
import { useNavigate } from "react-router-dom";
import { Chat, User } from "../connection/Connection.types";
import { useAuth } from "../../context/auth-context";
import { formatDate } from "../../utils/formatDate";
import { useCurrentlySelectedChatContext } from "../../context/currentlySelectedChatContext";
import { useConversationsContext } from "../../context/conversationsContext";

const cutMessageLength = (lastMessageText: string) => {
  const maxLength = 100;

  if (lastMessageText.length > maxLength) {
    return lastMessageText.slice(0, maxLength) + "...";
  }

  return lastMessageText;
};

interface ConnectionProps {
  conversation: Chat;
}

export const Connection: React.FC<ConnectionProps> = ({ conversation }) => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const { setCurrentlySelectedChat } = useCurrentlySelectedChatContext();
  const { conversations, setFilteredConversations } = useConversationsContext();

  const handleGoToConversation = () => {
    setCurrentlySelectedChat(conversation);
    setFilteredConversations(conversations);
    navigate("/conversation");
  };

  const getOtherUserInChatInfo = (users: User[]) => {
    return users.filter((otherUser) => otherUser._id !== user._id)[0].username;
  };

  return (
    <section
      className="flex flex-row justify-between py-4 px-6 items-center hover:bg-[#D7E7EE] hover:cursor-pointer"
      onClick={handleGoToConversation}
    >
      <span className="flex flex-row items-center select-none">
        <Avatar
          style={"w-12 h-12 rounded-[50%]"}
          user={
            conversation.users.filter(
              (otherUser) => otherUser._id !== user._id,
            )[0]
          }
        />
        <span className="flex flex-col ml-6">
          <h3 className="font-semibold">
            {getOtherUserInChatInfo(conversation.users)}
          </h3>
          <p className="text-[#61788A] text-sm">
            {conversation.lastMessage
              ? cutMessageLength(conversation.lastMessage.content)
              : "I just shared a link about this conversation"}
          </p>
        </span>
      </span>
      <time className="text-[#61788A] text-sm select-none">
        {formatDate(conversation.updatedAt)}
      </time>
    </section>
  );
};
