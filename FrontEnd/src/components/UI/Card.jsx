import * as React from "react";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import TruncatedTitle from "../../styles/TruncatedTitle";

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";

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

const CustomCard = (props) => {
  const navigate = useNavigate();

  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
// 로컬스토리지에 최근본 게시물 추가
  const goToDetail = (id) => { 
    const existingRecentCard = JSON.parse(localStorage.getItem("recentCard")) || [];
    const cardInfo = {
      id,
      title,
      images,
      ownMembers,
      targetMembers,
      content,
      type,
      isBartered,
      isSold
    };

    const isExisting = existingRecentCard.some(card => card.id === id);

    if (isExisting) { // 이미 본 카드가 있으면 제거하고 새로운 카드 추가
      const updatedRecentCard = existingRecentCard.filter(card => card.id !== id); 
      updatedRecentCard.push(cardInfo); // 새로운 카드 추가
      localStorage.setItem("recentCard", JSON.stringify(updatedRecentCard));
    } else { // 없으면 그냥 추가
      const updatedRecentCard = [...existingRecentCard, cardInfo]; 
      if (updatedRecentCard.length > 5) {
        updatedRecentCard.shift();
      }
      localStorage.setItem("recentCard", JSON.stringify(updatedRecentCard));
    }

    
    navigate(`/post/${id}`);
  };

  const {
    id,
    title,
    images,
    ownMembers,
    targetMembers,
    content,
    type,
    isBartered,
    isSold,
  } = props;

  return (
    <Card
      className={`card-style${isBartered || isSold ? " done-post" : ""}`}
      onClick={() => goToDetail(id)}
    >
      {isBartered && (
        <div className="overlay">
          <p>교환완료</p>
        </div>
      )}
      {isSold && (
        <div className="overlay">
          <p>판매완료</p>
        </div>
      )}
      <CardMedia component="img" height="250" image={images[0]} />
      <CardHeader
        sx={{
          padding: "1rem 1rem 0",
          width: "100%",
        }}
        // action={<IconButton aria-label="settings"></IconButton>}
        title={<TruncatedTitle truncateWidth="80%">{title}</TruncatedTitle>}
      />
      <CardContent className="card-content">
        {type == "교환" ? (
          <div>
            <div>
              <Typography variant="body2" color="text.secondary">
                {`있어요: ${ownMembers
                  .map((member) => member.value)
                  .join(", ")}`}
              </Typography>
            </div>
            <div>
              <Typography variant="body2" color="text.secondary">
                {`구해요: ${targetMembers
                  .map((member) => member.value)
                  .join(", ")}`}
              </Typography>
            </div>
          </div>
        ) : (
          <div>
            <Typography variant="body2" color="text.secondary">
              {`멤버: ${ownMembers.map((member) => member.value).join(", ")}`}
            </Typography>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
export default CustomCard;
