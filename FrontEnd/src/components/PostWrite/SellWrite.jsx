// 판매 - 교환 내용 다름
// 게시글(판매) 생성 페이지
// 그냥 BarterWrite에서 RadioButton 선택에 따른 값을 주고 
// 교환이면 교환탭 판매면 판매탭에 게시글 생성되게 하면 될 듯
import React, { useState } from "react";
import { TextField, Button, TextareaAutosize } from "@mui/material";
import styled from "styled-components";

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
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null); // 이미지는 파일을 업로드하는 거니까?
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // 근데 여기서 [ ] 안에 숫자는 최대 몇장 업로드할건지에 따라 바뀔 듯?
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

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleButtonClick = () => {
    console.log("게시물 생성");
    // 여기다가 navigate? 추가해서 버튼 누르면 전체 게시글 페이지로 이동하게 끔 하면 될 듯
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
        // rowsMin={4}
        placeholder="상세 게시글을 입력하세요."
      />

      <Button variant="contained" color="primary" onClick={handleButtonClick}>
        작성완료
      </Button>
    </Container>
  );
};

export default BarterWrite;
