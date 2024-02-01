import React, { useState } from "react";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { sendChat } from "../../../store2/chat.js";
import getCurrentTime from "../../../utils/currentTime.js";

import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Divider } from "@mui/material";

const PayModal = ({ open, handleClose }) => {
  const { roomId } = useParams();
  const loginUser = useSelector((state) =>
    state.user ? state.user.user.name : ""
  );
  console.log(roomId);
  const dispatch = useDispatch();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    bgcolor: "background.paper",
    borderRadius: "10px",
    p: 4,
  };

  // 수량, 배송비 인풋 관련
  const [amount, setAmount] = useState(1);
  const [fee, setFee] = useState(0);
  const [total, setTotal] = useState(0);

  // 최대 수량 제한
  const max_amount = 3;

  // 임시 포카 가격 지정
  const price = 10000;

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setTotal(amount * price + parseInt(fee));
  };

  const handleIncrease = () => {
    setAmount((prevAmount) =>
      prevAmount + 1 > max_amount ? prevAmount : prevAmount + 1
    );
    setTotal(amount * price + parseInt(fee));
  };

  const handleDecrease = () => {
    setAmount((prevAmount) => (prevAmount > 1 ? prevAmount - 1 : 1));
    setTotal(amount * price + parseInt(fee));
  };

  const handleFeeChange = (e) => {
    setFee(e.target.value);
    setTotal(amount * price + parseInt(fee));
  };

  const handleSend = () => {
    const newMessage = {
      chatId: 1,
      chatRoomId: roomId,
      sender: loginUser,
      message: `[결제 요청서]\n\n거래수량 ${amount} 개\n배송비 ${fee} 원\n----------------\n총 금액 ${total} 원`,
      imgCode: "",
      sendTime: getCurrentTime(),
      isPay: true,
    };
    dispatch(sendChat(newMessage));
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box id="nickname-modal-container" sx={style}>
        <h2 id="pay-modal-title">결제 전송 창</h2>
        <div id="pay-modal-container">
          <div className="pay-input-container">
            <div className="pay-label">판매수량</div>
            <div className="unit-container">
              <IconButton onClick={handleDecrease} size="small">
                <RemoveIcon />
              </IconButton>
              <TextField
                value={amount}
                className="pay-input"
                onChange={handleAmountChange}
                size="small"
                placeholder=""
                sx={{ width: "30%" }}
              />
              <IconButton onClick={handleIncrease} size="small">
                <AddIcon />
              </IconButton>
              <div>개</div>
            </div>
          </div>
          <div className="pay-input-container">
            <div className="pay-label">배송비</div>
            <div className="unit-container">
              <TextField
                className="pay-input"
                value={fee}
                onChange={handleFeeChange}
                size="small"
                placeholder=""
                sx={{ mr: 1 }}
              />
              <div>원</div>
            </div>
          </div>
          <Divider id="pay-divider" flexItem />
          <div className="pay-input-container">
            <div className="pay-label">총 금액</div>
            <div id="total-price">{total} 원</div>
          </div>
        </div>
        <div id="pay-buttons">
          <Button onClick={handleSend} color="secondary" variant="contained">
            결제전송
          </Button>
          <Button
            sx={{ ml: 0.5 }}
            onClick={handleClose}
            color="warning"
            variant="contained"
          >
            취소
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default PayModal;
