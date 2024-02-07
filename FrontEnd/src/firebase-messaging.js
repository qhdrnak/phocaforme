import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyD-iDPmb0MyrFHqdEKVdaFs9V9vT4Rc-2w",
  authDomain: "phocaforme.firebaseapp.com",
  projectId: "phocaforme",
  storageBucket: "phocaforme.appspot.com",
  messagingSenderId: "250202437051",
  appId: "1:250202437051:web:14ab6bb0445aad9b08009e",
  measurementId: "G-9EZG3PJXLT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);

export function requestPermission() {
  void Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      messaging
        .getToken({ vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY })
        .then((token: string) => {
          console.log(`푸시 토큰 발급 완료 : ${token}`)
        })
        .catch((err) => {
          console.log('푸시 토큰 가져오는 중에 에러 발생')
        })
    } else if (permission === 'denied') {
      console.log('푸시 권한 차단')
    }
  })
}