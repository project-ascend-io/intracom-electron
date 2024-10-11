import { Message } from "../message/Message";

export type User = {
  _id: string;
  username: string;
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
