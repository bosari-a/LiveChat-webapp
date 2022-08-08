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
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
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
const q = query(colRef, orderBy("lastUpdated"));

onAuthStateChanged(auth, (user) => {
  console.log("auth.currentUser triggered", auth.currentUser);
  if (auth.currentUser) {
    document.querySelector("#login-btn").classList.add("display");
    document.querySelector(".current-user").classList.remove("display");
    document.querySelector(".email").innerText = auth.currentUser.email;
    document.querySelector(".username").innerText =
      auth.currentUser.displayName;

    // creating user

    let docRef = doc(
      db,
      "users",
      auth.currentUser.displayName.split(" ").join("")
    );
    getDoc(docRef).then((doc) => {
      doc.data()
        ? console.log(
            "user already exists!",
            user.displayName.split(" ").join(""),
            doc.id
          )
        : setDoc(docRef, {
            lastUpdated: Timestamp.now(),
            [`chatLog${user.displayName.split(" ").join("")}0`]: {
              id: `_${user.displayName.split(" ").join("")}0`,
              username: user.displayName,
            },
          }).then(() => {
            console.log("user has been created!");
          });
    });
  } else if (!auth.currentUser) {
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

const rooms = document.querySelector(".rooms");
const hrefs = document.querySelector(".hrefs");
document.addEventListener("click", (e) => {
  if (window.getComputedStyle(hrefs).left === "-136px" && e.target === hrefs) {
    hrefs.style.left = "-10px";
  } else if (!hrefs.contains(e.target)) {
    hrefs.style.left = "-136px";
  }
});
rooms.addEventListener("click", (e) => {
  if (e.target.classList.contains("checkbox")) {
    let arrData = [];
    let timeSortedData = [];
    const unsubSnap = onSnapshot(q, (snapshot) => {
      let users = [];
      snapshot.docs.forEach((doc) => {
        users.push({ chatLogs: { ...doc.data() }, id: doc.id });
      });
      for (const user in users) {
        for (const chatLog in users[user].chatLogs) {
          if (e.target.innerText !== users[user].chatLogs[chatLog].room) {
            continue;
          }
          arrData.push({
            ...users[user].chatLogs[chatLog],
            username:
              users[user].chatLogs[`chatLog${users[user].id}0`].username,
          });
          timeSortedData = arrData.sort(
            (a, b) => a.timeSent.toMillis() - b.timeSent.toMillis()
          );
        }
      }
      timeSortedData.forEach((chatLog) => {
        createUserMessage(chatLog, chatLog.username, e.target.innerText);
      });

      let currentMessages = document.querySelectorAll(".user-message");
      currentMessages.forEach((message) => {
        if (
          e.target.innerText !== message.querySelector(".room-name").innerText
        ) {
          message.remove();
        }
      });
      unsubSnap();
    });

    document.querySelector("#set-room").innerText = e.target.innerText;
    changeBgColor(e.target.innerText.slice(1));
  }
});

document.forms[0].addEventListener("submit", (event) => {
  event.preventDefault();
  if (checkSelectedRoom()) {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      let userMessage = document.forms[0].userinput.value;
      let docRef = doc(db, "users", user.displayName.split(" ").join(""));
      getDoc(docRef).then((doc) => {
        function findLastId() {
          let idArr = [];
          for (const key in doc.data()) {
            doc.data()[key].id
              ? idArr.push(Number(doc.data()[key].id.slice(doc.id.length + 1)))
              : null;
          }
          return Math.max(...idArr) + 1;
        }

        let chatLogs = {
          ...doc.data(),
          lastUpdated: Timestamp.now(),
          [`chatLog${doc.id + findLastId()}`]: {
            id: `_${doc.id + findLastId()}`,
            room: checkSelectedRoom().value,
            timeSent: Timestamp.now(), // Timestamp.now().toDate().toLocaleString()
            message: userMessage,
          },
        };
        updateDoc(docRef, chatLogs).then(() => {
          console.log("doc updated");

          // createUserMessage(
          //   chatLogs[`chatLog${doc.id + findLastId()}`],
          //   doc.data()[`chatLog${doc.id}0`].username,
          //   checkSelectedRoom().value
          // );
        });
        document.forms[0].userinput.value = null;
      });
    });
    unsubAuth();
  }
});

// functions
//this function checks which room is currently selected by user
// *note: doesn't work when e.target is used
function checkSelectedRoom() {
  let checkboxes = document.querySelectorAll(".checkbox-input");
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      return checkboxes[i];
    }
  }
}
//end

// this function changes the background color of the page
function changeBgColor(selectedRoom) {
  switch (selectedRoom) {
    case "general":
      document.body.style.backgroundColor = "#73a9ad";
      break;
    case "gaming":
      document.body.style.backgroundColor = "#90c8ac";

      break;
    case "music":
      document.body.style.backgroundColor = "#c4dfaa";

      break;
    case "hobbies":
      document.body.style.backgroundColor = "#f5f0bb";

      break;
    default:
      document.body.style.backgroundColor = "#fff";
  }
}
// end

//this function creates a user message
function createUserMessage(chatLog, username, currentRoom) {
  if (!document.querySelector(`#${chatLog.id}`) && !chatLog.chatLog0) {
    if (currentRoom === chatLog.room) {
      let messageTemplate = `
      <div class="message-header">
      <span class="room-name display"></span>
      <span class="display" id="${chatLog.id}"></span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="user-img"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            class="user-img"
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
            clip-rule="evenodd"
          />
        </svg>
        <span class="onmsg-username"></span>
        <div class="time">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="clock"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            class="clock"
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clip-rule="evenodd"
          />
        </svg>
        <span class="time-sent"></span></div>
      </div>
  
      <span class="text-msg"
        ></span>
    `;
      let messageHTML = document.createElement("div");
      messageHTML.classList.add("user-message");
      messageHTML.innerHTML = messageTemplate;
      messageHTML.querySelector(".time-sent").innerText = chatLog.timeSent
        .toDate()
        .toLocaleString();
      messageHTML.querySelector(".onmsg-username").innerText = `@${username}`;
      messageHTML.querySelector(".text-msg").innerText = chatLog.message;
      messageHTML.querySelector(".room-name").innerText = chatLog.room;
      document.querySelector(".message-container").appendChild(messageHTML);
    }
  }
}
//end

// this function orders chatlogs by id
function orderChatLogsById(data, docId) {
  let idArr = [];
  for (const key in data) {
    data[key].id
      ? idArr.push(Number(data[key].id.slice(docId.length + 1)))
      : null;
  }
  let sortedIdArr = idArr.sort(function (a, b) {
    return a - b;
  });
  return sortedIdArr;
}
// end
document.querySelector("#login-btn").addEventListener("click", () => {
  window.location.href = "login.html";
});
onSnapshot(q, (snapshot) => {
  if (checkSelectedRoom()) {
    let currentMessages = document.querySelectorAll(".user-message");
    currentMessages.forEach((message) => {
      message.remove();
    });

    let arrData = [];
    let timeSortedData = [];
    let users = [];
    snapshot.docs.forEach((doc) => {
      users.push({ chatLogs: { ...doc.data() }, id: doc.id });
    });
    for (const user in users) {
      for (const chatLog in users[user].chatLogs) {
        if (checkSelectedRoom().value !== users[user].chatLogs[chatLog].room) {
          continue;
        }
        arrData.push({
          ...users[user].chatLogs[chatLog],
          username: users[user].chatLogs[`chatLog${users[user].id}0`].username,
        });
        timeSortedData = arrData.sort(
          (a, b) => a.timeSent.toMillis() - b.timeSent.toMillis()
        );
      }
    }
    timeSortedData.forEach((chatLog) => {
      createUserMessage(chatLog, chatLog.username, checkSelectedRoom().value);
    });
    currentMessages.forEach((message) => {
      if (
        checkSelectedRoom().value !==
        message.querySelector(".room-name").innerText
      ) {
        message.remove();
      }
    });
  }

  const unsubAuth = onAuthStateChanged(auth, (user) => {
    if (user) {
      let docRef = doc(db, "users", user.displayName.split(" ").join(""));
      getDoc(docRef).then((doc) => {
        doc.data()
          ? console.log(doc.data(), "user already exists!", doc.id)
          : setDoc(docRef, {
              lastUpdated: Timestamp.now(),
              [`chatLog${user.displayName.split(" ").join("")}0`]: {
                id: `_${user.displayName.split(" ").join("")}0`,
                username: user.displayName,
              },
            }).then(() => {
              console.log("user has been created!");
            });
      });
    }
  });
  unsubAuth();
});

// if I use e.target on the room click event listener then
// checkSelectedRoom() returns undefined for some reason
