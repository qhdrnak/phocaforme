import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@mui/material';
import ChartTab from '../components/Chart/ChartTab';
import Search from '../components/Search/Search.jsx';
import PreviewPost from '../components/PostList/PreviewPost.jsx';
import MyCarousel from '../components/Carousel/Carousel.jsx';
import { initializeApp } from 'firebase/app'; // Firebase 모듈 가져오기
import { getMessaging, getToken } from 'firebase/messaging'; // Firebase Messaging 모듈 가져오기

const Main = () => {
    // Redux 스토어에서 유저 정보 가져오기
    const user = useSelector((state) => (state.user ? state.user.user : [])); 

    useEffect(() => {
        const firebaseConfig = {
            apiKey: "AIzaSyD-iDPmb0MyrFHqdEKVdaFs9V9vT4Rc-2w",
            authDomain: "phocaforme.firebaseapp.com",
            projectId: "phocaforme",
            storageBucket: "phocaforme.appspot.com",
            messagingSenderId: "250202437051",
            appId: "1:250202437051:web:14ab6bb0445aad9b08009e",
            measurementId: "G-9EZG3PJXLT"
        };
        initializeApp(firebaseConfig);
    
        const messaging = getMessaging();
    
        const handlePageLoad = () => {
            requestNotificationPermission();
        };
    
        const requestNotificationPermission = () => {
            if ('Notification' in window) {
                Notification.requestPermission().then((permission) => {
                    if (permission === 'granted') {
                        console.log('Notification permission granted.');
                        sendTokenToServer();
                    } else {
                        console.log('Notification permission denied.');
                    }
                });
            } else {
                console.log('Notification API not supported.');
            }
        };
    
        const sendTokenToServer = () => {
            getToken(messaging)
                .then((currentToken) => {
                    console.log("device_token: " + currentToken);
                    // Send the token to your server and update the UI if necessary
                    sendTokenToServerBackend(currentToken);
                }).catch((err) => {
                    console.log('An error occurred while retrieving token. ', err);
                });
        };

        const sendTokenToServerBackend = (currentToken) => {
            fetch(process.env.REACT_APP_API_URL + `user/device`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}`, // 토큰을 요청 헤더에 추가
                },
                body: JSON.stringify({ 
                    deviceToken: currentToken,
                    
                }),
                credentials: 'include'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('서버 응답이 실패했습니다.');
                }
                console.log('푸시 토큰을 서버로 전송했습니다.');
            })
            .catch(error => {
                console.error('푸시 토큰을 서버로 전송하는 중 오류 발생:', error);
            });
        };
        
        handlePageLoad();
    }, []);

    return (
        <Container>
            <div id='search-container'>
                <Search />
            </div>
            <MyCarousel />
            <ChartTab/>
            <PreviewPost />
        </Container>
    );
};

export default Main;
