"use strict";

let wordToGuess;
let numberOfRows = 6;

fetch("/utils/words.json")
  .then((response) => {
    if (!response.ok) {
      console.log("ERROR ! Request wasn't completed !");
      return;
    }
    return response.json();
  })
  .then((data) => {
    const wordsArray = data;
    wordToGuess = getRandomWord(wordsArray);
    console.log(wordToGuess);
  })
  .catch((error) => {
    console.error("There was an issue ", error);
  });

const wordleGridBox = document.querySelector(".wordle-grid-box");
const keyboard = document.querySelector(".keyboard");
const deleteButton = document.querySelector(".delete");
const submitButton = document.querySelector(".submit");

const keyboardKeys = setupKeyboardButtons(keyboard);
generateRows(wordleGridBox, numberOfRows);

function generateRows(wordleGridBox, numberOfRows) {
  for (let i = 0; i < numberOfRows; i++) {
    const newRow = document.createElement("div");
    newRow.classList.add("wordle-row");
    for (let j = 0; j < 5; j++) {
      const child = document.createElement("div");
      child.classList.add("wordle-row-item");
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

function getRandomWord(listOfWords) {
  return listOfWords[Math.floor(Math.random() * listOfWords.length)];
}
