const newWord = document.querySelector('.new-word');
const wordInput = newWord.querySelector('input[name="word"]');

const randomWords = ['Canuts', 'Machon', 'Bugnes', 'Soyeux', 'Vorace'];
// const wordToGuess = randomWords[Math.floor(Math.random() * randomWords.length)];
const wordToGuess = 'canuts'

const secretWord = wordToGuess.toUpperCase();

let attemptCount = 0;
const maxAttempts = 5;


const countOfChars = (word) => {
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
  return secretWord[index] === inputLetter;
};

const checkCorrectPosition = (letter, index, secretLettersCount) => {
  const inputLetter = letter.textContent;
  if (isCorrectPosition(letter, index)) {
    letter.classList.add('correct-position');
    secretLettersCount[inputLetter]--;
  }
};

const checkIncorrectPosition = (letter, index, secretLettersCount) => {
  const inputLetter = letter.textContent;
  if (!isCorrectPosition(letter, index) && secretWord.includes(inputLetter) && (secretLettersCount[inputLetter] || 0) > 0) {
    letter.classList.add('incorrect-position');
    secretLettersCount[inputLetter]--;
  }
};

const addWord = () => {
  const inputWord = wordInput.value.toUpperCase();
  const emptyWord = document.querySelector('.empty');

  if (!emptyWord) return;
  emptyWord.classList.remove('empty');

  const secretLettersCount = countOfChars(secretWord);
  const letters = emptyWord.querySelectorAll('.letter');

  inputWord.split('').forEach((letter, index) => {
    setTimeout(() => {
      letters[index].textContent = letter;
      checkCorrectPosition(letters[index], index, secretLettersCount);
    }, index * 300);
  });

  inputWord.split('').forEach((letter, index) => {
    setTimeout(() => {
      letters[index].textContent = letter;
      checkIncorrectPosition(letters[index], index, secretLettersCount);
      if (index === inputWord.length - 1 && inputWord !== secretWord.toUpperCase()) {
        appendNextEmptyRow(inputWord);
      }
    }, inputWord.length * 300);
  });

  const msgInfo = document.querySelector('.msg-info');

  setTimeout(() => {
    attemptCount++;
    if (inputWord === secretWord) {
      msgInfo.textContent = "🎉🎉🎉 You Won! 🎉🎉🎉"
      msgInfo.classList.add('show');
    } else if (attemptCount === maxAttempts) {
      msgInfo.textContent = "Try again!"
      msgInfo.classList.add('show');
    }
  }, inputWord.length * 300);

  wordInput.value = '';
};

const appendNextEmptyRow = (inputWord) => {
  const nextEmptyRow = document.querySelector('.empty');
  if (nextEmptyRow) {
    const nextEmptyRowLetters = nextEmptyRow.querySelectorAll('.letter');
    inputWord.split('').forEach((letter, index) => {
      if (isCorrectPosition({ textContent: letter }, index)) {
        nextEmptyRowLetters[index].textContent = letter;
      } else {
        nextEmptyRowLetters[index].textContent = '.';
      }
    })
  }
};

newWord.addEventListener('submit', (e) => {
  e.preventDefault();
  addWord();
});
