import { createContextStore } from "../framework/createContextStore";
import { ChatMessage, createChatMessage } from "./models";

export const [ChatProvider, useChatProvider] = createContextStore(
  [createChatMessage(0, "Hi, how are you?", "Bot")] as ChatMessage[],
  {
    add: (messages, message: ChatMessage) => [...messages, message]
  }
);
