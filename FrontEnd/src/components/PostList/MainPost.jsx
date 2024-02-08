import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';
import { Container, Box, Typography, Tabs, Tab } from "@mui/material";
import Card from "../../components/UI/Card";

const BasicTabs = () => {
  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => (state.user ? state.user.user : null)); 

  useEffect(() => {
    // 게시글 가져오기 요청
    axios.get('http://localhost:8080/barter')
      .then(response => {
        // 요청 성공 시 받은 데이터를 상태에 저장
        const data = response.data;
        setPosts(data); // 가져온 게시글을 상태에 저장
      })
      .catch(error => {
        // 요청 실패 시 에러 처리
        console.error('Error fetching posts:', error);
      });
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행됨

  return (
    <div>
      {posts.map(post => (
        post.title
      ))}
    </div>
    // <Container>
    //   {/* 가져온 데이터를 카드 형식으로 표시합니다. */}
    //   <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }}>
    //     {posts.map(post => (
    //       <Card
    //         key={post.id}
    //         title={post.title}
    //         images={post.images}
    //         ownMembers={post.ownMembers}
    //         targetMembers={post.targetMembers}
    //         content={post.content}
    //         type={post.type}
    //         isBartered={post.isBartered}
    //         isSold={post.isSold}
    //       />
    //     ))}
    //   </div>
    // </Container>
  );
};

export default BasicTabs;
