import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

import { sendChat, initChat } from "../../store2/chat.js";

import { useTheme } from "@mui/material/styles";

import { Button, Container } from "@mui/material";
import { PushPinRounded } from "@mui/icons-material";

import ChatMenu from "./ChatTop";
import ChatSend from "./ChatSend";

const ChatRoom = () => {
  const theme = useTheme();

  const { roomId } = useParams();
  const location = useLocation();

  const dispatch = useDispatch();

  const loginUser = useSelector((state) => (state.user ? state.user.user : ""));

  // 항상 맨 아래로 스크롤
  const sendMessageBoxRef = useRef(null);

  useEffect(() => {
    if (sendMessageBoxRef.current) {
      sendMessageBoxRef.current.scrollTop =
        sendMessageBoxRef.current.scrollHeight;
    }
  });

  // 리스트 axios 로 불러오기 (보류)
  // useEffect(() => {
  //   dispatch(initChat(roomId));
  // }, [dispatch, roomId]);

  const chatList = useSelector((state) => (state.chat ? state.chat.chat : []));
  
  // const chatList = chats.filter((chat) => chat.chatRoomId == roomId);

  const updateMessages = (newMessage) => {
    if (newMessage.message.trim() != "") {
      dispatch(sendChat(newMessage));
    }
  
  };

  const price = useSelector((state) =>
    state.pay ? state.pay.status.price : 0
  );

  const handlePay = () => {
    // 결제 기능
    console.log(price);
    console.log("카카오페이 연결");
  };

  return (
    <Container>
      <div id="chat-container">
        <ChatMenu updateMessages={updateMessages} postId={location.state} />
        <div id="chat-content-container" ref={sendMessageBoxRef}>
          <div id="chat-message-area">
            <div id="notice-content">
              <div>
                <PushPinRounded id="notice-icon" />
                <b>필독</b> 거래가 처음이신가요? <a href="/help">인증가이드</a>
                를 반드시 읽으시고 믿을 수 있는 거래 하세요!
              </div>
            </div>
            {chatList.map((messageData, index) => (
              <div>
                <div
                  key={index}
                  className={
                    messageData.sender == loginUser.name
                      ? "chat-owner-name"
                      : "chat-visiter-name"
                  }
                >
                  {messageData.sender}
                </div>
                <div
                  key={index}
                  className={
                    messageData.sender == loginUser.name
                      ? "chat-owner"
                      : "chat-visiter"
                  }
                >
                  {messageData.sender == loginUser.name ? (
                    <p>{messageData.sendTime}</p>
                  ) : null}
                  <div className="chat-message">
                    {!messageData.imgCode ? (
                      <div>{messageData.message}</div>
                    ) : (
                      <img src={messageData.imgCode}></img>
                    )}
                    <div>
                      {messageData.isPay ? (
                        <Button id="pay-button" onClick={handlePay}>
                          결제하러가기
                        </Button>
                      ) : null}
                    </div>
                  </div>
                  {messageData.sender != loginUser.name ? (
                    <p>{messageData.sendTime}</p>
                  ) : null}
                </div>
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
