// move.js

export function moveMicToCenter(micId) {
  const mic = document.getElementById(micId);
  if (!mic) return;

  mic.style.position = "absolute";
  mic.style.left = "50%";
  mic.style.top = "50%";
  mic.style.transform = "translate(-50%, -50%)";
}
