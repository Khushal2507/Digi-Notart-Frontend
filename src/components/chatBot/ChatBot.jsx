import { useState } from "react";
import { BsFillChatFill } from "react-icons/bs";
import "./ChatBot.css";
import Chat from "./Chat.jsx";

const ChatBot = () => {
  const [click, setClick] = useState(false);

  const clickHandler = () => {
    setClick((current) => !current);
  };
  return (
    <div className="chatbot">
      <button onClick={clickHandler}>
        <BsFillChatFill />
      </button>
      {click && <Chat />}
    </div>
  );
};

export default ChatBot;
