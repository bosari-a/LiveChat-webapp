// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  onSnapshot,
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
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
// onSnapshot(colRef, (snapshot) => {
//   let users = [];
//   snapshot.docs.forEach((doc) => {
//     users.push({ ...doc.data(), id: doc.id });
//   });
// });

// onAuthStateChanged(auth, (data) => {
//   const cred = data.uid;
//   getDocs(colRef).then((data) => {
//     data.docs.forEach((doc) => {
//       if (cred == doc.data().uid) {
//         console.log(doc.data().username);
//       }
//     });
//   });
// });






const checkboxes = document.querySelectorAll(".checkbox-input");
const rooms = document.querySelector(".rooms");
rooms.addEventListener("click", (e) => {
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      let bg = window.getComputedStyle(checkbox.parentElement).backgroundColor;
      document.querySelector("#set-room").innerText = checkbox.value;

      bg !== "rgb(255, 255, 255)"
        ? (document.body.style.backgroundColor = bg)
        : null;
      checkbox.parentElement.classList.remove("checkbox");
      checkbox.parentElement.classList.add("checkbox-checked");
    } else {
      checkbox.parentElement.classList.add("checkbox");
      checkbox.parentElement.classList.remove("checkbox-checked");
    }
  });
});
function checkSelectedRoom(checkboxes) {
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      return checkboxes[i].value;
    }
  }
}
