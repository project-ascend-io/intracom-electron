import { Message } from "../message/Message.types";

export type User = {
  _id: string;
  username: string;
  profilePic?: string;
};

export type Chat = {
  _id?: string;
  chatName?: string;
  isChannel?: boolean;
  users?: User[];
  chatAdmin?: User | null;
  createdAt?: string;
  updatedAt?: string;
  lastMessage?: Message;
  __v?: number;
};
