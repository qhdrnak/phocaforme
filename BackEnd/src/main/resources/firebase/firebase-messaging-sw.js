// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
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
const analytics = getAnalytics(app);
