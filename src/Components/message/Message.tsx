import { Avatar } from "../avatar/Avatar";

interface MessageProps {
  _id: string;
  sender?: {
    _id: string;
    username: string;
    profileImage: string;
  };
  content?: string;
  chat: {
    _id: string;
  };
  createdAt?: string;
  updatedAt: string;
  __v: number;
}

export const Message: React.FC<MessageProps | null> = ({
  sender,
  content,
  createdAt,
}) => {
  return (
    <section>
      <Avatar style={"w-12 h-12 rounded-[50%]"} user={sender} />
      <span>
        <p>{sender.username}</p>
        <time>{new Date(createdAt).toLocaleTimeString()}</time>
      </span>
      <p>{content}</p>
    </section>
  );
};
