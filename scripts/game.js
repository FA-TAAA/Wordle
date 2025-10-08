"use strict";

let wordInput = "";
let currentWordleRowIndex = 0;
let currentRowLetterIndex = 0;

let currentWordleRow;

function initializeGame() {
  createWordleGrid(wordleLength);
  currentWordleRow = wordleGrid.children[currentWordleRowIndex];
  enterButton.addEventListener("click", submitGuess);
  backspaceButton.addEventListener("click", cancelLetter);
  Array.from(keyboard.children).forEach((key) => {
    if (key.className == "keyboard__key") {
      key.addEventListener("click", activateKeystroke);
    }
  });
}

function activateKeystroke() {
  if (wordInput.length >= 5) return;
  if (currentWordleRowIndex >= 5) return;
  wordInput = wordInput + this.textContent;
  insertLetterInRow(this.textContent, currentWordleRow, currentRowLetterIndex);
  currentRowLetterIndex++;
  console.log(wordInput);
}

function submitGuess() {
  if (wordInput.length < 5) return;
  if (currentWordleRowIndex >= 5) return;
  if (wordle === wordInput) {
    disableKeyboard();
  }
  insertWordIntoRow(wordInput, Array.from(currentWordleRow.children));
  currentWordleRow = wordleGrid.children[++currentWordleRowIndex];
  wordInput = "";
  currentRowLetterIndex = 0;

  if (wordle === wordInput) {
    setTimeout(() => {});
  }
}

function cancelLetter() {
  if (currentRowLetterIndex <= 0) return;
  --currentRowLetterIndex;
  removeLetterFromRow(
    Array.from(currentWordleRow.children),
    currentRowLetterIndex,
  );
  wordInput = wordInput.slice(0, -1);
  console.log(wordInput);
}

function disableKeyboard() {
  Array.from(keyboard.children).forEach((key) => {
    if (key.className == "keyboard__key")
      key.removeEventListener("click", activateKeystroke);
    else if ("enter-icon") {
      enterButton.removeEventListener("click", submitGuess);
    } else if ("backspace-icon") {
      backspaceButton.removeEventListener("click", cancelLetter);
    }
  });
}
