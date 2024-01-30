import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Container,
  ImageList,
  ImageListItem,
  Chip,
  Avatar,
  Button,
} from "@mui/material";

const DetailPost = () => {
  const { id } = useParams();
  const posts = useSelector((state) => (state.post ? state.post.posts : []));
  const post = posts.find((p) => p.id == id);
  // const getImageUrls = () => {
  //   // 포스트 객체에서 이미지 URL 배열을 가져오는 로직을 구현
  //   // 예를 들어, post.images가 이미지 URL 배열을 가진다고 가정하면:
  //   return post.images;
  // }

  return (
    <Container>
      <div>
        <div id="post-title-container">
          <h2>{post.title}</h2>
        </div>
        <hr />
        <div id="writer-type-container">
          <div>작성자 ⯌ {post.writerNickname}</div>
          <Chip
            id="card-type-container"
            label={post.cardType}
            size="small"
            sx={{ ml: 1 }}
          ></Chip>
        </div>
        <div id="image-list-container">
          <ImageList sx={{ display: "flex", width: "100%" }} rowHeight={200}>
            {post.images.map((image, index) => (
              <ImageListItem key={index}>
                <img
                  src={image}
                  loading="lazy"
                  style={{
                    width: "20vw",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </div>

        <div id="post-info-container">
          <div>
            {post.type == "교환" ? (
              <div>
                <div>
                  <div id="post-member-container">
                    {`있어요: ${post.ownMembers
                      .map((member) => member.value)
                      .join(", ")}`}
                    {" ⯌ "}
                    {`구해요: ${post.targetMembers
                      .map((member) => member.value)
                      .join(", ")}`}
                  </div>
                </div>
                <div>
                  <div></div>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  {`멤버: ${post.ownMembers
                    .map((member) => member.value)
                    .join(", ")}`}
                </div>
              </div>
            )}
          </div>
        </div>
        <hr style={{ margin: "1rem 0" }} />
        <div id="post-content-container" style={{ whiteSpace: "pre-line" }}>
          <div>{post.content}</div>
        </div>
      </div>

      <div id="chat-button-container">
        <Button id="chat-button" variant="contained" size="large">
          1:1 채팅하기
        </Button>
      </div>
    </Container>
  );
};

export default DetailPost;
