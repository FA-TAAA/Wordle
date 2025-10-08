"use strict";

let wordInput;
let currentRowInUse;
let currentRowIndex;
let currentRowLetterIndex;

function initializeGame() {
  wordInput = "";
  currentRowIndex = 0;
  currentRowLetterIndex = 0;
  createWordleGrid(wordleLength);
  currentRowInUse = wordleGrid.children[currentRowIndex];
  enterButton.addEventListener("click", submitGuess);
  backspaceButton.addEventListener("click", cancelLetter);
  Array.from(keyboard.children).forEach((key) => {
    if (key.className == "keyboard__key") {
      key.addEventListener("click", activateKeystroke);
    }
  });
}

function activateKeystroke() {
  if (wordInput.length >= wordleLength) return;
  if (currentRowIndex >= 5) return;
  wordInput = wordInput + this.textContent;
  insertLetterInRow(this.textContent, currentRowInUse, currentRowLetterIndex);
  currentRowLetterIndex++;
}

function submitGuess() {
  if (wordInput.length < wordleLength) {
    incompleteRow(currentRowInUse);
    return;
  }
  insertWordIntoRow(wordInput, Array.from(currentRowInUse.children));

  if (wordle === wordInput || currentRowIndex >= 5) {
    disableKeyboard();
    setTimeout(() => {
      winningAnimation(currentRowInUse);
    }, wordleLength * 600);
    return;
  }
  currentRowInUse = wordleGrid.children[++currentRowIndex];
  wordInput = "";
  currentRowLetterIndex = 0;
  if (currentRowIndex >= 5) {
    disableKeyboard();
    setTimeout(() => {
      wordleSettings.showModal();
      messageIndicator("dialog", `The Worlde was "${wordle}"`);
      console.log("hello");
    }, wordleLength * 600);
    return;
  }
}

function cancelLetter() {
  if (currentRowLetterIndex <= 0) return;
  --currentRowLetterIndex;
  removeLetterFromRow(
    Array.from(currentRowInUse.children),
    currentRowLetterIndex,
  );
  wordInput = wordInput.slice(0, -1);
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

function checkPosition(input, wordle) {
  const positionMap = [];
  for (let i = 0; i < wordle.length; i++) {
    if (!wordle.includes(input[i])) {
      positionMap.push("none");
      continue;
    }

    if (input[i] == wordle[i]) {
      positionMap.push("correct");
    } else {
      positionMap.push("incorrect");
    }
  }
  return positionMap;
}
