import React, { useState, useEffect } from "react";
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

  // 메시지 전송
  const [value, setValue] = useState("");
  const [image, setImage] = useState("");

  // const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  // const [roomId, setRoomId] = useState(localStorage.getItem("roomId") || "");
  const [userEmail, setUserEmail] = useState(loginUser.userEmail || "");
  const [ws, setWs] = useState(null);
  // const [chatMessages, setChatMessages] = useState();

  useEffect(() => {
    // WebSocket 연결 설정
    const sock = new SockJS("http://localhost:8080/ws-stomp");
    const ws = Stomp.over(sock);

    ws.connect(
      {},
      (frame) => {
        setWs(ws);
        ws.subscribe("/sub/chat/room" + roomId, (message) => {
          const receive = JSON.parse(message.body);
          // alert(receive.imgCode);

          if (receive.imgCode != null) {
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

    // // #baseFile이 변할 때마다 감지
    // const handleFileChange = (e) => {
    //   if (e.target) {
    //     readImage(e.target);
    //   }
    // };

    // // 초기 렌더링 시에도 호출되도록 설정
    // handleFileChange({ target: document.getElementById("fileInput") });

    // 컴포넌트가 언마운트될 때 WebSocket 연결 해제
    return () => {
      ws.disconnect();
    };
  }, [roomId]);

  const sendMessage = (msg) => {
    if (ws && roomId && userEmail && msg) {
      ws.send(
        "/pub/chats/" + roomId,
        {},
        JSON.stringify({
          chatRoomId: roomId,
          userEmail: userEmail,
          message: value,
        })
      );
    }
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
            userEmail: userEmail,
            imgCode: e.target.result,
          })
        );
      };
      FR.readAsDataURL(input.files[0]);
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSetImage = (receive) => {
    const newMessage = {
      // chatId: 1,
      chatRoomId: receive.chatRoomId,
      sender: loginUser.name,
      message: "",
      imgCode: receive.imgCode,
      // sendTime: receive.createdAt,
      sendTime: getCurrentTime(),
      isPay: false,
    };
    updateMessages(newMessage);
    handleClose();
  };

  const handleSendClick = (receive) => {
    // if (receive && receive.imgCode) {
    // } else {
    // }
    sendMessage(value);
    setValue("");

    if (receive) {
      const newMessage = {
        // chatId: 1,
        chatRoomId: receive.chatRoomId,
        sender: loginUser.name,
        message: receive.message,
        imgCode: receive.imgCode,
        // sendTime: receive.createdAt,
        sendTime: getCurrentTime(),
        // isPay: false,
      };
      updateMessages(newMessage);
    }
  };

  // 엔터 키를 눌렀을 때도 send
  const handleSendEnter = (e) => {
    if (e.key === "Enter") {
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
    console.log(selectedFile);
    // readImage(e.target);

    // 이미지 전송 간 딜레이 추가 (예: 500ms)
    setTimeout(() => {
      readImage(e.target);
    }, 500);
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
          startAdornment: (
            <InputAdornment>
              <Add onClick={handleClick} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment>
              <ArrowCircleUp onClick={handleSendClick} fontSize="large" />
            </InputAdornment>
          ),
        }}
      ></TextField>
    </div>
  );
};

export default ChatSend;
