"use strict";

function createWordleGrid(length) {
  wordleGrid.innerHTML = "";
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

function insertLetterInRow(letter, row, letterIndex) {
  Array.from(row.children)[letterIndex].textContent = letter;
}

function insertWordIntoRow(word, row) {
  const positions = checkPosition(word, wordle);
  for (let i = 0; i < word.length; i++) {
    setTimeout(() => {
      switch (positions[i]) {
        case "correct":
          row[i].style.backgroundColor = "green";
          break;

        case "incorrect":
          row[i].style.backgroundColor = "salmon";
          break;

        case "none":
          row[i].style.backgroundColor = "gray";
          break;
      }
    }, i * 500);
  }
}

function removeLetterFromRow(row, index) {
  row[index].innerHTML = "&nbsp;";
}

function incompleteRow(row) {
  row.classList.add("empty");
  row.addEventListener("animationend", () => {
    row.classList.remove("empty");
  });
}

function winningAnimation(row) {
  row.classList.add("win");
  row.addEventListener("animationend", () => {
    row.classList.remove("win");
    wordleSettings.showModal();
  });
}

function messageIndicator(type = "game", message) {
  dialogIndicator.textContent = message;
  setTimeout(() => {
    dialogIndicator.textContent = " ";
  }, 5000);
}
