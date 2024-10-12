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

export const sendMessage = async (
  content: string,
  senderId: string,
  chatId: string,
) => {
  const requestBody = {
    content,
    sender: senderId,
    chat: chatId,
  };

  try {
    const res = await fetch(`${process.env.API_URL}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to send message:", error);
    throw error;
  }
};
