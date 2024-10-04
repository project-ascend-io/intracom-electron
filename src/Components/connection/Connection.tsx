import { Avatar } from "../avatar/Avatar";

interface User {
  _id: string;
  username: string;
}

interface Chat {
  _id?: string;
  chatName?: string;
  isChannel?: boolean;
  users?: User[];
  chatAdmin?: User | null;
  createdAt?: string;
  updatedAt?: string;
  lastMessage?: string;
  __v?: number;
}

const cutMessageLength = (lastMessage: string) => {
  const maxLength = 100;

  if (lastMessage.length > maxLength) {
    return lastMessage.slice(0, maxLength) + "...";
  }

  return lastMessage;
};

export const Connection: React.FC<Chat | null> = (chat) => {
  return (
    <section
      className="flex flex-row justify-between my-4 mx-6 items-center"
      onClick={null}
    >
      <span className="flex flex-row items-center">
        <Avatar style={"w-12 h-12 rounded-[50%]"} user={null} />
        <span className="flex flex-col ml-6">
          <h3 className="font-semibold">{"Amy C."}</h3>
          <p className="text-[#61788A] text-sm">
            {cutMessageLength("I just shared a link about this conversation")}
          </p>
        </span>
      </span>
      <time className="text-[#61788A] text-sm">{"3h"}</time>
    </section>
  );
};
