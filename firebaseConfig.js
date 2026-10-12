import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCjTrouaPVXNQ1CvAuoIpTYlLoFekVdqCk",
  authDomain: "checkin-app-fcbc2.firebaseapp.com",
  projectId: "checkin-app-fcbc2",
  storageBucket: "checkin-app-fcbc2.firebasestorage.app",
  messagingSenderId: "23325258909",
  appId: "1:23325258909:web:2fcd8e22f0d6cd7d505074"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
