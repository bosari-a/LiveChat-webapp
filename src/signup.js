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
  updateProfile,
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
const user = auth.currentUser;

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
  document.querySelector(".loading").classList.remove("display");
  let emailAdress = signupForm.email.value;
  let password = signupForm.password.value;
  let usrname = signupForm.username.value;
  let docRef = doc(db, "users", usrname);
  createUserWithEmailAndPassword(auth, emailAdress, password)
    .then(() => {
      updateProfile(auth.currentUser, {
        displayName: usrname,
      }).then(() => {
        console.log("profile updated");
        document.forms[0].reset();
        window.location.replace("chatroom.html");
      });
    })
    .catch((err) => {
      alert(err.message);
    });
});

onAuthStateChanged(auth, (user) => {
  //console.log(user);
});
