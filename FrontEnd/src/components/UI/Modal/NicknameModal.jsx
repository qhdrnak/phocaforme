// import * as React from "react";
import React, { useState } from "react";
import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const NicknameModal = ({ open, handleClose }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "10px",
    p: 4,
  };
  // 닉네임 인풋 관련
  const [inputValue, setInputValue] = useState("");
  const minLength = 2;

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (inputValue.length < minLength) {
      alert("닉네임은 2글자 이상이어야 합니다.");
    } else {
      // 닉네임 중복 체크
      // 중복 아니어야 확인 버튼 클릭 가능
    }
  };

  // 닉네임 업데이트

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div id="nickname-setting-title">새로운 닉네임</div>
        <div id="nickname-setting-container">
          <div>
            <TextField
              value={inputValue}
              onChange={handleChange}
              helperText={
                inputValue.length < minLength ? "글자 수가 부족합니다." : ""
              }
              error={inputValue.length < minLength}
              size="small"
              placeholder=""
            />
            <Button onClick={handleSubmit} variant="contained">
              중복확인
            </Button>
          </div>
        </div>
        <div id="nickname-setting-button">
          <Button onClick={handleClose} color="secondary" variant="contained">
            확인
          </Button>
          <Button onClick={handleClose} color="success" variant="contained">
            취소
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default NicknameModal;
