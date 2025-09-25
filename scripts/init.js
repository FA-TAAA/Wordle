"use strict";

const startButton = document.querySelector(".start-button");
const wordleGridBox = document.querySelector(".wordle-grid-box");
const keyboard = document.querySelector(".keyboard");
const deleteButton = document.querySelector(".delete");
const submitButton = document.querySelector(".submit");
const gameSettings = document.querySelector(".game-settings");
const keyboardKeys = setupKeyboardButtons(keyboard);

let wordInput = "";
let rowInUseIndex = 0;
let rowLetterIndex = -1;

let category;
let wordleLength;
let wordToGuess;

let wordleGridRows;
let currentRowInUse;

startButton.addEventListener("click", setGameSettings);

async function setGameSettings() {
  category = document.querySelector("#category").value;
  wordleLength = parseInt(document.querySelector("#wordle-length").value);
  await assignRandomWord(category, wordleLength);
  generateRows(wordleGridBox, wordleLength);
  hideElement(gameSettings, true);
  wordleGridRows = Array.from(wordleGridBox.children);
  currentRowInUse = wordleGridRows[rowInUseIndex];
  keyboardKeys.forEach((key) => {
    key.addEventListener("click", setupKeyStroke);
  });
}

function generateRows(wordleGridBox, numberOfColumns) {
  wordleGridBox.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    const newRow = document.createElement("div");
    newRow.classList.add("wordle-row");
    for (let j = 0; j < numberOfColumns; j++) {
      const child = document.createElement("div");
      child.classList.add("wordle-row-item");
      newRow.style.gridTemplateColumns = `repeat(${numberOfColumns} , 1fr)`;
      newRow.appendChild(child);
    }
    wordleGridBox.appendChild(newRow);
  }
}

function setupKeyboardButtons(keyboard) {
  const letters = [..."QWERTYUIOPASDFGHJKLZXCVBNM"];
  const buttonLetters = [];
  letters.forEach((letter) => {
    const newKey = document.createElement("div");
    newKey.textContent = letter;
    newKey.classList.add("key");
    keyboard.appendChild(newKey);
    buttonLetters.push(newKey);
  });
  return buttonLetters;
}

async function generateRandomWord(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network Response Was Not OK !");
    }
    const data = await response.json();
    console.log(data[0].word);
    return data[0].word;
  } catch (error) {
    console.error("There was an error in the fetch opearation : " + error);
  }
}

async function assignRandomWord(category, length) {
  wordToGuess = await generateRandomWord(
    `https://random-words-api.kushcreates.com/api?category=${category}&length=${length}&type=uppercase&language=en&words=1`,
  );
}
