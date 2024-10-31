import { Message } from "../message/Message.types";

const getDividerText = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString(undefined, options);
};

interface Divider {
  type: "divider";
  text: string;
  date: string;
}

type ProcessedItem = Message | Divider;

const preProcessMessages = (messages: Message[]): ProcessedItem[] => {
  if (!messages || messages.length === 0) return [];

  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
  );

  const processedMessages: ProcessedItem[] = [];
  let lastDate: Date | null = null;

  sortedMessages.forEach((message) => {
    const messageDate = new Date(message.updatedAt);

    if (!lastDate || messageDate.toDateString() !== lastDate.toDateString()) {
      processedMessages.push({
        type: "divider",
        text: getDividerText(messageDate),
        date: messageDate.toISOString(),
      });
    }

    processedMessages.push(message);
    lastDate = messageDate;
  });

  return processedMessages;
};

export default preProcessMessages;
