// 게시글(판매) 생성 페이지
import React, { useState } from "react";
import { TextField, Button, TextareaAutosize } from "@mui/material";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addPost } from '../../store2/post.js';
import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
import RadioButton2 from "../../components/UI/RadioButton2.jsx";
import SearchBar from '../../components/Search/SearchBar.jsx';
import SearchContainer from '../../components/Search/SearchBar.jsx';
import onExchangeChange from '../../components/Search/SearchBar.jsx';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  max-height: 1000px;
  margin: auto;
  padding: 20px;
  
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const BarterWrite = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 상태로 값 관리
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isExchange, setIsExchange] = useState(true);
  const [selectedMembers, setSelectedMembers] = useState({
    ownMember: '',
    targetMember: '',
  })

  const handleOwnMemberSelection = (selectedMember) => {
    setSelectedMembers((prev) => ({
      ...prev,
      ownMember: selectedMember,
    }));
  };

  const handleTargetMemberSelection = (selectedMember) => {
    setSelectedMembers((prev) => ({
      ...prev,
      targetMember: selectedMember,
    }));
  };

  function onExchangeChange(value) {
    setIsExchange(value === "option1");
  }

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
      selectedMembers,
      type: isExchange ? "교환" : "판매",
      // Add other properties as needed
    };

    // Redux를 통해 게시물 추가
    dispatch(addPost(newPost));
    // TODO: navigate 추가해서 버튼을 누르면 전체 게시글 페이지로 이동하게 처리
    navigate('/post');
    console.log(newPost.selectedMembers);
  };
  
  const handleCancelButton = () => {
    console.log('게시물 생성 취소')
    navigate('/post');
  }

  return (
    <Container>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <Label>제목</Label>
        <input
          value={title}
          onChange={handleTitleChange}
          variant="outlined"
          margin="normal"
          style={{
            backgroundColor: "#F2F4F8",
            width: 450,
            height: 40,
            border: 'none',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)'
          }}
          placeholder="앨범명, 버전명을 입력하세요"
          
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        <RadioButton2 onChange={onExchangeChange} />
        <div style={{ marginBottom: '10px' }}>
          <Label></Label>
          <SearchContainer />
        </div>
        {/* <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
          <div style={{ flex: 1, marginRight: '10px' }}>
            <Label>보유한 멤버</Label>
            <SearchContainer 
              value={selectedMembers.ownMember}
              onSelect={handleOwnMemberSelection} 
            />
          </div>
          <div style={{ flex: 1 }}>
            <Label>찾는 멤버</Label>
            <SearchContainer 
              value={selectedMembers.targetMember}
              onSelect={handleTargetMemberSelection}
            />
          </div>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <Label>포토카드 종류</Label>
          <SearchContainer />
        </div> */}
      </div>

      <div style={{display: 'flex', flexDirection: 'column'}}>
          <Label>사진</Label>
          <input type="file" accept="image/*" onChange={handleImageChange} />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Image Preview"
              style={{ maxWidth: "30%", maxHeight: "200px", marginTop: "10px" }}
            />
          )}

      </div>
      
      <Label>내용 </Label>
      <TextareaAutosize
        value={content}
        onChange={handleContentChange}
        placeholder="상세 게시글을 입력하세요."
        style={{
          width: 380,
          height: 100,
          overflow: 'visible',

        }}
      /> 
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
        <Button variant="contained" color="primary" onClick={handleButtonClick} style={{marginRight: '10px'}}>
          등록
        </Button>
        <Button variant="contained" color="primary" onClick={handleCancelButton}>
          취소
        </Button>
      </div>
    </Container>
  );
};

export default BarterWrite;

//이미지추가
{/* 
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