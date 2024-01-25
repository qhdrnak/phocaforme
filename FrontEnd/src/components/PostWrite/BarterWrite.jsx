// 게시글(판매) 생성 페이지
import React, { useState } from "react";
import { TextField, Button, TextareaAutosize } from "@mui/material";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addPost } from '../../store2/post.js';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  max-height: 1000px;
  margin: auto;
  padding: 20px;
  border: 1px solid black;
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const BarterWrite = () => {
  // const dispatch = useDispatch();

  // 상태로 값 관리
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  // 제목 변경 핸들러
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // 이미지 변경 핸들러
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  // 내용 변경 핸들러
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  // 게시물 생성 버튼 클릭 핸들러
  const handleButtonClick = () => {
    console.log("게시물 생성");

    // 새로운 게시물 객체 생성
    const newPost = {
      title,
      image,
      content,
      // Add other properties as needed
    };

    // Redux를 통해 게시물 추가
    // dispatch(addPost(newPost));
    // TODO: navigate 추가해서 버튼을 누르면 전체 게시글 페이지로 이동하게 처리
    console.log(newPost)
  };

  return (
    <Container>
      <div>
        <Label>제목: </Label>
        <input
          width="100%"
          height="1px"
          value={title}
          onChange={handleTitleChange}
          variant="outlined"
          margin="normal"
        />
      </div>

      <Label>이미지업로드 </Label>
      <input type="file" accept="image/*" onChange={handleImageChange} />

      {imagePreview && (
        <img
          src={imagePreview}
          alt="Image Preview"
          style={{ maxWidth: "100%", maxHeight: "200px", marginTop: "10px" }}
        />
      )}

      {/* 가진거, 교환 원하는 거 여기다가 추가해야함*/}

      <Label>상세 게시글: </Label>
      <TextareaAutosize
        value={content}
        onChange={handleContentChange}
        placeholder="상세 게시글을 입력하세요."
      />

      <Button variant="contained" color="primary" onClick={handleButtonClick}>
        작성완료
      </Button>
    </Container>
  );
};

export default BarterWrite;
