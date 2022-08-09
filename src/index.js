import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

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
onAuthStateChanged(auth, (user) => {
  console.log(user);
  if (user) {
    document.querySelector("#login-btn").classList.add("display");
    document.querySelector(".current-user").classList.remove("display");
    document.querySelector(".email").innerText = user.email;
    document.querySelector(".username").innerText = user.displayName;
  } else if (!user) {
    document.querySelector("#login-btn").classList.remove("display");
    document.querySelector(".current-user").classList.add("display");
    document.querySelector("#logout").classList.add("display");
  }
});

const logoutBtn = document.querySelector("#logout");
logoutBtn.addEventListener("click", (event) => {
  event.preventDefault();
  signOut(auth).then(() => {
    console.log("user has signed out");
    window.location.reload();
  });
});

// collection reference
const colRef = collection(db, "chats");

document.querySelector("#login-btn").addEventListener("click", () => {
  window.location.href = "login.html";
});
