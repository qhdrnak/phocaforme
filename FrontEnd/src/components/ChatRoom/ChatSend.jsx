import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

import { useTheme } from "@mui/material/styles";
import { sendChat } from "../../store2/chat.js";
import getCurrentTime from "../../utils/currentTime";

import { TextField, InputAdornment, Popover } from "@mui/material";
import { ArrowCircleUp, Add, Image } from "@mui/icons-material";

const ChatSend = ({ roomId, loginUser, updateMessages }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  // 메시지 전송
  const [value, setValue] = useState("");
  const [image, setImage] = useState("");

  const [ws, setWs] = useState(null);
  const [receive, setReceive] = useState("");

  useEffect(() => {
    // WebSocket 연결 설정
    const sock = new SockJS("http://localhost:8080/ws-stomp");
    const ws = Stomp.over(sock);

    ws.connect(
      {'Authorization': document.cookie.match('(^|;) ?' + "token" + '=([^;]*)(;|$)')[2]},
      (frame) => {
        setWs(ws);
        ws.subscribe("/sub/chat/room" + roomId, (message) => {
          const receive = JSON.parse(message.body);
          // alert(receive.imgCode);
          
          if (receive.imgCode !== null) {
            receiveImg(receive);
          } else {
            receiveMessage(receive);
          }
        });
        
      },
      (error) => {
        alert("error" + error);
      }
    );

    // #baseFile이 변할 때마다 감지
    const handleFileChange = (e) => {
      if (e.target) {
        readImage(e.target);
      }
    };

    // 초기 렌더링 시에도 호출되도록 설정
    handleFileChange({ target: document.getElementById("fileInput") });

    // 컴포넌트가 언마운트될 때 WebSocket 연결 해제
    return () => {
      ws.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (ws && roomId && loginUser && value) {
      ws.send(
        "/pub/chats/" + roomId,
        {},
        JSON.stringify({
          chatRoomId: roomId,
          userEmail: loginUser.nickname,
          message: value,
        })
      );
    }
    setValue("");
  };

  const receiveMessage = (receive) => {
    handleSendClick(receive);
  };

  const receiveImg = (receive) => {
    handleSetImage(receive);
  };

  const readImage = (input) => {
    if (input.files && input.files[0]) {
      const FR = new FileReader();
      FR.onload = function (e) {
        ws.send(
          "/pub/chats/" + roomId,
          {},
          JSON.stringify({
            chatRoomId: roomId,
            userEmail: loginUser.nickname,
            imgCode: e.target.result,
          })
        );
      };
      FR.readAsDataURL(input.files[0]);
    }
  };

  const handleChange = (event) => {
    setValue((prevValue) => event.target.value);
  };

  const handleSetImage = (receive) => {
    const newMessage = {
      chatRoomId: roomId,
      createdAt: new Date().toISOString(),
      imgCode: receive.imgCode,
      message: "",
      userEmail: loginUser.userId,
      isPay: false,
    };
    updateMessages(newMessage);
    handleClose();
  };

  const handleSendClick = () => {
      const newMessage = {
        chatRoomId: roomId,
        createdAt: new Date().toISOString(),
        imgCode: null,
        message: value,
        userEmail: loginUser.userId,
      };
      updateMessages(newMessage);
      sendMessage();
  };

  // 엔터 키를 눌렀을 때도 send
  const handleSendEnter = (e) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendClick();
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

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileSelection = (e) => {
    const selectedFile = document.getElementById("fileInput").files[0];
    readImage(e.target);
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
              <Image id="image-icon" onClick={triggerFileInput} />
              <input
                type="file"
                id="fileInput"
                onChange={handleFileSelection}
              />
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
          inputProps: {
            ref: inputRef,
          },
          startAdornment: (
            <InputAdornment>
              <Add onClick={handleClick} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment>
              <ArrowCircleUp id="sendIcon" onClick={handleSendClick} fontSize="large" />
            </InputAdornment>
          ),
        }}
      ></TextField>
    </div>
  );
};

export default ChatSend;