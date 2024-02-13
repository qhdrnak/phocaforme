import React, { useState, useEffect } from "react";
import { useSelector,  } from "react-redux";
import { useNavigate,  } from "react-router-dom";

import axios from 'axios';

import { timeFormat } from "../../utils/timeFormat";

import { List, ListItem, ListItemText, Typography, Badge } from "@mui/material";

const ChatList = () => {
  const navigate = useNavigate();

  const moveChatRoom = (roomId, chatroom) => {
    navigate(`/chatroom/${roomId}`, { state: chatroom });
  };

  const loginUser = useSelector((state) =>
    state.loginUser ? state.loginUser.user.userId : null
  );

  const [chatLists, setChatLists] = useState([]);

  // 채팅 리스트 가져오기
  useEffect(() => {
    const fetchData = async () => {
      await axios
      .get(`http://localhost:8080/chatRoom`, 
      {
        withCredentials: true,
      })
      .then(response => {
        setChatLists(response.data);
      })
      .catch(error => {
        console.error('Error ChatList:', error);
      });
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="chat-title">채팅목록</h1>
      <List sx={{ width: "100%", maxWidth: 500 }}>
        {chatLists.map((chatroom, index) => (
          <ListItem
            className="chatlist-item"
            key={index}
            onClick={() =>
              moveChatRoom(chatroom.chatRoomId, chatroom)
            }
          >
            <ListItemText
              primary={
                chatroom.ownerId !== loginUser
                  ? chatroom.visiterId
                  : chatroom.ownerId
              }
              secondary={
                <div id='chatlist-info'>

                <React.Fragment>
                  <Typography
                    // sx={{ display: "inline" }}
                    component="div"
                    variant="body2"
                    color="text.primary"
                  >
                    {chatroom.latestChat ? chatroom.latestChat.message : "(이미지)"}
                  </Typography>
                  <Typography>
                    {chatroom.latestChat ? `${timeFormat(chatroom.latestChat.createdAt)}` : null}
                  </Typography>
                </React.Fragment>
                </div>
              }
              />
            <Badge
              badgeContent={chatroom.ownerLatestChatId !== chatroom.visitorLatestChatId ? "T" : "F"}
              color="primary"
              sx={{ marginRight: 2 }}
            ></Badge>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
export default ChatList;
