import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Container,
  } from "@mui/material";

const DeletedPost = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };
  return (
    <Container id='deleted-post-container'>
      <div id='deleted-post-imoji'>😢</div>
      <h2 id='deleted-post-title'>이미 삭제된 게시글 입니다.</h2>
      <Button id='go-back-button' onClick={goBack}>뒤로가기</Button>
    </Container>
  );
};

export default DeletedPost;
