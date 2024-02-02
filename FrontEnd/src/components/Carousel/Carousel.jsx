import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel";

const MyCarousel = () => {
  const example = [
    {
      id: 1,
      url: "/assets/images/banner/도움말.PNG",
      link: "/help",
    },
    {
      id: 2,
      url: "/assets/images/banner/이벤트.png",
      link: "",
    },
    {
      id: 3,
      url: "/assets/images/banner/럭키드로우.jpg",
      link: "https://m.smtownandstore.com/board/event/read.html?no=539846&board_no=14",
    },
  ];

  const imageStyle = {
    width: "80vw",
    height: "30vh",
    objectFit: "contain",
  };

  const carouselStyle = {
    "& .Carousel-button": {
      display: "none",
    },
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <Carousel
        cycleNavigation={true}
        navButtonsAlwaysVisible={false}
        centerMode={true}
        centerSlidePercentage={30}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        interval={3000}
        infiniteLoop={true}
        hideArrows={true}
      >
        {example.map((content) => (
          <Link to={content.link}>
            <img src={content.url} style={imageStyle} />
          </Link>
        ))}
      </Carousel>
    </div>
  );
};
export default MyCarousel;
