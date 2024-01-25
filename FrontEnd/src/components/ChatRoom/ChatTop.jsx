import { Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";

import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Logout from "@mui/icons-material/Logout";

const ChatMenu = () => {
  const chatRoomInfo = {
    owner: "제노예요",
    title: "ISTJ A버전 구해요",
    visiterTime: ["16:58"],
    ownerTime: ["16:59"],
    visiterMessage: ["안녕하세요! 거래 희망합니다"],
    ownerMessage: ["네 결제요청 보낼게요~"],
  };

  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();

  const quitChatroom = () => {
    setAnchorEl(null);
    navigate("/chat");
  };

  const done = () => {
    setAnchorEl(null);
    navigate("/chat");
  };

  return (
    <div>
      <div id="chat-top">
        <div id="chat-top-left">
          <Typography variant="h5" component="div">
            {chatRoomInfo.owner}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {chatRoomInfo.title}
          </Typography>
        </div>
        <div id="chat-top-right">
          <MenuIcon id="hamburger-icon" />
          <IconButton
            onClick={handleClick}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MoreHorizIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            className="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            disableScrollLock
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                backgroundColor: "white",
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PaymentIcon />
              </ListItemIcon>
              결제요청
            </MenuItem>
            <MenuItem onClick={done}>
              <ListItemIcon>
                <CheckCircleOutlineIcon />
              </ListItemIcon>
              판매완료
            </MenuItem>
            <MenuItem onClick={quitChatroom}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              채팅창 나가기
            </MenuItem>
          </Menu>
        </div>
      </div>
      <Divider
        sx={{ height: 2, backgroundColor: theme.palette.primary.main }}
      />
    </div>
  );
};

export default ChatMenu;
