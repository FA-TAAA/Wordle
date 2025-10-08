"use strict";

function insertLetterInRow(letter, row, letterIndex) {
  Array.from(row.children)[letterIndex].textContent = letter;
}

function insertWordIntoRow(word, row) {
  const positions = checkPosition(word, wordle);
  console.log(positions);
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

function hideElement(element, visiblity = true) {
  element.classList.toggle("hidden", visiblity);
}
