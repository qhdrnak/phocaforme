import * as React from "react";
import { useSelector } from "react-redux";

import { TextField, Button } from "@mui/material";

import { modifyPost } from "../../store2/loginUser.js";

import NicknameModal from "../UI/Modal/NicknameModal";

const Nickname = () => {
  const nickName = useSelector((state) => state.user.user.nickname);

  // 모달 관련
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div id="nickname-container">
      <div id="nickname-title">닉네임</div>
      <div id="nickname-input">
        <TextField size="small" disabled defaultValue={nickName} />
      </div>
      <Button variant="contained" onClick={handleOpen}>
        수정
      </Button>
      <NicknameModal open={open} handleClose={handleClose} />
    </div>
  );
};

export default Nickname;
