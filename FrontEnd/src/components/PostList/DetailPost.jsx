import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar, Button } from "@mui/material";

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
    <div>
      <div>
        <h2 id="post-title">{post.title}</h2>
      </div>
      <div>
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {post.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index}`}
              style={{ width: "200px", height: "300px", margin: "5px" }}
            />
          ))}
        </div>
      </div>

      <div>
        {`구해요: ${post.targetMember} <-> 있어요: ${post.ownMember}`}
        <br />
        카드종류
      </div>
      <hr />
      <div>{post.content}</div>
      <Button variant="contained">1:1 채팅하기</Button>
    </div>
  );
};

export default DetailPost;
