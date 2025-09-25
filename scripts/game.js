"use strict";

function setupKeyStroke(key) {
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

submitButton.addEventListener("click", () => {
  if (wordInput.length != 5) {
    errorRowAnimation(currentRowInUse);
    return;
  }

  if (rowInUseIndex == wordleLength - 1) {
    disableKeyboard(keyboardKeys);
    return;
  }

  wordInsertionAnimation(Array.from(currentRowInUse.children), wordInput);

  if (wordInput === wordToGuess) {
    disableKeyboard(keyboardKeys);
    setTimeout(() => {
      hideElement(gameSettings, false);
      resetKeyboardUI(keyboard);
      wordInput = "";
      rowInUseIndex = 0;
      rowLetterIndex = -1;
    }, 3000);
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

function disableKeyStroke(key) {
  key.removeEventListener("click", setupKeyStroke);
}

function disableKeyboard(keys) {
  keys.forEach((key) => {
    disableKeyStroke(key);
  });
}
