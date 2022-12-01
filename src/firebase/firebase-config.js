import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDdIBx6GQZ3M3-v7pR8_Xzdgiss5oou2ZY",
	authDomain: "sushi-time-de9bf.firebaseapp.com",
	projectId: "sushi-time-de9bf",
	storageBucket: "sushi-time-de9bf.appspot.com",
	messagingSenderId: "466896712149",
	appId: "1:466896712149:web:f7113e2bbf02d1bc2f4d5c",
	measurementId: "G-YRKCBYM1YP"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
