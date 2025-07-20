// bg.js

export function changeRoomBackground(imageUrl) {
  const room = document.getElementById("room-container");
  if (room) {
    room.style.backgroundImage = `url('${imageUrl}')`;
  }
}
