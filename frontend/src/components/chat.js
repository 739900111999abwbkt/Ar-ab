// chat.js

export function appendMessage(username, message, isSystem = false) {
  const chatBox = document.getElementById("chat-box");
  const msg = document.createElement("div");
  msg.classList.add("chat-message");

  if (isSystem) {
    msg.classList.add("system-message");
    msg.textContent = message;
  } else {
    msg.innerHTML = `<strong>${username}:</strong> ${message}`;
  }

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
