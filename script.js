import { fetchWord } from './utils/fetchWordApi.js';
import { initializeWinAnimation, initializeLoseAnimation } from './animation.js';

let secretWord = '';

const guessForm = document.querySelector('.guess-form');
const wordEntry = guessForm.querySelector('.word-entry');
const msgInfo = document.querySelector('.msg-info');
const words = document.querySelectorAll('.word');

let attemptWord = 0;
const maxAttempts = words.length;


// --- Fetch formated SecretWord ---

const initializeGame = async() => {

  const wordToFind = await fetchWord();

  if(wordToFind) {
    secretWord = wordToFind
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g,'')
    .toUpperCase();
    console.log(secretWord);

    setupGame();

  } else {
    console.log('Failed to fetch');
  }
};
initializeGame();

// --- Play Game ---

const setupGame = () => {

  const validateInput = () => {
    if (wordEntry.value.length !== 6) {
      wordEntry.setCustomValidity('Ton mot doit comporter 6 lettres !');
    } else {
      wordEntry.setCustomValidity('');
    }
  };

  wordEntry.addEventListener('input', () => {
    validateInput();
    if (wordEntry.checkValidity()) {
      wordEntry.setCustomValidity('');
    }
  });


  const countOfLetters = (word) => {
    const wordLettersCount = {};
    [...word].forEach(letter => {
      if (!wordLettersCount[letter]) {
        wordLettersCount[letter] = 0;
      }
      wordLettersCount[letter]++;
    })
    return wordLettersCount;
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
    if (!isCorrectPosition(letter, index) &&
    secretWord.includes(inputLetter) &&
    (secretLettersCount[inputLetter] || 0) > 0) {
      letter.classList.add('incorrect-position');
      secretLettersCount[inputLetter]--;
    }
  };

  let locked = false;

  const addWord = () => {
    const inputWord = wordEntry.value.toUpperCase();
    const emptyWord = document.querySelector('.empty');

    if (!emptyWord || locked) return;
    emptyWord.classList.remove('empty');

    const secretLettersCount = countOfLetters(secretWord);
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

    attemptWord++;
    displayMsg(inputWord);

    wordEntry.value = '';
  };

  const displayMsg = (word) => {

    setTimeout(() => {
      if (word === secretWord) {
        msgInfo.textContent = "🎉🎉🎉 Tu as gagné! 🎉🎉🎉";
        msgInfo.classList.add('active');

        const winCanvas = document.querySelector("#win-dotLottie-canvas");
        winCanvas.classList.add('active');

        initializeWinAnimation();
        locked = true;

      } else if (attemptWord === maxAttempts) {
        msgInfo.textContent = "Tu as perdu 💩"
        msgInfo.classList.add('active');

        const loseCanvas = document.querySelector("#lose-dotLottie-canvas");
        loseCanvas.classList.add('active');

        initializeLoseAnimation();
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

  guessForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addWord();
  });
};
