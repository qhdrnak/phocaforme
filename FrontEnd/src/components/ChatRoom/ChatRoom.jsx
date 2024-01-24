import { Container, Divider } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import Typography from "@mui/material/Typography";
import PushPinRoundedIcon from "@mui/icons-material/PushPinRounded";

const ChatRoom = () => {
  const { roomId } = useParams();
  const theme = useTheme();

  return (
    <Container>
      <h2>채팅 내용</h2>
      <div id="chat-container">
        <div id="chat-top">
          <Typography variant="h5" component="div">
            ownerName
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            content-title
          </Typography>
          <Divider
            sx={{ height: 2, backgroundColor: theme.palette.primary.main }}
          />
        </div>
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
        <div id="chat-message-container"></div>
        <div id="send-message-container"></div>
      </div>
      <div id="chat-list-container"></div>
    </Container>
  );
};

export default ChatRoom;
