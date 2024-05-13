const newWord = document.querySelector('.new-word');
const wordInput = newWord.querySelector('input[name="word"]');
const wordsContainer = document.querySelectorAll('.word');

const wordsToGuess = "Canard";
const secretWord = wordsToGuess.toUpperCase();
let inputWord = '';

const customizeWord = () => {
  wordInput.classList.add('input-word');
}

const checkWord = (letter, index) => {
  const inputLetter = letter.textContent;
  const isCorrectLetter = secretWord[index] === inputLetter;
  let countInSecretWord = 0;
  let countInInputWord = 0;

  for (let i = 0; i < secretWord.length; i++) {
    if (secretWord[i] === inputLetter) {
      countInSecretWord++;
    }
  }

  for (let i = 0; i < inputWord.length; i++) {
    if (inputWord[i] === inputLetter) {
      countInInputWord++;
    }
  }

  if (isCorrectLetter) {
    letter.style.backgroundColor = '#32d288';
  } else if (secretWord.includes(inputLetter) && countInInputWord <= countInSecretWord) {
    letter.style.backgroundColor = '#ffe741';
    letter.style.borderRadius = '50%';
  }

  // if (countInInputWord > countInSecretWord) {
  //   letter.style.backgroundColor = 'blue';
  // }
}

const addWord = (e) => {
  e.preventDefault();
  customizeWord();
  inputWord = wordInput.value.toUpperCase();

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
        checkWord(letters[index], index);
      });

      if (inputWord === secretWord.toUpperCase()) {
        alert('You Won!')
      }
      break;
    };
  };
  wordInput.value = '';
};

newWord.addEventListener('submit', addWord);
wordInput.addEventListener('input', customizeWord);
