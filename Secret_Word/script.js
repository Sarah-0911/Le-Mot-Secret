const newWord = document.querySelector('.new-word');
const wordInput = newWord.querySelector('input[name="word"]');
const wordsContainer = document.querySelectorAll('.word');

const wordsToGuess = "Canard";
const secretWord = wordsToGuess.toUpperCase();
let inputWord = '';

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
}

const checkWord = (letter, index) => {
  const inputLetter = letter.textContent;
  const isCorrectLetter = secretWord[index] === inputLetter;

  if (isCorrectLetter) {
    letter.style.backgroundColor = '#32d288';
  } else if (secretWord.includes(inputLetter) && (countOfChars(secretWord)[inputLetter] || 0) > 0) {
    letter.style.backgroundColor = '#ffe741';
    letter.style.borderRadius = '50%';
    countOfChars(secretWord)[inputLetter]--;
  }
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
