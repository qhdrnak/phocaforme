import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";

import {
  Container,
  ImageList,
  ImageListItem,
  Chip,
  Avatar,
  Button,
} from "@mui/material";

const DetailPost = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  // 일단 주석 
  // const posts = useSelector((state) => (state.post ? state.post.posts : [])); //이건 필요 없을 듯?
  // const post = posts.find((p) => p.id === id); // 얘도 필요 없을 거 같은데
  const [post, setPost] = useState({});
  
  // console.log(id) 

  useEffect(() => {
    // API 호출
    axios.get(`http://localhost:8080/barter/${id}`)
      .then(response => {
        // API 응답 처리
        console.log(response.data)
        setPost(response.data);
      })
      .catch(error => {
        // 에러 처리
        console.error('Error fetching post:', error);
      });
  }, [id]); 

  console.log(post) // undefined
  // 내 게시글인지 판별
  const currentUser = useSelector((state) => state.user.user);
  // const isCurrentUserWriter = currentUser && currentUser.id === post.writerId;

  const handleChatClick = () => {
    // 채팅방 생성
    axios
      // .post(`http://localhost:8080/chatRoom/${id}`, 
      .post(`http://localhost:8080/chatRoom/1`, 
      null,
      {
        headers: {
          Authorization: `${document.cookie.match('(^|;) ?' + "token" + '=([^;]*)(;|$)')[2]}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        const chatRoomInfo = response.data;
        console.log(response.data);
        navigate(`/chatroom/${chatRoomInfo.chatRoomId}`, {state: chatRoomInfo});

      })
      .catch((error) => {
        // 요청 실패 시 에러 처리
        console.error("Error fetching posts:", error);
      }
    )
    // 해당 채팅방 id 리턴 받아서 그 채팅방으로 이동
    // navigate(`/chatroom/${chatRoomId}`, { state: id });
    // navigate(`/chatroom/${id}`);
  
  };

  const handleModifyClick = (id) => {
    console.log(id);
    navigate(`/modify/${id}`);
  };

  const handlePullupClick = () => {};

  return (
    <Container
      className={`card-style${
        post.isBartered || post.isSold ? " done-post" : ""
      }`}
    >
      {post.isBartered && (
        <div className="overlay">
          <p>교환완료</p>
        </div>
      )}
      {/* {post.isSold && (
        <div className="overlay">
          <p>판매완료</p>
        </div>
      )} */}
      <div>
        <div id="post-title-container">
          <h2>{post.title}</h2>
        </div>
        <hr />
        <div id="writer-type-container">
          {/* <div>작성자 ⯌ {post.writerNickname}</div> */}
          {/* <Chip
            id="card-type-container"
            label={post.cardType}
            size="small"
            sx={{ ml: 1 }}
          ></Chip> */}
        </div>
        <div id="image-list-container">
          <ImageList sx={{ display: "flex", width: "100%" }} rowHeight={200}>
            {/* {post.images.map((image, index) => (
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
            ))} */}
            <img
              src={post.imageUrl}
              loading="lazy"
              style={{
                width: "20vw",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </ImageList>
        </div>

        <div id="post-info-container">
          <div>
            {/* {post.type == "교환" ? ( */}
              <div>
                <div>
                  <div id="post-member-container">
                    {`있어요: ${post.ownMember
                      .map((member) => member.member_name)
                      .join(", ")}`}
                    {" ✦ "}
                    {`구해요: ${post.targetMember
                      .map((member) => member.member_name)
                      .join(", ")}`}
                  </div>
                </div>
                <div>
                  <div></div>
                </div>
              </div>
            {/* ) : ( */}
              {/* <div>
                <div>
                  {`멤버: ${post.ownMembers
                    .map((member) => member.value)
                    .join(", ")}`}
                </div>
              </div>
            )} */}
          </div>
        </div>
        <hr style={{ margin: "1rem 0" }} />
        <div id="post-content-container" style={{ whiteSpace: "pre-line" }}>
          {/* <div>{post.content}</div> */}
        </div>
      </div>

      <div id="chat-button-container">
        {/* {isCurrentUserWriter ? (
          <div>
            <Button
              id="modify-button"
              variant="contained"
              size="large"
              onClick={() => handleModifyClick(post.id)}
            >
              수정하기
            </Button>
            <Button
              id="pullup-button"
              variant="contained"
              size="large"
              onClick={handlePullupClick}
            >
              끌어올리기
            </Button>
          </div>
        ) : ( */}
          <Button
            id="chat-button"
            variant="contained"
            size="large"
            onClick={handleChatClick}
          >
            1:1 채팅하기
          </Button>
        {/* )} */}
      </div>
    </Container>
  );
};

export default DetailPost;
