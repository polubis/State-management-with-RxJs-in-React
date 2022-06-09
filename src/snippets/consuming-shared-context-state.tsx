import {
  ChatProvider,
  useChatProvider
} from "./sharing-state-with-context-api";

// Usage
const ComponentA = () => {
  const { messages, add } = useChatProvider();
  return null;
};

const ComponentB = () => {
  const { messages, add } = useChatProvider();
  return null;
};

// Declaration
const App = () => {
  return (
    <>
      {/* View 1 */}
      <ChatProvider>
        <ComponentA />
      </ChatProvider>
      {/* View 2 */}
      <ChatProvider>
        <ComponentB />
      </ChatProvider>
    </>
  );
};
