import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDuNis0s3ezvDQCp7aLDGzxy-FSraJQyis",
  authDomain: "pchatapp-518f6.firebaseapp.com",
  projectId: "pchatapp-518f6",
  storageBucket: "pchatapp-518f6.appspot.com",
  messagingSenderId: "990476196558",
  appId: "1:990476196558:web:7bd81baf20ddfedbea4e9f"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);