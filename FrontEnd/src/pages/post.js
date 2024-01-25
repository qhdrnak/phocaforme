import { Container } from '@mui/material';
import MainPost from '../components/PostList/MainPost';

const post = () => {
    return (
        <Container>
            <h1>게시글페이지</h1>
            <MainPost />    
        
        </Container>
    );
};

export default post;

// 여기경로 
{/* <Route path="/post" element={<PostMain />} /> */}