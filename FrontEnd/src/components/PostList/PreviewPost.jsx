import React from "react";
import { useNavigate } from "react-router-dom";

import { Container, Button, TextareaAutosize } from "@mui/material";

import MainPost from "../../components/PostList/MainPost.jsx";

const PreviewPost = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/post");
  };

  return (
    <Container id="preview-container">
      <h2 className="main-title">둘러보기 🔍</h2>
      <MainPost isPreview={true} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          size="large"
          color="primary"
          // style={{ marginRight: "10px" }}
          onClick={handleButtonClick}
        >
          + 더보기
        </Button>
      </div>
    </Container>
  );
};

export default PreviewPost;
