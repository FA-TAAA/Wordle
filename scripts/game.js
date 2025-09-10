"use strict";

let wordInput = "";
let rowInUseIndex = 0;
let rowLetterIndex = -1;

const wordleGridRows = Array.from(wordleGridBox.children);
let currentRowInUse = wordleGridRows[rowInUseIndex];

keyboardKeys.forEach((key) => {
  key.addEventListener("click", setupKeyboard);
});

submitButton.addEventListener("click", () => {
  if (wordInput.length != 5) {
    errorRowAnimation(currentRowInUse);
    return;
  }
  wordInsertionAnimation(Array.from(currentRowInUse.children), wordInput);

  if (wordInput == wordToGuess) {
    disableKeyboard(keyboardKeys);
    return;
  }

  if (rowInUseIndex == numberOfRows - 1) {
    disableKeyboard(keyboardKeys);
    return;
  }
  rowInUseIndex++;
  rowLetterIndex = -1;
  wordInput = "";
  currentRowInUse = wordleGridRows[rowInUseIndex];
});

deleteButton.addEventListener("click", () => {
  if (rowLetterIndex >= 0) {
    removeLetterFromRow(Array.from(currentRowInUse.children), rowLetterIndex);
    wordInput = wordInput.slice(0, -1);
    rowLetterIndex--;
  }
});

function setupKeyboard(key) {
  if (wordInput.length < 5) {
    wordInput += key.target.textContent;
    rowLetterIndex++;
    addLetterToRow(
      Array.from(currentRowInUse.children),
      key.target.textContent,
      rowLetterIndex,
    );
  } else {
    errorRowAnimation(currentRowInUse);
    console.log("Word is too long");
  }
}

function disableKeyboard(keys) {
  keys.forEach((key) => {
    key.removeEventListener("click", setupKeyboard);
  });
}
