"use strict";

const wordleGrid = document.querySelector(".wordle__grid");
const keyboard = document.querySelector(".keyboard");
const backspaceButton = document.querySelector(".backspace-icon");
const enterButton = document.querySelector(".enter-icon");
const wordleSettings = document.querySelector(".wordle__settings");
const wordleSettingsButton = document.querySelector(
  ".wordle__settings__button",
);

let wordle;
let wordleLength;

wordleSettings.showModal();
wordleSettingsButton.addEventListener("click", async () => {
  wordleLength = parseInt(document.querySelector("#wordle__length").value);
  try {
    wordle = await generateNewWordle(wordleLength);
    initializeGame();
    wordleSettings.close();
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

function createWordleGrid(length) {
  for (let i = 0; i < 5; i++) {
    const wordleRow = document.createElement("div");
    wordleRow.classList.add("wordle__row");
    for (let j = 0; j < wordleLength; j++) {
      const wordleRowItem = document.createElement("div");
      wordleRowItem.classList.add("wordle__row__item");
      wordleRowItem.innerHTML = "&nbsp;";
      wordleRow.appendChild(wordleRowItem);
    }
    wordleGrid.appendChild(wordleRow);
  }
}

async function generateNewWordle(length) {
  const response = await fetch(
    `https://random-words-api.kushcreates.com/api?length=${length}&type=uppercase&words=1`,
  );
  const data = await response.json();
  return data[0].word;
}
