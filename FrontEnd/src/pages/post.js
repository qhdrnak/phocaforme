import { useSelector } from "react-redux";

import { Container } from '@mui/material';
import MainPost from '../components/PostList/MainPost';
import SearchResult from '../components/PostList/SearchResult';
import Search from '../components/Search/Search.jsx';



const Post = () => {
    
    const searchs = useSelector((state) =>
        state.search.searchs ? state.search.searchs : null);
    
    return (
        <Container>
            <h1 className="post-page-title">게시글페이지</h1>
            <Search/>
            {searchs ? <SearchResult/> : <MainPost/>}

            {/* <MainPost /> */}

        </Container>
    );
};

export default Post;

// 여기경로 
{/* <Route path="/post" element={<PostMain />} /> */}