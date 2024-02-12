import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useTheme } from "@mui/material/styles";

import {
  MenuItem,
  Menu,
  Typography,
  Box,
  Button,
  IconButton,
  Divider,
  Paper,
  Avatar,
} from "@mui/material";

import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

import { logoutUser } from "../../store2/loginUser.js";

import GPS from "./GPS";
import profile from "../../assets/images/no_bias.jpg";
import Cookies from "js-cookie";

const ProfileImage = () => {
  const theme = useTheme();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleClickUserMenu = async (to) => {
    setAnchorElUser(null);
    await navigate(to);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);


  const handleLogout = () => {
    // dispatch(logoutUser());
    window.location.href = "http://phocafor.me:4885/logout";
  };

  // useEffect 해서 랜더링할 때 db 에 있는 최애 정보 들고와라

  return (
    <div className="profile-image-container">
      <Box id="menu-container">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <img
            id="profile-image"
            className="profile-image gradient-border background-image"
            src={user.defaultMember ? user.defaultMember.idolImage : profile}
            
          ></img>
        </IconButton>
        <Paper sx={{ backgroundColor: theme.palette.primary.main }}>
          <Menu
            className="profile-container"
            sx={{ mt: "4rem" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            theme={theme}
          >
            <GPS />
            <Divider variant="middle" component="li" />
            <MenuItem
              onClick={async () => {
                await handleClickUserMenu("/chat");
              }}
            >
              <ChatOutlinedIcon className="dropdown-icon" />
              <Typography textAlign="center">나의 채팅함</Typography>
            </MenuItem>
            <MenuItem
              onClick={async () => {
                await handleClickUserMenu("/profile");
              }}
            >
              <PersonOutlinedIcon className="dropdown-icon" />
              <Typography textAlign="center">마이페이지</Typography>
            </MenuItem>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              onClick={handleLogout}
            >
              로그아웃
            </Button>
          </Menu>
        </Paper>
      </Box>
    </div>
  );
};

export default ProfileImage;
