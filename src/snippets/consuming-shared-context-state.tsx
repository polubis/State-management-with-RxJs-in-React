import { useChatProvider } from "./sharing-state-with-context-api";

const ComponentA = () => {
  const { messages, add } = useChatProvider();
  return null;
};

const ComponentB = () => {
  const { messages, add } = useChatProvider();
  return null;
};
