// my imports
import { User } from "./user.mjs";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  onSnapshot,
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
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

const unsubAuth = onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.replace("chatroom.html");
  }
});
unsubAuth();

const signupForm = document.forms[0];
signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    if (!signupForm.username.value.match(/^[\w\s]+$/)) {
      throw Error(
        "Please enter a valid username (you can only use letters, numbers, and underscores)"
      );
    } else if (!signupForm.password.value.match(/^[^<>\s]{6,}$/)) {
      throw Error(
        "Your password should be valid and at least 6 characters long"
      );
    } else if (
      signupForm.username.value.match(/^[\w\s]+$/) &&
      signupForm.password.value.match(/^[^<>\s]{6,}$/)
    ) {
      let emailVal = signupForm.email.value;
      let usernameVal = signupForm.username.value;
      let password = signupForm.password.value;

      createUserWithEmailAndPassword(auth, emailVal, password).then(() => {
        //console.log(auth.currentUser);

        let user = new User(usernameVal, emailVal);
        console.log(user);
        setDoc(
          doc(db, "user", auth.currentUser.uid),
          Object.assign({}, user)
        ).then(() => {
          console.log("doc set");
          updateProfile(auth.currentUser, {
            displayName: usernameVal,
          }).then(() => {
            window.location.replace("chatroom.html");
          });
        });
      });
    }
  } catch (err) {
    //
  }
});
