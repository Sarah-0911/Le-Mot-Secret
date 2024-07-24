const newWord = document.querySelector('.new-word');
const wordInput = newWord.querySelector('input[name="word"]');

const randomWords = ['Canuts', 'Machon', 'Bugnes', 'Soyeux', 'Vorace'];
// const wordToGuess = randomWords[Math.floor(Math.random() * randomWords.length)];
const wordToGuess = 'canuts'
const secretWord = wordToGuess.toUpperCase();

const words = document.querySelectorAll('.word');
let attemptCount = 0;
const maxAttempts = words.length;

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

let locked = false;

const addWord = () => {
  const inputWord = wordInput.value.toUpperCase();
  const emptyWord = document.querySelector('.empty');

  if (!emptyWord || locked) return;
  emptyWord.classList.remove('empty');

  const secretLettersCount = countOfChars(secretWord);
  const letters = emptyWord.querySelectorAll('.letter');

  locked = true;

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
        appendNextRow(inputWord);
      }
      locked = false;
    }, inputWord.length * 300);
  });

  attemptCount++;
  displayMsg(inputWord);

  wordInput.value = '';
};


const msgInfo = document.querySelector('.msg-info');

const displayMsg = (word) => {
  setTimeout(() => {
    if (word === secretWord) {
      msgInfo.textContent = "🎉🎉🎉 You Won! 🎉🎉🎉"
      msgInfo.classList.add('show');
      locked = true;
    } else if (attemptCount === maxAttempts) {
      msgInfo.textContent = "Try again!"
      msgInfo.classList.add('show');
    }
  }, word.length * 300);
};

const appendNextRow = (checkedWord) => {
  const nextRow = document.querySelector('.empty');
  if (nextRow) {
    const nextRowLetters = nextRow.querySelectorAll('.letter');
    checkedWord.split('').forEach((letter, index) => {
      if (isCorrectPosition({ textContent: letter }, index)) {
        nextRowLetters[index].textContent = letter;
      } else {
        nextRowLetters[index].textContent = '.';
      }
    })
  }
};

newWord.addEventListener('submit', (e) => {
  e.preventDefault();
  addWord();
});
