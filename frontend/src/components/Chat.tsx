import { Message } from "../types/types";
import {detectItemSelectionPara, extractItemsFromMessage} from "../utils/detect_lang";
import { ItemSelectionTable } from "./Material_Table";
import PRTypeForm from "./PRTypeForm";

interface ChatProps {
  message: Message;
  lastChat?: boolean;
  onFormSubmit?: (formData: string) => void;
}

const Chat = ({ message, lastChat, onFormSubmit }: ChatProps) => {
  // Check if the message is PR_TYPE_FORM
  // console.log("detectItemSelectionPara: ", detectItemSelectionPara(message.message));
  // console.log("message: ", message.message);
  if (
    message.message.trim() === "PR_TYPE_FORM" && 
    message.sender === "Bot"
  ) {
    return (
      <div className="chat chat-start">
        <div className="mx-2 my-1 chat-header font-bold text-primary">
          AURA
        </div>
        <div className="chat-bubble rounded-box">
          <div className="m-2">
            <PRTypeForm onSubmit={onFormSubmit!} />
          </div>
        </div>
      </div>
    );
  }
  else if ((
    message.message.trim() === "ITEM_CARDS_DATA" || 
    detectItemSelectionPara(message.message.trim())) && 
    message.sender === "Bot"
  ) {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\n", message.message);
    
    const items : { MODEL_NAME: string, MAT_CODE: string }[] = extractItemsFromMessage(message.message);
    return (
      <div className="chat chat-start">
        <div className="mx-2 my-1 chat-header font-bold text-primary">
          AURA
        </div>
        <div className="chat-bubble rounded-box">
        <div className="m-2">
          <ItemSelectionTable items={items} onFormSubmit={onFormSubmit!} />
        </div>
      </div>
      </div>
    )
  }
  return (
    <div
      className={`chat ${
        message.sender === "User" ? "chat-end" : "chat-start"
      }`}
    >
      <div
        className={`mx-2 my-1 chat-header font-bold ${
          message.sender === "Bot" && "text-primary"
        }`}
      >
        {message.sender === "User" ? "You" : "AURA"}
      </div>
      <div
        className={`chat-bubble flex flex-col rounded-box md:text-lg ${
          message.sender === "User" && "chat-bubble-primary"
        }`}
      >
        <div className="m-2 whitespace-pre-line">{message.message}</div>
        {message.sources && message.sources.length > 0 && (
          <div
            className={`dropdown dropdown-hover ${
              lastChat ? "dropdown-top" : ""
            }`}
          >
            <button
              tabIndex={0}
              className="btn btn-ghost rounded-box text-sm opacity-50 hover:text-primary hover:opacity-100"
            >
              Sources
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 bg-opacity-90 rounded-box z-[1] px-1 py-2"
            >
              {message.sources.map((source, index) => (
                <li key={index}>
                  <a href={source} target="_blank" rel="noreferrer">
                    {index + 1}
                    {"."}&nbsp;
                    <span className="text-xs w-60 rounded-box md:w-full md:text-sm text-primary opacity-80 hover:opacity-100 hover:underline">
                      {source}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
