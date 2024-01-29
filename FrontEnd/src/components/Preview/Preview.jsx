import React from 'react';
import MainPost from '../../components/PostList/MainPost.jsx';
import { TextField, Button, TextareaAutosize } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const Preview = () => {
	const navigate = useNavigate();
	const handleButtonClick = () => {
		navigate('/post');
	}

	return (
		<div>
			<h2>둘러보기</h2>
			<MainPost isPreview={true} />
			<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
        <Button 
					variant="contained" 
					color="primary" 
					style={{marginRight: '10px'}}
					onClick={handleButtonClick}	
				>
          + 더보기
        </Button>
      </div>
		</div>
	)
}

export default Preview;