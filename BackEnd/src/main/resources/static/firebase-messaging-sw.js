// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken } from "firebase/messaging";
// import { initializeApp } from'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
// import { getMessaging, getToken } from'https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging.js';

// importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

self.addEventListener("push", (event) => {
    const data = event.data.json(); // 푸시 데이터 파싱
    console.log("Push event data:", data);

    const notificationTitle = data.notification.title;
    const notificationOptions = {
        body: data.notification.body,
        icon: data.notification.icon || 'icons/icon-192x192.png',
        // 아래의 변경을 주목하세요
        data: {
            link: data.data.link // 'data.data.link'로 변경
        }
    };

    event.waitUntil(
        self.registration.showNotification(notificationTitle, notificationOptions)
    );
});

self.addEventListener('notificationclick', event => {
    console.log('[Service Worker] Notification click Received.');
    console.log('Notification data:', event.notification.data);

    event.notification.close(); // 알림 닫기

    // 클라이언트에서 'link' 키로 저장된 URL을 사용
    const urlToOpen = event.notification.data.link;

    event.waitUntil(
        clients.openWindow(urlToOpen)
    );
});