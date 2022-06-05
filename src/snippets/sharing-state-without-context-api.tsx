import { useEffect, useState } from "react";
import { ChatStore } from "./simple-store";

// ChatStore.tsx
export const store = ChatStore();

// ComponentA.tsx
import { store } from "./ChatStore.tsx";
export const ComponentA = () => {
  const [messages, setMessages] = useState(store.messages);

  useEffect(() => {
    const sub = store.messages$.subscribe((messages) => setMessages(messages));

    return () => {
      sub.unsubscribe();
    };
  }, []);
};

// ComponentB.tsx
import { store } from "./ChatStore.tsx";
export const ComponentB = () => {
  const [messages, setMessages] = useState(store.messages);

  useEffect(() => {
    const sub = store.messages$.subscribe((messages) => setMessages(messages));

    return () => {
      sub.unsubscribe();
    };
  }, []);
};

// ComponentC.tsx
import { store } from "./ChatStore.tsx";
export const ComponentC = () => {
  // ... Same as above
};
