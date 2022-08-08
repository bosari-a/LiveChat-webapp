import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBq80fW8JfWL7tFC-soOUZvxFZ-ygbVo-k",
  authDomain: "live-chat-app-9838a.firebaseapp.com",
  projectId: "live-chat-app-9838a",
  storageBucket: "live-chat-app-9838a.appspot.com",
  messagingSenderId: "119147204109",
  appId: "1:119147204109:web:2ff664aaae93f538994f44",
};

initializeApp(firebaseConfig);

// database initiallize service
const db = getFirestore();
const auth = getAuth();
// collection reference
const colRef = collection(db, "users");
console.log("hi");
document.forms[0].addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector(".loading").classList.remove("display");
  let password = document.forms[0].password.value;
  let email = document.forms[0].email.value;
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.replace("chatroom.html");
    })
    .catch((err) => {
      alert(err.message);
    });
});

onAuthStateChanged(auth, (user) => {
  console.log(user);
});
