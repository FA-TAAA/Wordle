"use strict";

function addLetterToRow(row, letter, index) {
  row[index].textContent = letter;
}

function removeLetterFromRow(row, index) {
  row[index].textContent = "";
}

function errorRowAnimation(row) {
  row.classList.add(`error-animation`);
  (row.addEventListener("animationend", () => {
    currentRowInUse.classList.remove(`error-animation`);
  }),
    { once: true });
}

function wordInsertionAnimation(row, input) {
  row.forEach((item, index) =>
    setTimeout(() => {
      let wordInputChar = input.charAt(index);
      if (!wordToGuess.includes(wordInputChar)) {
        item.classList.add("unavailable");
        removeUnavailabeKeyboardLetters(keyboard, wordInputChar);
        return;
      }
      if (wordToGuess.charAt(index) == wordInputChar) {
        item.classList.add("correct-place");
      } else {
        item.classList.add("wrong-place");
      }
    }, index * 300),
  );
}

function removeUnavailabeKeyboardLetters(keyboardArray, char) {
  const keyboard = Array.from(keyboardArray.children);
  keyboard.forEach((key) => {
    if (key.localName == "div") {
      if (key.textContent == char) {
        disableKeyStroke(key);
        key.classList.add("removed-key");
      }
    }
  });
}

function resetKeyboardUI(keyboardArray) {
  const keyboard = Array.from(keyboardArray.children);
  keyboard.forEach((key) => {
    if (key.localName == "div") {
      key.classList.remove("removed-key");
    }
  });
}

function hideElement(element, hide) {
  element.classList.toggle("hidden", hide);
}
