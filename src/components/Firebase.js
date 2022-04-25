import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBEosECPw5PKhTiJPXWsZTo-0E_xQ5h4uc",
    authDomain: "keeper-fbb2d.firebaseapp.com",
    projectId: "keeper-fbb2d",
    storageBucket: "keeper-fbb2d.appspot.com",
    messagingSenderId: "347494791073",
    appId: "1:347494791073:web:55793af58abf7d747bbde0"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;