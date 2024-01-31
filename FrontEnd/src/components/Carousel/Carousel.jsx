import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from "react-material-ui-carousel";
import image1 from '../../assets/images/icon.PNG';
import image2 from '../../assets/images/kakao.png';
import image3 from '../../assets/images/logo_nct.png';


const MyCarousel = () => {
	const example = [
    {
			id: 1,
      url: image1,
			link: '/post'
    },
		{
			id: 2,
      url: 'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg',
			link: '/login'
    },
		{
			id: 3,
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR12_4-r7n9WG7GNm22kYQzh18-E2LywioMSw&usqp=CAU',
			link: '/write'
    },
  ];

	const imageStyle = {
    width: '30rem',
    height: '15rem',
    display: 'block',
    margin: 'auto' // 이미지를 가운데 정렬하기 위한 스타일
  };

	// const indicatorIconButtonProps = {
	// 	style: {
	// 			color: '#FB37A3', // 변경할 색상 설정
	// 	},
	// };

	return (
		<div style={{ marginTop: '3rem'}}>
			<Carousel
				style={{ 
					width: '50%', 
					height: '50%',
					
				}} 
				cycleNavigation={true} 
				navButtonsAlwaysVisible={false}
				showArrows={true}
				centerMode={true}
				centerSlidePercentage={30}
				showThumbs={false}
				showStatus={false}
				autoPlay={true}
				interval={3000}
				infiniteLoop={true}
				// indicatorIconButtonProps={indicatorIconButtonProps}
			>
				{example.map((content) => (
					<>
					<Link to={content.link}>
						<img 
							src={content.url} 
							style={imageStyle}
						/>
					</Link>
					</>
					))}
			</Carousel>
		</div>
	)
}
export default MyCarousel