import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ChatStore } from "./simple-store";

type ChatContext = Omit<ReturnType<typeof ChatStore>, "messages$">;

const Context = createContext<ChatContext | null>(null);

export const ChatProvider = () => {
  const store = useMemo(() => ChatStore(), []);
  const [messages, setMessages] = useState(store.messages);

  useEffect(() => {
    const sub = store.messages$.subscribe((messages) => setMessages(messages));

    return () => {
      sub.unsubscribe();
    };
  }, []);

  // Memo to avoid not needed rerenders
  const value = useMemo(() => ({ messages, add: store.add }), [messages]);

  return (
    <Context.Provider value={value}>
      {/* Add here any components */}
    </Context.Provider>
  );
};

export const useChatProvider = () => {
  const ctx = useContext(Context);

  if (!ctx) {
    throw new Error("Lack of Provider in components tree");
  }

  return ctx;
};
