import { BehaviorSubject } from "rxjs";

export interface ChatMessage {
  id: number;
  content: string;
}

export const ChatStore = (initMessages: ChatMessage[] = []) => {
  // Stream of chat messages - we can push messages to it and subscribe
  const messagesSubject = new BehaviorSubject(initMessages);

  return {
    // Hidding implementation details
    // For consumers we would like to expose only API for subscription
    messages$: messagesSubject.asObservable(),

    // Function which allows to read data without subscription
    // Helpfull in comparision logic, ...etc
    get messages() {
      return messagesSubject.getValue();
    },

    // Exposing only allowed actions on state
    add: (message: ChatMessage) => {
      messagesSubject.next([...messagesSubject.getValue(), message]);
    }
  };
};
