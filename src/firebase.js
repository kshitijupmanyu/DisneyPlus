import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";;


const firebaseConfig = {
    apiKey: "AIzaSyDHIEGCC2m5DVPRbxRTxKwrucusDJCufZ4",
    authDomain: "disneyplus-clone-ca3f2.firebaseapp.com",
    projectId: "disneyplus-clone-ca3f2",
    storageBucket: "disneyplus-clone-ca3f2.appspot.com",
    messagingSenderId: "369633688724",
    appId: "1:369633688724:web:ddb3819d2482404a7b0881",
    measurementId: "G-MNGYXX4KZG"
  };

  const app = initializeApp(firebaseConfig);;
  const db = getFirestore(app);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  export {auth, provider, db};
