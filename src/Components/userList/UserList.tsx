import { UserListItem } from "./UserListItem";
import { User } from "../connection/Connection.types";
import { useNavigate } from "react-router-dom";
import { useCurrentUsersContext } from "../../context/currentUsersContext";
import { useConversationsContext } from "../../context/conversationsContext";
import { useCurrentlySelectedChatContext } from "../../context/currentlySelectedChatContext";
import { createNewConversation } from "../../services/newMessageService";
import { useAuth } from "../../context/auth-context";

export const UserList: React.FC = () => {
  const navigate = useNavigate();

  const { filteredCurrentUsers, currentUsers, setFilteredCurrentUsers } =
    useCurrentUsersContext();
  const { checkCurrentConversations, conversations } =
    useConversationsContext();
  const { setCurrentlySelectedChat } = useCurrentlySelectedChatContext();
  const { user } = useAuth();

  const handleCreateConversation = async (
    event: React.MouseEvent<HTMLElement>,
  ) => {
    const target = event.target as HTMLElement;
    const chatAlreadyExists = checkCurrentConversations(target.id);
    if (chatAlreadyExists) {
      setCurrentlySelectedChat(
        conversations.filter((conversation) =>
          conversation.users.find((user) => user._id === target.id),
        )[0],
      );
      setFilteredCurrentUsers(currentUsers);
      navigate("/conversation");
    } else {
      await createNewConversation(target.id, user._id)
        .then((conversation) => {
          if (conversation) {
            setCurrentlySelectedChat(conversation);
            setFilteredCurrentUsers(currentUsers);
          }
        })
        .finally(() => navigate("/conversation"));
    }
  };

  const currentUsersToDisplay =
    filteredCurrentUsers === null ? currentUsers : filteredCurrentUsers;

  return (
    <div
      id="userList"
      className="ml-16 mt-2 max-w-[89%] border border-solid border-[#979797] rounded-lg max-h-80 overflow-y-scroll"
    >
      <ul className="flex flex-col w-full">
        {currentUsersToDisplay.map((user: User) => (
          <UserListItem
            key={user._id}
            user={user}
            handleCreateConversation={handleCreateConversation}
          />
        ))}
      </ul>
    </div>
  );
};
