const newWord = document.querySelector('.new-word');
const wordInput = newWord.querySelector('input[name="word"]');

const randomWords = ['Canuts', 'Machon', 'Bugnes', 'Soyeux', 'Vorace'];
const wordToGuess = randomWords[Math.floor(Math.random() * randomWords.length)];

const secretWord = wordToGuess.toUpperCase();


const handleGame = (e) => {
  e.preventDefault();
  addWord();
};


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
  const isCorrectLetter = secretWord[index] === inputLetter;
  return isCorrectLetter;
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
      checkIncorrectPosition(letters[index], index, secretLettersCount);
    }, index * 300);
  });

  if (inputWord === secretWord.toUpperCase()) {
    const msgInfo = document.querySelector('.msg-info');
    setTimeout(() => {
      msgInfo.textContent = "🎉🎉🎉 You Won! 🎉🎉🎉"
      msgInfo.classList.add('show');
    }, inputWord.length * 300)
  }

  wordInput.value = '';
};

newWord.addEventListener('submit', handleGame);
