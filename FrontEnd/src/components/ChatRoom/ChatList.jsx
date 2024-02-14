import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { timeFormat } from "../../utils/timeFormat";

import { List, ListItem, Typography } from "@mui/material";

const ChatList = () => {
  const navigate = useNavigate();

  const moveChatRoom = (roomId, chatroom) => {
    navigate(`/chatroom/${roomId}`, { state: chatroom });
  };

  const loginUser = useSelector((state) =>
    state.user ? state.user.user : null
  );

  // 닉네임 가져오는 메서드
  const [nicknames, setNicknames] = useState({});


  const getNickname = async (id) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + `users/nickname`,
        {
          userId: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error get nickname:", error);
    }
  };

  const [chatLists, setChatLists] = useState([]);

  // 채팅 리스트 가져오기 + 닉네임 매핑
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + `chatRoom`, {
          withCredentials: true,
        });
        const chatData = response.data;
  
        // 닉네임 가져오기
        const nicknamePromises = chatData.map((chatroom) =>
          getNickname(chatroom.ownerId !== loginUser.userId ? chatroom.ownerId : chatroom.visiterId)
        );
        const nicknameResults = await Promise.all(nicknamePromises);
  
        // 닉네임을 객체로 매핑하여 상태에 저장
        const nicknameMap = {};
        chatData.forEach((chatroom, index) => {
          const nickname = nicknameResults[index];
          nicknameMap[chatroom.chatRoomId] = nickname;
        });
        setNicknames(nicknameMap);
        setChatLists(chatData);
      } catch (error) {
        console.error("Error ChatList:", error);
      }
    };
    fetchData();
  }, [loginUser.userId]);

  return (
    <div>
      <h1 className="chat-title">채팅목록</h1>
      {chatLists.length === 0 ? (
        <div className="chat-title">현재 진행중인 채팅이 없습니다!</div>
      ) : (
        <List sx={{ width: "100%", maxWidth: 500 }}>
          {chatLists.map((chatroom, index) => (
            <ListItem
            className={
              (chatroom.visiterId === loginUser &&
                chatroom.latestChat &&
                chatroom.latestChat.id !== chatroom.visitorLatestChatId) ||
              (chatroom.ownerId === loginUser &&
                chatroom.latestChat &&
                chatroom.latestChat.id !== chatroom.ownerLatestChatId)
                ? "unread-chatlist-item"
                : "chatlist-item"
            }
              key={index}
              onClick={() => moveChatRoom(chatroom.chatRoomId, chatroom)}
              >
                <div className="chatlist-info">
                  <div className="chatlist-content">
                    <div className="chatlist-nickname">{nicknames[chatroom.chatRoomId]}</div>
                    <Typography>
                      {chatroom.latestChat
                        ? `${timeFormat(chatroom.latestChat.createdAt)}`
                        : null}
                    </Typography>
                  </div>
                  <div >
                    <Typography
                      color="text.primary"
                    >
                      {chatroom.latestChat
                        ? chatroom.latestChat.message
                        : "(사진)"}
                    </Typography>
                    
                  </div>
                </div>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};
export default ChatList;
