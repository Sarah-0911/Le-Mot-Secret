const newWord = document.querySelector('.new-word');
const wordInput = newWord.querySelector('input[name="word"]');
const wordsContainer = document.querySelectorAll('.word');

// const rowOne = document.querySelector('.row-1');
// const rowTwo = document.querySelector('.row-2');
// const rowThree = document.querySelector('.row-3');
// const rowFour = document.querySelector('.row-4');
// const rowFive = document.querySelector('.row-5');

// const wordOne = rowOne.querySelectorAll('.letter');
// const wordTwo = rowTwo.querySelectorAll('.letter');
// const wordThree = rowThree.querySelectorAll('.letter');
// const wordFour = rowFour.querySelectorAll('.letter');
// const wordFive = rowFive.querySelectorAll('.letter');

console.log(wordsContainer);

const secretWord = "Canard";
const wordToGuess = secretWord.toUpperCase();

const customizeWord = () => {
  wordInput.classList.add('input-word');
}

const correctLetter = (letter, index) => {
  if (wordToGuess[index] === letter.textContent) {
      letter.style.backgroundColor = '#ff5a5a';
  } else if (wordToGuess.includes(letter.textContent)) {
    letter.style.backgroundColor = '#ffe007';
    letter.style.borderRadius = '50%';
  }
}

// const wholeWord = (word) => {
//   return Array.from(word).map(letter => letter.textContent).join('');
// };
// console.log(wholeWord(wordOne));


const addWord = (e) => {
  e.preventDefault();
  customizeWord();
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
        correctLetter(letters[index], index);
      });

      if (inputWord === wordToGuess.toUpperCase()) {
        alert('You Won!')
      }
      break;
    };
  };
  wordInput.value = '';
};

newWord.addEventListener('submit', addWord);
wordInput.addEventListener('input', customizeWord);
