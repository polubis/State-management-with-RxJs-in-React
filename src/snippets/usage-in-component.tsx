import { useEffect, useMemo, useRef, useState } from "react";
import { ChatMessage, ChatStore } from "./simple-store";
import { tap } from "rxjs/operators";

const EXAMPLE_MESSAGE: ChatMessage = {
  id: 0,
  content: "Hi, how are you?"
};

export const Chat = () => {
  const inputValue = useRef("");

  // Creating ChatStore instance only once per component lifecycle
  const store = useMemo(() => ChatStore([EXAMPLE_MESSAGE]), []);

  const [messages, setMessages] = useState(store.messages);

  useEffect(() => {
    // Subscription to data change and setting state
    const sub = store.messages$
      .pipe(
        tap((messages) => {
          console.log(messages);
        })
      )
      .subscribe((messages) => setMessages(messages));

    return () => {
      // Cleaning up after component unmount
      sub.unsubscribe();
    };
  }, []);

  return (
    <>
      {messages.map((message) => (
        <li key={message.id}>{message.content}</li>
      ))}
      <input
        onChange={(e) => (inputValue.current = e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            store.add({
              id: messages.length,
              content: inputValue.current
            });
          }
        }}
      />
    </>
  );
};
