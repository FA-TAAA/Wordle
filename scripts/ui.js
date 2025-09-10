"use strict";

function addLetterToRow(row, letter, index) {
  row[index].textContent = letter;
}

function removeLetterFromRow(row, index) {
  console.log(index);
  console.log(row[index]);
  row[index].textContent = "";
}

function errorRowAnimation(row) {
  row.classList.add(`error-animation`);
  (row.addEventListener("animationend", () => {
    currentRowInUse.classList.remove(`error-animation`);
  }),
    { once: true });
}

function wordInsertionAnimation(row, wordInput) {
  row.forEach((item, index) =>
    setTimeout(() => {
      if (!wordToGuess.includes(wordInput.charAt(index))) {
        item.classList.add("unavailable");
        return;
      }
      if (wordInput.charAt(index) == wordToGuess.charAt(index)) {
        item.classList.add("correct-place");
      } else {
        item.classList.add("wrong-place");
      }
    }, index * 500),
  );
}
