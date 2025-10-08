"use strict";

const wordleGrid = document.querySelector(".wordle__grid");
const keyboard = document.querySelector(".keyboard");
const backspaceButton = document.querySelector(".backspace-icon");
const enterButton = document.querySelector(".enter-icon");
const wordleSettings = document.querySelector(".wordle__modal");
const wordleSettingsButton = document.querySelector(".wordle__modal__button");
const dialogIndicator = document.querySelector(".dialog__indicator__button");

let wordle;
let wordleLength;

wordleSettings.showModal();
wordleSettingsButton.addEventListener("click", async () => {
  wordleLength = parseInt(document.querySelector("#wordle__length").value);
  if (wordleLength <= 0 || wordleLength > 7 || isNaN(wordleLength)) {
    messageIndicator(
      "dialog",
      "The Wordle's length should be between 1 and 7 !",
    );
    return;
  }
  try {
    wordle = await generateNewWordle(wordleLength);
    initializeGame();
    wordleSettings.close();
    console.log("here");
  } catch (err) {
    console.log(err);
  }
});

const letters = "QWERTYUIOPASDFGHJKLZXCVBNM";
letters.split("").forEach((letter) => {
  const key = document.createElement("div");
  key.textContent = letter;
  key.classList.add("keyboard__key");
  keyboard.appendChild(key);
});

async function generateNewWordle(length) {
  const response = await fetch(
    `https://random-words-api.kushcreates.com/api?length=${length}&type=uppercase&words=1`,
  );
  const data = await response.json();
  return data[0].word;
}
