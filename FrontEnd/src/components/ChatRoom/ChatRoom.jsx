// ChatRoom.jsx 메시지전송x
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendChat } from "../../store2/chat.js";

import { useParams } from "react-router-dom";

import { useTheme } from "@mui/material/styles";

import { Button, Container } from "@mui/material";

import PushPinRoundedIcon from "@mui/icons-material/PushPinRounded";
import ChatMenu from "./ChatTop";
import ChatSend from "./ChatSend";

const ChatRoom = () => {
  const { roomId } = useParams();
  const dispatch = useDispatch();

  const loginUser = useSelector((state) =>
    state.user ? state.user.user.name : ""
  );

  const chats = useSelector((state) => (state.chat ? state.chat.chat : []));

  const chatList = chats.filter((chat) => chat.chatRoomId == roomId);

  const theme = useTheme();

  const updateMessages = (newMessage) => {
    console.log(newMessage);
    dispatch(sendChat(newMessage));
  };

  const handlePay = () => {
    // 결제 기능
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
              거래가 처음이신가요? <a href="/help">인증가이드</a>를 반드시
              읽으시고 믿을 수 있는 거래 하세요!
            </p>
          </div>
        </div>
        <div id="chat-content-container">
          <div id="chat-message-area">
            {chatList.map((messageData, index) => (
              <div
                key={index}
                className={
                  messageData.sender == loginUser
                    ? "chat-owner"
                    : "chat-visiter"
                }
              >
                {messageData.sender == loginUser ? (
                  <p>{messageData.sendTime}</p>
                ) : null}
                <div className="chat-message">
                  <div>{messageData.message}</div>
                  <div>
                    {messageData.isPay ? (
                      <Button id="pay-button" onClick={handlePay}>
                        결제하러가기
                      </Button>
                    ) : null}
                  </div>
                </div>
                {messageData.sender != loginUser ? (
                  <p>{messageData.sendTime}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
        <div id="send-message-container">
          <ChatSend
            roomId={roomId}
            loginUser={loginUser}
            updateMessages={updateMessages}
          />
        </div>
      </div>
      <div id="chat-list-container"></div>
    </Container>
  );
};

export default ChatRoom;
