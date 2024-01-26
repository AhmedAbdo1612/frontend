// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCnYTFwIKT9amXO12jb3m4hg2ryk_njJxc",
  authDomain: "e-shop-f5cd6.firebaseapp.com",
  projectId: "e-shop-f5cd6",
  storageBucket: "e-shop-f5cd6.appspot.com",
  messagingSenderId: "1063815503756",
  appId: "1:1063815503756:web:6caec802f68a417599c0a9"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp