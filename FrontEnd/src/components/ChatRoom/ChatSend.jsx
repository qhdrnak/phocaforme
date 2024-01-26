import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import * as React from "react";
import { useState } from "react";
import Popover from "@mui/material/Popover";
import { useTheme } from "@mui/material/styles";

import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import AddIcon from "@mui/icons-material/Add";
import ImageIcon from "@mui/icons-material/Image";

const ChatSend = ({ updateMessages, getCurrentTime }) => {
  const theme = useTheme();

  // 메시지 전송
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSendClick = () => {
    console.log("전송 : ", value);
    const currentTime = getCurrentTime();
    const newMessage = {
      time: currentTime,
      message: value,
      type: "chat-owner",
    };

    updateMessages(newMessage);
    setValue("");
  };

  // 엔터 키를 눌렀을 때도 send
  const handleSendEnter = (e) => {
    if (e.key === "Enter" && value.trim() !== "") {
      console.log("전송 w/ enter: ", value);

      const currentTime = getCurrentTime();
      const newMessage = {
        time: currentTime,
        message: value,
        type: "chat-owner",
      };

      updateMessages(newMessage);
      setValue("");
    }
  };

  // 사진첨부 팝업
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div
      sx={{
        width: 500,
        maxWidth: "100%",
      }}
    >
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div id="add-popover-container">
          <div id="image-icon-container">
            <div id="image-icon-background">
              <ImageIcon id="image-icon" />
            </div>
            <p>사진</p>
          </div>
        </div>
      </Popover>
      <TextField
        fullWidth
        id="fullWidth"
        placeholder="메시지를 입력하세요"
        value={value}
        onChange={handleChange}
        onKeyDown={handleSendEnter}
        InputProps={{
          startAdornment: (
            <InputAdornment>
              <AddIcon onClick={handleClick} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment>
              <ArrowCircleUpIcon onClick={handleSendClick} fontSize="large" />
            </InputAdornment>
          ),
        }}
      ></TextField>
    </div>
  );
};

export default ChatSend;
