export const fetchMessages = async (chatId: string) => {
  try {
    const res = await fetch(`${process.env.API_URL}/messages/${chatId}`);

    if (!res.ok) {
      throw new Error(`Server error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    throw error;
  }
};
