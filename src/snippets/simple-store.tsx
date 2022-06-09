import { BehaviorSubject } from "rxjs";

export interface ChatMessage {
  id: number;
  content: string;
}

export const ChatStore = (initMessages: ChatMessage[] = []) => {
  // Stream of chat messages - we can push messages to it and subscribe
  const messagesSubject = new BehaviorSubject(initMessages);

  return {
    // Hiding  implementation details
    // For consumers, we would like to expose only API for subscription
    messages$: messagesSubject.asObservable(),

    // The function reading to read data without subscription
    // Helpful in comparison logic, ...etc
    get messages() {
      return messagesSubject.getValue();
    },

    // Exposing only allowed actions on state
    add: (message: ChatMessage) => {
      messagesSubject.next([...messagesSubject.getValue(), message]);
    }
  };
};
