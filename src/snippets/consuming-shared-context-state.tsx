import { useChatProvider } from "./sharing-state-with-context-api";

// Usage
const ComponentA = () => {
  const { messages, add } = useChatProvider();
  return null;
};

const ComponentB = () => {
  const { messages, add } = useChatProvider();
  return null;
};
