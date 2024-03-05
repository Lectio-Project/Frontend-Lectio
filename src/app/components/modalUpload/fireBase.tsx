import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyBUdjh792At2OaQ9hYWkb823xeO9tM6UIA",
    authDomain: "lectio-project.firebaseapp.com",
    projectId: "lectio-project",
    storageBucket: "lectio-project.appspot.com",
    messagingSenderId: "729000668228",
    appId: "1:729000668228:web:9deea6eb3dac4eda802011",
    measurementId: "G-92082MGNWX"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);