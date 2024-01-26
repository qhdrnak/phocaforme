// PostDetail.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DetailPost = () => {
  const { postId } = useParams();
  const posts = useSelector((state) => state.post ? state.post.posts : []);
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return <div>게시물이 없습니다.</div>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      {/* 게시물의 다른 정보를 여기에 표시할 수 있습니다. */}
    </div>
  );
};

export default DetailPost;
