const newWord = document.querySelector('.new-word');
const wordInput = newWord.querySelector('input[name="word"]');
const wordsContainer = document.querySelectorAll('.word');

const randomWords = ['Canuts', 'Machon', 'Bugnes', 'Soyeux', 'Vorace'];
const wordToGuess = randomWords[Math.floor(Math.random() * randomWords.length)];


// const wordToGuess = "Canard";
const secretWord = wordToGuess.toUpperCase();

const customizeWord = () => {
  wordInput.classList.add('input-word');
}

const countOfChars = word => {
  const wordInObject = {};
  [...word].forEach(char => {
    if (!wordInObject[char]) {
      wordInObject[char] = 0;
    }
    wordInObject[char]++;
  })
  return wordInObject;
};

const isCorrectPosition = (letter, index) => {
  const inputLetter = letter.textContent;
  const isCorrectLetter = secretWord[index] === inputLetter;

  return isCorrectLetter;
};

const checkCorrectPosition = (letter, index, lettersCount) => {
  const inputLetter = letter.textContent;

  if (isCorrectPosition(letter, index)) {
    letter.classList.add('correct-position');
    lettersCount[inputLetter]--;
  }
};

const checkIncorrectPosition = (letter, index, lettersCount) => {
  const inputLetter = letter.textContent;

  if (!isCorrectPosition(letter, index) && secretWord.includes(inputLetter) && (lettersCount[inputLetter] || 0) > 0) {
    letter.classList.add('incorrect-position');
    lettersCount[inputLetter]--;
  }
};

const addWord = (e) => {
  e.preventDefault();
  customizeWord();
  const inputWord = wordInput.value.toUpperCase();

  const emptyWord = document.querySelector('.empty');
  if (!emptyWord) return;
  emptyWord.classList.remove('empty');

  const letters = emptyWord.querySelectorAll('.letter');

  const lettersCount = countOfChars(secretWord);

  inputWord.split('').forEach((letter, index) => {
    letters[index].textContent = letter;
    checkCorrectPosition(letters[index], index, lettersCount);
  });

  inputWord.split('').forEach((letter, index) => {
    letters[index].textContent = letter;
    checkIncorrectPosition(letters[index], index, lettersCount);
  });

  if (inputWord === secretWord.toUpperCase()) {
    alert('You Won!')
  }

  // for (let i = 1; i <= 5; i ++) {
  //   const currentRow = document.querySelectorAll('.word');
  //   const letters = currentRow.querySelectorAll('.letter');

  //   let isRowEmpty = true;
  //   letters.forEach(letter => {
  //     if (letter.textContent !== '' && letter.textContent !== '.') {
  //       isRowEmpty = false;
  //     }
  //   });

  //   if (isRowEmpty) {
  //     const lettersCount = countOfChars(secretWord);

  //     inputWord.split('').forEach((letter, index) => {
  //       letters[index].textContent = letter;
  //       checkCorrectPosition(letters[index], index, lettersCount);
  //     });

  //     inputWord.split('').forEach((letter, index) => {
  //       letters[index].textContent = letter;
  //       checkIncorrectPosition(letters[index], index, lettersCount);
  //     });

  //     if (inputWord === secretWord.toUpperCase()) {
  //       alert('You Won!')
  //     }
  //     break;
  //   };
  // };
  wordInput.value = '';
};

newWord.addEventListener('submit', addWord);
wordInput.addEventListener('input', customizeWord);
