// assets/MusicPlayer.js
import { Audio } from 'expo-av';

let sound;

export async function playMusic() {
  if (sound) return; // Đã phát rồi thì không phát lại
  sound = new Audio.Sound();
  await sound.loadAsync(require('./birthday.mp3'));
  await sound.playAsync();
  sound.setIsLoopingAsync(true);
}

export async function stopMusic() {
  if (sound) {
    await sound.stopAsync();
    await sound.unloadAsync();
    sound = null;
  }
}
