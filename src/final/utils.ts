import { useEffect } from "react";
import { ChatMessage, createChatMessage } from "./models";

export const getRandom = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const useFakeBot = (onTick: (message: ChatMessage) => void) => {
  useEffect(() => {
    const MESSAGE_CONTENTS = [
      "Hi",
      "You're going to the cinema?",
      "Did you finished your homework?"
    ];

    const interval = setInterval(() => {
      onTick(
        createChatMessage(
          getRandom(10, 1000),
          MESSAGE_CONTENTS[getRandom(0, MESSAGE_CONTENTS.length - 1)],
          "Bot"
        )
      );
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);
};
