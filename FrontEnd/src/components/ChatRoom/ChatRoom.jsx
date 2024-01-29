// ChatRoom.jsx 메시지전송x
import { Container } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import PushPinRoundedIcon from "@mui/icons-material/PushPinRounded";
import ChatMenu from "./ChatTop";
import ChatSend from "./ChatSend";

const ChatRoom = () => {
  const { roomId } = useParams();
  const chatRoomInfo = {
    owner: "제노예요",
    title: "ISTJ A버전 구해요",
  };

  const [messages, setMessages] = useState([
    {
      time: "16:58",
      message: "안녕하세요! 거래 희망합니다",
      type: "chat-visiter",
    },
    {
      time: "16:59",
      message: "네 결제요청 보낼게요~",
      type: "chat-owner",
    },
  ]);

  const theme = useTheme();

  const updateMessages = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <Container>
      <div id="chat-container">
        <ChatMenu />
        <div id="chat-notice">
          <div id="notice-content">
            <PushPinRoundedIcon id="notice-icon" />
            <p id="notice-title">
              <b>필독</b>
            </p>
            <p>
              거래가 처음이신가요? <a href="#">인증가이드</a>를 반드시 읽으시고
              믿을 수 있는 거래 하세요!
            </p>
          </div>
        </div>
        <div id="chat-content-container">
          <div id="chat-message-area">
            {messages.map((messageData, index) => (
              <div key={index} className={messageData.type}>
                {messageData.type == "chat-owner" ? (
                  <p>{messageData.time}</p>
                ) : null}
                <p className="chat-message">{messageData.message}</p>
                {messageData.type == "chat-visiter" ? (
                  <p>{messageData.time}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
        <div id="send-message-container">
          <ChatSend
            updateMessages={updateMessages}
            getCurrentTime={getCurrentTime}
          />
        </div>
      </div>
      <div id="chat-list-container"></div>
    </Container>
  );
};

export default ChatRoom;
