// my imports
import { Message, createMessages } from "./user.mjs";
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
  Timestamp,
  deleteDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
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
let uid = "";
let fromAuthusername = "";

// checking if a user is already signed in
const unsubAuth = onAuthStateChanged(auth, () => {
  if (auth.currentUser) {
    uid = auth.currentUser.uid;
    fromAuthusername = auth.currentUser.displayName;
    document.querySelector("#login-btn").classList.add("display");
    document.querySelector("#logout").classList.remove("display");
    document.querySelector(".current-user").classList.remove("display");
    document.querySelector(".email").innerText = auth.currentUser.email;
    document.querySelector(".username").innerText =
      auth.currentUser.displayName;
  } else if (!auth.currentUser) {
    document.querySelector("#login-btn").classList.remove("display");
    document.querySelector(".current-user").classList.add("display");
    document.querySelector("#logout").classList.add("display");
  }
});
unsubAuth();

// user logging out
const logoutBtn = document.querySelector("#logout");
logoutBtn.addEventListener("click", (event) => {
  event.preventDefault();
  signOut(auth).then(() => {
    console.log("user has signed out");
    window.location.reload();
  });
});

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

const hrefs = document.querySelector(".hrefs");
document.addEventListener("click", (e) => {
  if (window.getComputedStyle(hrefs).left === "-136px" && e.target === hrefs) {
    hrefs.style.left = "-10px";
  } else if (!hrefs.contains(e.target)) {
    hrefs.style.left = "-136px";
  }
  if (e.target.classList.contains("checkbox")) {
    document.querySelector(".user-input").classList.remove("display");
    document.querySelector(".send-a-message").classList.remove("display");
    document.querySelector("#set-room").innerText = e.target.innerText;
    changeBgColor(e.target.innerText.slice(1));
  }

  if (e.target.classList.contains("three-dots")) {
    if (e.target.parentElement.tagName === "svg") {
      if (
        e.target.parentElement.nextElementSibling.classList.contains("display")
      ) {
        e.target.parentElement.nextElementSibling.classList.remove("display");
      } else {
        e.target.parentElement.nextElementSibling.classList.add("display");
      }
    } else {
      if (e.target.nextElementSibling.classList.contains("display")) {
        e.target.nextElementSibling.classList.remove("display");
      } else {
        e.target.nextElementSibling.classList.add("display");
      }
    }
  }
  if (
    !e.target.classList.contains("three-dots") &&
    !e.target.classList.contains("edit") &&
    !e.target.classList.contains("delete")
  ) {
    document.querySelectorAll(".edit-delete").forEach((changePost) => {
      changePost.classList.add("display");
    });
  }
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.classList.add("display");
    e.target.parentElement.parentElement.parentElement
      .querySelector(".delete-dialogue")
      .classList.remove("display");
  }

  if (e.target.classList.contains("cancel")) {
    e.target.parentElement.parentElement.classList.add("display");
  }
  if (e.target.classList.contains("options-delete")) {
    //
    let msgId =
      e.target.parentElement.parentElement.parentElement.querySelector(
        ".message-id"
      ).innerText;
    msgId = `message${msgId.slice(checkSelectedRoom().value.length)}`;
    let docRef = doc(db, checkSelectedRoom().value, msgId);
    deleteDoc(docRef).then(() => {
      console.log("delete success");
      e.target.parentElement.parentElement.parentElement.remove();
    });
  }

  if (e.target.classList.contains("edit")) {
    if (
      !e.target.parentElement.parentElement.parentElement.querySelector(
        ".edit-text"
      )
    ) {
      e.target.parentElement.classList.add("display");
      //
      let edit =
        e.target.parentElement.parentElement.parentElement.querySelector(
          ".text-msg"
        ).innerText;
      let editForm = document.createElement("form");
      editForm.id = "edit-form";
      editForm.innerHTML = `
        <textarea class="edit-text" rows="2"></textarea>
          <input type="submit" class="submit-edit" value="Submit" />
      `;
      editForm.querySelector(".edit-text").value = edit;
      e.target.parentElement.parentElement.parentElement.querySelector(
        ".text-msg"
      ).innerText = "";
      e.target.parentElement.parentElement.parentElement.appendChild(editForm);
      e.target.parentElement.parentElement.parentElement
        .querySelector("#edit-form")
        .addEventListener("submit", (e) => {
          e.preventDefault();
          if (e.target.querySelector(".edit-text").value !== edit) {
            //
            let msgId =
              e.target.parentElement.querySelector(".message-id").innerText;
            msgId = `message${msgId.slice(checkSelectedRoom().value.length)}`;
            let docRef = doc(db, checkSelectedRoom().value, msgId);
            updateDoc(docRef, {
              content: e.target.querySelector(".edit-text").value,
              edit: true,
            }).then(() => {
              console.log("edit succes, doc updated");
              e.target.parentElement
                .querySelector(".edited")
                .parentElement.classList.remove("display");
              e.target.parentElement.querySelector(".text-msg").innerText =
                e.target.querySelector(".edit-text").value;
              e.target.remove();
            });
          } else {
            e.target.parentElement.querySelector(".text-msg").innerText =
              e.target.querySelector(".edit-text").value;
            e.target.remove();
          }
        });
    }
  }
});

// //this function checks which room is currently selected by user
// // *note: doesn't work when e.target is used
function checkSelectedRoom() {
  let checkboxes = document.querySelectorAll(".checkbox-input");
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      return checkboxes[i];
    }
  }
}
// //end

// submitting user's message

document.querySelector(".add").addEventListener("submit", (event) => {
  event.preventDefault();

  let textmsg = document.querySelector(".add").userinput.value;
  // checking if the user is not sending empty text

  if (textmsg.match(/^[^\s].+/)) {
    let roomColRef = collection(db, checkSelectedRoom().value);

    // initiallizing array of messages
    let lastMessageId = [];

    // getting messages in selected chatroom
    getDocs(roomColRef).then((data) => {
      data.forEach((dcmnt) => {
        lastMessageId.push(Number(dcmnt.id.slice(7)));
      });
      lastMessageId = lastMessageId.sort(function (a, b) {
        return a - b;
      });

      let docRef = doc(
        db,
        checkSelectedRoom().value,
        `message${lastMessageId[lastMessageId.length - 1] + 1}`
      );

      let message = new Message(
        Timestamp.now(),
        textmsg,
        uid,
        `${
          checkSelectedRoom().value +
          Number(lastMessageId[lastMessageId.length - 1] + 1)
        }`,
        fromAuthusername
      );
      setDoc(docRef, Object.assign({}, message)).then(() => {
        createMessages(
          message.content,
          message.createdAt.toDate().toLocaleString(),
          fromAuthusername,
          message.uid,
          uid,
          message.id,
          checkSelectedRoom().value,
          message.edit
        );
        document.querySelector(".add").userinput.value = null;
      });
    });
  } else {
    alert("send a proper message!");
  }
});

const rooms = document.querySelector(".rooms");

rooms.addEventListener("click", (event) => {
  if (event.target.classList.contains("checkbox")) {
    let currMessages = document.querySelectorAll(".user-message");
    let messages = [];
    let currRoom = event.target.innerText;
    let colRef = collection(db, currRoom);
    let username = "";

    // clearning the messages that don't belong to the selected room
    currMessages.forEach((message) => {
      let room = message.querySelector(".room").innerText;
      if (currRoom !== room) {
        message.remove();
      }
    });

    // getting user messages from corresponding chatroom collection
    getDocs(colRef).then((snapshot) => {
      snapshot.forEach((messageDoc) => {
        messages.push({ ...messageDoc.data() });
      });
      messages = messages.sort((a, b) => {
        return a.createdAt.seconds - b.createdAt.seconds;
      });
      console.log(messages);
      for (let i = 1; i < messages.length; i++) {
        console.log(messages[i].edit);
        createMessages(
          messages[i].content,
          messages[i].createdAt.toDate().toLocaleString(),
          messages[i].username,
          messages[i].uid,
          uid,
          messages[i].id,
          currRoom,
          messages[i].edit
        );
      }
    });
  }
});
