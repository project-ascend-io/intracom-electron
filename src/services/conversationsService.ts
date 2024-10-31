export const fetchConversations = async (userId: string) => {
  try {
    const res = await fetch(`${process.env.API_URL}/chats/${userId}`);

    if (!res.ok) {
      throw new Error(`Server error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch conversations:", error);
    throw error;
  }
};
