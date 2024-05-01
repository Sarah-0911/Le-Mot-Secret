const newWords = document.querySelector('.new-words');
const wordInput = newWords.querySelector('input[name="word"]');
const wordsContainer = document.querySelectorAll('.word');

const rowOne = document.querySelector('.row-1');
const rowTwo = document.querySelector('.row-2');
const rowThree = document.querySelector('.row-3');
const rowFour = document.querySelector('.row-4');
const rowFive = document.querySelector('.row-5');

const wordOne = rowOne.querySelectorAll('.letter');
const wordTwo = rowTwo.querySelectorAll('.letter');
const wordThree = rowThree.querySelectorAll('.letter');
const wordFour = rowFour.querySelectorAll('.letter');
const wordFive = rowFive.querySelectorAll('.letter');

console.log(wordsContainer);

const wordToGuess = "Canuts";

const addLetterClass = () => {
  wordInput.classList.add('input-word');
}

//   const addWord = (e) => {
//   e.preventDefault();
//   addLetterClass();
//   const inputWord = wordInput.value.toUpperCase();
//   populateWordContainer(inputWord, wordContainer);

//   if (inputWord === wordToGuess.toUpperCase()) {
//     alert('You Won!')
//   } else {
//     newWordContainer.classList.add('word');
//     populateWordContainer(inputWord, newWordContainer);
//   };
//   wordInput.value = '';
// };

const wholeWord = (word) => {
  return Array.from(word).map(letter => letter.textContent).join('');
};
console.log(wholeWord(wordOne));


const addWord = (e) => {
  e.preventDefault();
  addLetterClass();
  const inputWord = wordInput.value.toUpperCase();

  for (let i = 1; i <= 5; i ++) {
    const currentRow = document.querySelector(`.row-${i}`);
    const letters = currentRow.querySelectorAll('.letter');

    let isRowEmpty = true;
    letters.forEach(letter => {
      if (letter.textContent !== '' && letter.textContent !== '.') {
        isRowEmpty = false;
      }
    });

    if (isRowEmpty) {
      inputWord.split('').forEach((letter, index) => {
        letters[index].textContent = letter;
      });

      if (inputWord === wordToGuess.toUpperCase()) {
        alert('You Won!')
      }

      break;
    }
  }

  wordInput.value = '';
};


const populateWordContainer = (wordInput, wordsContainer) => {
 wordsContainer.innerHTML = wordInput.split('').map((letter, index) => {
    return `<div data-index="${index}" class="letter">${letter}</div>`
  }).join('');
};

newWords.addEventListener('submit', addWord);
wordInput.addEventListener('input', addLetterClass);
