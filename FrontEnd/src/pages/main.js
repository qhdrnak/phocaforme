import { Container } from '@mui/material';
import ChartTab from '../components/Chart/ChartTab';
import Search from '../components/Search/Search.jsx';
import PreviewPost from '../components/PostList/PreviewPost.jsx';


const main = () => {
    return (
        <Container>
            <div id='search-container'>
                <Search />
            </div>
            <ChartTab/>
            <PreviewPost />
        </Container>
    );
};

export default main;