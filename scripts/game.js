"use strict";

let wordInput = "";
let rowInUseIndex = 0;
let rowLetterIndex = -1;

const wordleGridRows = Array.from(wordleGridBox.children);
let currentRowInUse = wordleGridRows[rowInUseIndex];

keyboardKeys.forEach((key) => {
  key.addEventListener("click", () => {
    if (wordInput.length < 5) {
      wordInput += key.textContent;
      rowLetterIndex++;
      addLetterToRow(
        Array.from(currentRowInUse.children),
        key.textContent,
        rowLetterIndex,
      );
    } else {
      console.log("Word is too long");
    }
  });
});

//-------

submitButton.addEventListener("click", () => {
  if (wordInput.length != 5) {
    errorRowAnimation(currentRowInUse);
    return;
  }
  wordInsertionAnimation(Array.from(currentRowInUse.children), wordInput);

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
