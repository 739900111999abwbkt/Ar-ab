// music.js

let backgroundMusic = null;

export function playMusic(filePath) {
  stopMusic();
  backgroundMusic = new Audio(filePath);
  backgroundMusic.loop = true;
  backgroundMusic.play();
}

export function stopMusic() {
  if (backgroundMusic) {
    backgroundMusic.pause();
    backgroundMusic = null;
  }
}
