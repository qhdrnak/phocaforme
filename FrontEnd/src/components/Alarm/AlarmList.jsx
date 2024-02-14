import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import { TaskAlt, Close, RadioButtonUnchecked } from "@mui/icons-material";

const InteractiveList = () => {
  const navigate = useNavigate();

  // 알림 데이터를 저장할 상태
  const [notifications, setNotifications] = useState([]);

  // 컴포넌트가 마운트될 때 알림 데이터를 가져오는 useEffect
  useEffect(() => {
    fetchNotifications();
  }, []);

  // 알림 데이터를 서버에서 가져오는 함수
  const fetchNotifications = async () => {
    try {
      const response = await axios.get("http://localhost:8080/notification",
      { withCredentials: true, }
      );
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // 알림 클릭 핸들러
  const handleItemClick = (item) => {
    if (item.notificationType === "Article") {
      console.log('click')
      navigate(`/post/${item.articleId}`);
    } else if (item.notificationType === "Chatting") {
      console.log('click')
      navigate(`/chat`);
    }
  };

  // 알림 읽음 처리 핸들러 // 여기서 delete 요청 보내면 될듯 
  const handleReadAlarm = (index) => {
    const updatedNotifications = [...notifications];
    updatedNotifications[index].isRead = !updatedNotifications[index].isRead;
    setNotifications(updatedNotifications);
  };

  return (
    <div>
      <div>
        <h1 className="alarm-title">알림리스트</h1>
        <FormControlLabel
          id="alarm-check-all"
          control={
            <Checkbox
              checked={notifications.every((item) => item.isRead)}
              onChange={() =>
                setNotifications((prevNotifications) =>
                  prevNotifications.map((item) => ({ ...item, isRead: true }))
                )
              }
              disabled={notifications.every((item) => item.isRead)}
            />
          }
          label="모두 읽음"
        />
      </div>

      <div>
        {notifications.length === 0 ? (
          <div>알림이 없습니다.</div>
        ) : (
          <List>
            {notifications.map((item, index) => (
              <ListItem
                key={index}
                onClick={() => handleItemClick(item)}
                className={item.isRead ? "alarm-read-item" : "alarm-item"}
                secondaryAction={
                  <>
                    <IconButton
                      edge="end"
                      onClick={() => handleReadAlarm(index)}
                    >
                      {item.isRead ? null : <Close />}
                    </IconButton>
                  </>
                }
              >
                <div className="alarm-item-container">
                  <ListItemAvatar>
                    {item.isRead ? <TaskAlt /> : <RadioButtonUnchecked />}
                  </ListItemAvatar>
                  <div className="alarm-text-container">
                    <ListItemText
                      className="alarm-content"
                      primary={item.notificationType}
                      secondary={item.content}
                    />
                    <span id="alarm-time">{item.sendTime}</span>
                  </div>
                </div>
              </ListItem>
            ))}
          </List>
        )}
      </div>
    </div>
  );
};

export default InteractiveList;
