// a user class for creating user data
class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
  }
}

// a message class for each message object

class Message {
  constructor(createdAt, content, uid, id, username) {
    this.createdAt = createdAt;
    this.content = content;
    this.uid = uid;
    this.id = id;
    this.username = username;
  }
}

// hmtl template of a message

let messageTemplate = `
            <div class="message-header">
            <span class="display" id=""></span>
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

function createMessages(
  content,
  createdAt,
  username,
  uid,
  currentUseruid,
  id,
  room,
  edit
) {
  if (content) {
    if (currentUseruid === uid) {
      messageTemplate = `
                      <div class="message-header">
                      <span class="display message-id">${id}</span>
                      <span class="display room">${room}</span>
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
                      <div class="change-post">
                      <svg xmlns="http://www.w3.org/2000/svg" class="three-dots" viewBox="0 0 20 20" fill="currentColor">
                  <path class="three-dots" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd" />
                </svg>
                  <div class="edit-delete display"> <p class="edit">Edit</p> <p class="delete">delete</p> </div> </div>
                  <div class="delete-dialogue display">
                  Are you sure you want to delete this post? You can't undo this action.
                  <div class="options">
                    <div class="cancel">Cancel</div>
                    <div class="options-delete">delete</div>
                  </div>
                </div>
                      <span class="text-msg"
                        ></span>
                    `;

      let messageHTML = document.createElement("div");
      messageHTML.classList.add("user-message");
      messageHTML.innerHTML = messageTemplate;
      messageHTML.querySelector(".time-sent").innerText = createdAt;
      messageHTML.querySelector(".onmsg-username").innerText = username;
      messageHTML.querySelector(".text-msg").innerText = content;
      let edited = document.createElement("span");
      edited.classList.add("display");
      edited.innerHTML = `            <span class="time-sent edited">(edited)</span>
                      `;
      if (edit) {
        edited.classList.remove("display");
      }
      messageHTML.querySelector(".message-header").appendChild(edited);
      document.querySelector(".message-container").appendChild(messageHTML);
    } else {
      messageTemplate = `
              <div class="message-header">
              <span class="display message-id" id="">${id}</span>
              <span class="display room">${room}</span>
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
      messageHTML.querySelector(".time-sent").innerText = createdAt;
      messageHTML.querySelector(".onmsg-username").innerText = username;
      messageHTML.querySelector(".text-msg").innerText = content;
      let edited = document.createElement("span");
      edited.classList.add("display");
      
      edited.innerHTML = `            <span class="time-sent edited">(edited)</span>
                            `;
      if (edit) {
        edited.classList.remove("display");
      }
      messageHTML.querySelector(".message-header").appendChild(edited);
      document.querySelector(".message-container").appendChild(messageHTML);
    }
  }
}

export { User, Message, createMessages };
