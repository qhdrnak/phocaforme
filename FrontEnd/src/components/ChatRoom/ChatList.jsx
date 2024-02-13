import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { timeFormat } from "../../utils/timeFormat";

import { List, ListItem, ListItemText, Typography, Badge } from "@mui/material";

const ChatList = () => {
  const navigate = useNavigate();

  const moveChatRoom = (roomId, chatroom) => {
    navigate(`/chatroom/${roomId}`, { state: chatroom });
  };

  const loginUser = useSelector((state) =>
    state.user ? state.user.user.userId : null
  );

  const [chatLists, setChatLists] = useState([]);

  // 채팅 리스트 가져오기
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:8080/chatRoom`, {
          withCredentials: true,
        })
        .then((response) => {
          setChatLists(response.data);
        })
        .catch((error) => {
          console.error("Error ChatList:", error);
        });
    };
    fetchData();
  }, []);

  console.log(chatLists);
  console.log(loginUser);

  return (
    <div>
      <h1 className="chat-title">채팅목록</h1>
      {chatLists.length == 0 ? (
        <div className="chat-title">현재 진행중인 채팅이 없습니다!</div>
      ) : (
        <List sx={{ width: "100%", maxWidth: 500 }}>
          {chatLists.map((chatroom, index) => (
            <ListItem
              className={
                (chatroom.visiterId == loginUser &&
                  chatroom.latestChat.id !== chatroom.visitorLatestChatId) ||
                (chatroom.ownerId == loginUser &&
                  chatroom.latestChat.id !== chatroom.ownerLatestChatId)
                  ? "unread-chatlist-item"
                  : "chatlist-item"
              }
              key={index}
              onClick={() => moveChatRoom(chatroom.chatRoomId, chatroom)}
            >
              <ListItemText
                primary={
                  chatroom.ownerId !== loginUser
                    ? chatroom.visiterId
                    : chatroom.ownerId
                }
                secondary={
                  <div id="chatlist-info">
                    <React.Fragment>
                      <Typography
                        // sx={{ display: "inline" }}
                        component="div"
                        variant="body2"
                        color="text.primary"
                      >
                        {chatroom.latestChat
                          ? chatroom.latestChat.message
                          : "(이미지)"}
                      </Typography>
                      <Typography>
                        {chatroom.latestChat
                          ? `${timeFormat(chatroom.latestChat.createdAt)}`
                          : null}
                      </Typography>
                    </React.Fragment>
                  </div>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};
export default ChatList;
