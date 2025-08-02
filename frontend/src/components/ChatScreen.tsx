import { useEffect, useRef } from "react";
import { Message } from "../types/types";
import Chat from "./Chat";
import Thinking from "./Thinking";

interface ChatScreenProps {
  chats: Message[];
  thinking: boolean;
  onFormSubmit?: (formData: string) => void;
}

const ChatScreen = ({ chats, thinking, onFormSubmit }: ChatScreenProps) => {
  const chatRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chats]);

  return (
    <div
      ref={chatRef}
      className="px-28 flex-grow h-[350px] overflow-y-auto scroll-smooth"
      style={{ height: "calc(100vh - 200px)"}}
    >
      {chats.map((chat, index) => (
        <Chat
          key={index}
          message={chat}
          lastChat={index === chats.length - 1}
          onFormSubmit={onFormSubmit}
        />
      ))}
      {thinking && <Thinking />}
    </div>
  );
};

export default ChatScreen;
