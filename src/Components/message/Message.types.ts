export type Message = {
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
};
