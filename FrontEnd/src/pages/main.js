import { Container } from '@mui/material';

import ChartTab from '../components/Chart/ChartTab';
import Search from '../components/Search/Search.jsx';
import PreviewPost from '../components/PostList/PreviewPost.jsx';
import MyCarousel from '../components/Carousel/Carousel.jsx';
import getUserIdFromCookie from '../utils/auth.js';
import Cookies from 'js-cookie';

const main = () => {
    const gggg = () => {
        const user = getUserIdFromCookie();
        console.log(user.userId)
        console.log(user.nickname)
    }
    
    return (
        <Container>
            <h1 onClick={gggg}>userId:</h1>
            <div id='search-container'>
                <Search />
            </div>
            <MyCarousel />
            <ChartTab/>
            <PreviewPost />
        </Container>
    );
};

export default main;