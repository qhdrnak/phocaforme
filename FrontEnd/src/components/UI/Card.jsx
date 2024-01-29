import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import img from '../../assets/images/NCT_도영.PNG';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
// 여기다가 onClick 만들어서 해당 게시글 상세페이지로 
// 이동되게 만들기 

  const { title, members, content, selectedValue } = props; 

	const exampleImg = img

  return (
    <Card sx={{ maxWidth: 220 }}>
			 {/* 카드 이미지  */}
      <CardMedia
        component="img"
        height="200"
        image={img}
        alt="Paella dish"
      />
			 {/* 카드 제목 */}
			<CardHeader
        action={
          <IconButton aria-label="settings">
          </IconButton>
        }
        title={title}
      />

			 			{/* 본문 */}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        {`있어요: ${members ? members.ownMember : '없음'} 구해요: ${members ? members.targetMember : '없음'}`} 
        </Typography>
      </CardContent>
    </Card>
  );
}
