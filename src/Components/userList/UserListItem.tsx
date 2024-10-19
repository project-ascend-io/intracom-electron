import { User } from "../connection/Connection.types";
import { Avatar } from "../avatar/Avatar";

interface UserListItemProps {
  user: User;
  handleCreateConversation: (event: React.MouseEvent<HTMLElement>) => void;
}

export const UserListItem: React.FC<UserListItemProps> = ({
  user,
  handleCreateConversation,
}) => {
  return (
    <li
      className="flex flex-row justify-between py-4 px-6 items-center hover:bg-[#D7E7EE] hover:cursor-pointer rounded-lg"
      onClick={handleCreateConversation}
      id={user._id}
    >
      <span className="flex flex-row items-center select-none pointer-events-none">
        <Avatar
          style={"w-8 h-8 rounded-[50%] mr-4 select-none pointer-events-none"}
          user={user}
        />
        <h6 className="font-semibold select-none pointer-events-none">
          {user.username}
        </h6>
      </span>
    </li>
  );
};
