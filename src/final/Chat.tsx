import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { useChatProvider, ChatProvider } from "./ChatProvider";
import { getRandom, useFakeBot } from "./utils";
import { createChatMessage } from "./models";

const Chat = () => {
  const [inputValue, setInputValue] = useState("");

  const { value: messages, add } = useChatProvider();

  useFakeBot(add);

  return (
    <>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {messages.map((message) => (
          <ListItem key={message.id}>
            <ListItemAvatar>
              <Avatar>{message.author.charAt(0)}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={message.content} secondary={message.date} />
          </ListItem>
        ))}
      </List>
      <TextField
        style={{ margin: "20px" }}
        label="Type message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            add(createChatMessage(getRandom(3000, 10000), inputValue, "You"));
            setInputValue("");
          }
        }}
      />
    </>
  );
};

const ConnectedChat = () => (
  <ChatProvider>
    <Chat />
  </ChatProvider>
);

export { ConnectedChat as Chat };
