import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Container, Button } from "@mui/material";
import RadioButton2 from "../../components/UI/RadioButton2.jsx";
import BarterModify from "./BarterModify.jsx";
import SellModify from "./SellModify.jsx";
import AddIcon from "@mui/icons-material/Add";
import TypeDropdown from "../UI/Dropdown/TypeDropdown.jsx";


const PostModify = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cardType, setCardType] = useState(null);
  ////
  // const [ownMembers, setOwnMembers] = useState(post.ownMembers);
  // const [targetMembers, setTargetMembers] = useState(
  //   post.type === "교환" ? post.targetMembers : []
  // );
  const [ownMembers, setOwnMembers] = useState(null); // null로 해야할지 []로 해야할지
  const [targetMembers, setTargetMembers] = useState(null);

  // const [cardType, setCardType] = useState(post.cardType);

  const handleOwnMemberSelection = (members) => {
    setOwnMembers(members);
  };

  const handleTargetMemberSelection = (members) => {
    setTargetMembers(members);
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

  ////
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://phocafor.me/api/barter/${id}`,
        { withCredentials: true }
        );
        console.log(response.data)
        setPost(response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
        setImages(response.data.images);
        setImagePreviews(response.data.photos.map(photo => `https://photocardforme.s3.ap-northeast-2.amazonaws.com/${photo}`));
        setOwnMembers(response.data.ownIdolMembers);
        setTargetMembers(response.data.findIdolMembers);
        setCardType(response.data.cardType)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

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

  const handleModifyClick = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      images.forEach((image) => {
        formData.append("images", image);
      });

      await axios.put(`https://phocafor.me/api/barter/${id}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/post");
    } catch (error) {
      console.error("Error modifying post:", error);
    }
  };

  const handleCancelButton = () => {
    console.log("게시물 수정 취소");
    navigate("/post");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h2 className="write-title">게시글 수정하기</h2>
      <div id="write-container">
        <div id="write-radio-container">
          <RadioButton2 defaultType={post.cardType} />
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
          {post.cardType === "교환" ? (
            <BarterModify
              defaultGroup={post.group}
              defaultOwnMember={ownMembers}
              defaultTargetMember={targetMembers}
              onChange={(ownMembers, targetMembers) => {
                handleOwnMemberSelection(ownMembers);
                handleTargetMemberSelection(targetMembers);
              }}
            />
          ) : (
            <SellModify
              defaultGroup={post.group}
              defaultOwnMember={ownMembers}
              onChange={(ownMembers) => {
                handleOwnMemberSelection(ownMembers);
              }}
            />
          )}
        </div>
        <div id="card-input">
          <h3>포토카드 종류</h3>
          {/* <TypeDropdown
            defaultCardType={cardType}
            onChange={(type) => {
              handleTypeChange(type);
            }}
          /> */}
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
          <textarea
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
            onClick={handleModifyClick}
            style={{ marginRight: "10px" }}
          >
            수정
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

export default PostModify;
