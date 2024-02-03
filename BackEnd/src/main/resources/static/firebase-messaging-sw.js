// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getMessaging, getToken } from'https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging.js';

// importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js");
// // eslint-disable-next-line no-undef
// importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js");

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
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then(function(response) {
            // Service worker registration done
            console.log('Registration Successful', response);
        })
        .catch(function(error) {
            // Service worker registration failed
            console.log('Registration Failed', error);
        });
}