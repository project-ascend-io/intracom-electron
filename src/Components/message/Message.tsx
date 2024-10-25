import { Avatar } from "../avatar/Avatar";
import { formatTime } from "../../utils/formatDate";
import { Message as MessageType } from "./Message.types";

export const Message: React.FC<MessageType> = ({
  sender,
  updatedAt,
  content,
}) => {
  return (
    <section className="pl-2 flex items-start mb-4">
      <Avatar style={"w-10 h-10 rounded-[50%] object-cover mr-4"} user={null} />
      <div className="flex flex-col flex-1 items-start">
        <span className="flex justify-start">
          <h6 className="mr-4 font-medium text-xs">{sender.username}</h6>
          <time className="text-xs">{formatTime(updatedAt)}</time>
        </span>
        <p className="text-wrap text-xs mt-2">{content}</p>
      </div>
    </section>
  );
};
