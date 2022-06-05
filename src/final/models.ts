import { formatDistance } from "date-fns";

export interface ChatMessage {
  id: number;
  content: string;
  author: string;
  date: string;
}

const now = new Date();

export const createChatMessage = (
  id: ChatMessage["id"],
  content: ChatMessage["content"],
  author: ChatMessage["author"]
) => {
  return {
    id,
    content,
    author,
    date: formatDistance(now, new Date(), { includeSeconds: true })
  };
};
