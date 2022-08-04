// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  onSnapshot,
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBq80fW8JfWL7tFC-soOUZvxFZ-ygbVo-k",
  authDomain: "live-chat-app-9838a.firebaseapp.com",
  projectId: "live-chat-app-9838a",
  storageBucket: "live-chat-app-9838a.appspot.com",
  messagingSenderId: "119147204109",
  appId: "1:119147204109:web:2ff664aaae93f538994f44",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

const colRef = collection(db, "users");
onSnapshot(colRef, (snapshot) => {
  let users = [];
  snapshot.docs.forEach((doc) => {
    users.push({ ...doc.data(), id: doc.id });
  });
  console.log(users);
});

const signupForm = document.forms[0];

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let emailAdress = signupForm.email.value;
  let password = signupForm.password.value;
  let usrname = signupForm.username.value;
  let docRef = doc(db, "users", usrname);
  let date = new Date(Date.now());
  createUserWithEmailAndPassword(auth, emailAdress, password).then((cred) => {
    let uniqueId = cred.user.uid;
    let user = {
      email: emailAdress,
      username: usrname,
      uid: uniqueId,
      createdAt: date.toString(),
    };
    setDoc(docRef, user);
    document.forms[0].reset();
    window.location.replace("chatroom.html");
  });
});

onAuthStateChanged(auth, (user) => {
  console.log(user);
});
