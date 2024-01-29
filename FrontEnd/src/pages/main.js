import { Container } from '@mui/material';
import ChartTab from '../components/Chart/ChartTab';
import Search from '../components/Search/Search.jsx';
import Preview from '../components/Preview/Preview.jsx';


const main = () => {
    return (
        <Container>
            <h1>메인페이지</h1>
            <Search />
            <ChartTab/>
            <Preview />
        </Container>
    );
};

export default main;