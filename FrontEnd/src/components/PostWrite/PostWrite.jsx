// 게시글 생성 페이지
import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addPost } from "../../store2/post.js";

import { Container, TextField, Button, TextareaAutosize } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import RadioButton2 from "../../components/UI/RadioButton2.jsx";
import BarterWrite from "./BarterWrite.jsx";
import SellWrite from "./SellWrite.jsx";
import TypeDropdown from "../UI/Dropdown/TypeDropdown.jsx";
import axios from 'axios'

const PostWrite = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [content, setContent] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isExchange, setIsExchange] = useState(true);
  const [ownIdolMembers, setownIdolMembers] = useState([]);
  const [findIdolMembers, setfindIdolMembers] = useState([]);
 
  // 카드 타입 핸들러
  const [cardType, setCardType] = useState(null);

  const posts = useSelector((state) => (state.post ? state.post.posts : []));
  const user = useSelector((state) => (state.user ? state.user.user : [])); 

  // 교환인지 판매인지
  function onExchangeChange(value) {
    setIsExchange(value === "교환");
  }

  const handleOwnMemberSelection = (members) => {
    setownIdolMembers(members);
  };

  const handleTargetMemberSelection = (members) => {
    setfindIdolMembers(members);
  };

  const handleTypeChange = (cardType) => {
    if (cardType == null) {
      cardType = {
        value: "",
        label: "",
      };
    }
    setCardType(cardType);
  };

  // 제목 변경 핸들러
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // 이미지 변경 핸들러
  const handleImageDelete = (index) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(index, 1);
      return newImages;
    });

    setImagePreviews((prevImagePreviews) => {
      const newImagePreviews = [...prevImagePreviews];
      newImagePreviews.splice(index, 1);
      return newImagePreviews;
    });
  };

  const fileInputRef = useRef(null);
  const handleImageAdd = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    setImages((prevImages) => [...prevImages, ...Array.from(files)]);

    const newImages = Array.from(files);
    const newImagePreviews = [];

    newImages.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImagePreviews.push(reader.result);
        // 모든 파일의 미리보기 이미지가 준비되면 상태 업데이트
        if (newImagePreviews.length === newImages.length) {
          setImagePreviews((prevImagePreviews) => [
            ...prevImagePreviews,
            ...newImagePreviews,
          ]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // 내용 변경 핸들러
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  // 게시물 생성 버튼 클릭 핸들러
  const handlePostClick = () => {
    // 새로운 게시물 객체 생성
    const newPost = new FormData();
    newPost.append("title", title);
    newPost.append("content", content);
    ownIdolMembers.forEach(memberId => {
      newPost.append('ownIdolMembers', memberId);
    });
    
    findIdolMembers.forEach(memberId => {
      newPost.append('findIdolMembers', memberId);
    });
    newPost.append("cardType", isExchange ? "교환" : "판매");
    images.forEach((image) => {
      newPost.append(`photos`, image);
    });
    
    // console.log(newPost)

    // formdata값확인용 코드 //////
    const formDataToJson = (formData) => {
      const jsonObject = {};
      for (const [key, value] of formData.entries()) {
        jsonObject[key] = value;
      }
      return JSON.stringify(jsonObject);
    };
    
    const test = formDataToJson(newPost);
    console.log(test);
    // navigate("/post");    
      
        axios.post('http://localhost:8080/barter', newPost, {
          withCredentials: true, // withCredentials 옵션 설정
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(response => {
          console.log(response.data);
          // navigate("/post"); 
        })
        .catch(error => {
          console.error('Error creating post:', error);
        });    

  };

  const handleCancelButton = () => {
    console.log("게시물 생성 취소");
    navigate("/post");
  };

  return (
    <Container>
      <h2 className="write-title">게시글 작성하기</h2>

      <div id="write-container">
        <div id="write-radio-container">
          <RadioButton2 onChange={onExchangeChange} />
        </div>
        <div id="title-container">
          <h3>제목</h3>
          <input
            id="title-input"
            value={title}
            onChange={handleTitleChange}
            variant="outlined"
            placeholder="앨범명, 버전명을 입력하세요"
          />
        </div>

        <div id="group-member-input">
          {isExchange ? (
            <BarterWrite
              onChange={(ownIdolMembers, findIdolMembers) => {
                handleOwnMemberSelection(ownIdolMembers);
                handleTargetMemberSelection(findIdolMembers);
              }}
            />
          ) : (
            <SellWrite
              onChange={(ownIdolMembers) => {
                handleOwnMemberSelection(ownIdolMembers);
              }}
            />
          )}
        </div>
        <div id="card-input">
          <h3>포토카드 종류</h3>
          <TypeDropdown
            onChange={(type) => {
              handleTypeChange(type);
            }}
          />
        </div>
        <div id="image-input">
          <div>
            <h3>사진 (클릭시 삭제됩니다.)</h3>
            <p className="info-msg">
              * 사진 사이즈는 포토카드 사이즈가 좋아요!
            </p>
          </div>
          <div id="image-list">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              ref={fileInputRef}
              multiple
            />
            <div id="image-add-button" onClick={handleImageAdd}>
              <AddIcon id="image-add-icon" />
            </div>
            {imagePreviews &&
              imagePreviews.map((preview, index) => (
                <div
                  className="image-container"
                  key={index}
                  onClick={() => handleImageDelete(index)}
                >
                  <img
                    className="image-preview"
                    src={preview}
                    alt={`Image Preview ${index + 1}`}
                  />
                </div>
              ))}
          </div>
        </div>
        <div id="content-input-container">
          <h3>상세 내용</h3>
          <input
            className="content-input"
            value={content}
            onChange={handleContentChange}
            placeholder="포토카드 상태에 대한 세부 내용을 적어주세요."
          />
        </div>
        <div id="button-container">
          <Button
            variant="contained"
            color="primary"
            onClick={handlePostClick}
            style={{ marginRight: "10px" }}
          >
            등록
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={handleCancelButton}
          >
            취소
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default PostWrite;
