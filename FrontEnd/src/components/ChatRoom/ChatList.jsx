import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { useNavigate } from "react-router-dom";

export default function ChatList() {
  const visiterList = ["아궁빵뎡", "제노예요", "김필릭스용복"];
  const lastMessageList = [
    "안녕하세요 거래 희망합니다!",
    "혹시 교환 완료되었나요?",
    "저요 제가 아니면 안돼요",
  ];
  const roomIdList = [1, 2, 3];

  const navigate = useNavigate();

  const moveChatRoom = (roomId) => {
    navigate(`/chatroom/${roomId}`);
  };

  return (
    <Container>
      <h2 className="chat-title">채팅목록</h2>
      <List sx={{ width: "100%", maxWidth: 500 }}>
        {visiterList.map((visitor, index) => (
          <ListItem
            className="chatlist-item"
            key={index}
            onClick={() => moveChatRoom(index)}
          >
            {/* <NotificationsIcon id="chat-alarm-icon" /> */}
            <ListItemText
              primary={visitor}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {lastMessageList[index]}
                  </Typography>
                  {" messageTime"}
                </React.Fragment>
              }
            />
            <Badge
              badgeContent={1}
              color="primary"
              sx={{ marginRight: 2, marginTop: 3.5 }}
            ></Badge>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
