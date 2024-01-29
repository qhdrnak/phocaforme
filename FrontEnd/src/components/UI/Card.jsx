import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PostCard(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  // 여기다가 onClick 만들어서 해당 게시글 상세페이지로
  // 이동되게 만들기

  const { title, images, ownMembers, targetMembers, content, selectedValue } =
    props;

  return (
    <Card>
      {/* 카드 이미지  */}
      <CardMedia component="img" height="200" image={images[0]} />
      {/* 카드 제목 */}
      <CardHeader
        action={<IconButton aria-label="settings"></IconButton>}
        title={title}
      />

      {/* 본문 */}
      <CardContent className="card-content">
        <div>
          <Typography variant="body2" color="text.secondary">
            {`있어요: ${ownMembers.map((member) => member.value).join(", ")}`}
          </Typography>
        </div>
        <div>
          <Typography variant="body2" color="text.secondary">
            {`구해요: ${targetMembers
              .map((member) => member.value)
              .join(", ")}`}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
