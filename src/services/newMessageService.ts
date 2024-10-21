import { Chat, User } from "../Components/connection/Connection.types";

export const fetchUsers = async (currentUser: User): Promise<User[]> => {
  try {
    const res = await fetch(`${process.env.API_URL}/users`);

    if (!res.ok) {
      throw new Error(`Server error! status: ${res.status}`);
    }

    const data = await res.json();

    if (data && Array.isArray(data.responseObject)) {
      return data.responseObject
        .filter((user: { _id: string }) => user._id !== currentUser._id)
        .map((user: { username: string; _id: string }) => ({
          username: user.username,
          _id: user._id,
        }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
};

export const createNewConversation = async (
  recipientId: string,
  creatorId: string,
): Promise<Chat> => {
  const requestBody = {
    recipientId,
    creatorId,
  };
  try {
    const res = await fetch(`${process.env.API_URL}/chats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    const data = await res.json();
    return data.responseObject;
  } catch (error) {
    console.error("Failed to create new conversation:", error);
    throw error;
  }
};
