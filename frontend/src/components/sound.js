// sound.js

const sounds = {
  join: new Audio("/src/assets/sounds/join.mp3"),
  gift: new Audio("/src/assets/sounds/gift.mp3"),
  micOn: new Audio("/src/assets/sounds/mic-on.mp3"),
};

export function playSound(type) {
  if (sounds[type]) {
    sounds[type].play();
  }
}
