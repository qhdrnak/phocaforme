// PostDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import img1 from '../../assets/images/NCT_도영.PNG';
import img2 from '../../assets/images/NCT_제노.PNG';
import { Avatar, Button } from "@mui/material";

const DetailPost = () => {
  const { postId } = useParams();
  const posts = useSelector((state) => state.post ? state.post.posts : []);
  const post = posts.find((p) => p.id === postId);
  // const getImageUrls = () => {
  //   // 포스트 객체에서 이미지 URL 배열을 가져오는 로직을 구현
  //   // 예를 들어, post.images가 이미지 URL 배열을 가진다고 가정하면:
  //   return post.images;
  // }
  const images = [img1, img2]
  const ownMember = '사람1'
  const targetMember = '사람2'
  const contentMsg = '사람1로 사람2 구합니다'

  return (
    <div style={{}}>
      <div>
        <h1>[ISTJ] 제노 A버전으로 해찬이 A버전 구해요</h1>
        
      </div>

      <div>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Image ${index}`} style={{ width: '200px', height: '300px', margin: '5px' }} />
          ))}
        </div>
      </div>

      <div>
        {`구해요: ${targetMember} <-> 있어요: ${ownMember}`}
        <br/>카드종류
      </div>
      <hr/>
      <div>
        {contentMsg}
      </div>
      <Button variant="contained">
        1:1 채팅하기
      </Button>

    </div>
  );
};

export default DetailPost;
