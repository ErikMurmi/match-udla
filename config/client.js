import { initializeApp } from "firebase/app";
import { getAuth,onAuthStateChanged, createUserWithEmailAndPassword} from "firebase/auth";
import { getFirestore, collection,addDoc} from "firebase/firestore";
//import { addUser } from "../pages/api/users";
import { getStorage } from "firebase/storage";
//import { useRouter } from "next/router";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY ,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDERID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);

export default app

export const db = getFirestore(app);

export const onFirebaseAuthStateChanged = (onChange) => {
  return onAuthStateChanged(auth,(user) => {
    onChange(user ? user: null)
  })
}

export async function getUserInfo(user){
  const res = await fetch(`http://localhost:3000/api/users/getByFirebaseId?firebase=${user.uid}`)
  return await res.json() 
}
