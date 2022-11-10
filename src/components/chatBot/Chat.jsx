import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
// import ScrollToBottom from "react-scroll-to-bottom";
import "./Chat.css";

function Chat() {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const ctx = useContext(AuthContext);
  // const [userData, setUserData] = useState([]);

  const socket = ctx.socket;

  const userid = sessionStorage.getItem("userid");
  let client = "";
  axios
    .get("http://localhost:3001/user/chat/" + userid)
    .then((res) => {
      client = res.data.username;
      console.log(client);
    })
    .catch((err) => {
      console.log(err);
    });

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        // room: room,
        author: client,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        {/* <ScrollToBottom className="message-container"> */}
        {messageList.map((messageContent) => {
          return (
            <div
              className="message"
              id={messageContent.author == "user" ? "you" : "other"}
            >
              <div>
                <div className="message-content">
                  <p>{messageContent.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{messageContent.time}</p>
                  <p id="author">{messageContent.author}</p>
                </div>
              </div>
            </div>
          );
        })}
        {/* </ScrollToBottom> */}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        {/* <button onClick={sendMessage}>&#9658;</button> */}
      </div>
    </div>
  );
}

export default Chat;
