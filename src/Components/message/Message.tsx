import { Avatar } from "../avatar/Avatar";

interface MessageProps {
  _id?: string;
  sender?: {
    _id?: string;
    username?: string;
    profileImage?: string;
  };
  content?: string;
  chat?: {
    _id?: string;
  };
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export const Message: React.FC<MessageProps | null> = (props) => {
  return (
    <section className="pl-2 flex items-start mb-2">
      <Avatar style={"w-10 h-10 rounded-[50%] object-cover mr-4"} user={null} />
      <div className="flex flex-col flex-1 items-start">
        <span className="flex justify-start">
          <h6 className="mr-4 font-medium text-xs">{props.sender.username}</h6>
          <time className="text-xs">{props.createdAt}</time>
        </span>
        <p className="text-wrap text-xs mt-2">{props.content}</p>
      </div>
    </section>
  );
};
