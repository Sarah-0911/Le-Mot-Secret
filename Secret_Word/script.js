import { initializeWinAnimation } from './animation.js';

let secretWord = '';

const guessForm = document.querySelector('.guess-form');
const wordEntry = guessForm.querySelector('.word-entry');
const msgInfo = document.querySelector('.msg-info');
const words = document.querySelectorAll('.word');
let attemptCount = 0;
const maxAttempts = words.length;

const fetchWord = async() => {
  const url = `https://trouve-mot.fr/api/size/6`;

  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error(`Error: ${response.status} : ${response.statusText}`);

    const data = await response.json();
    console.log(data[0].categorie);
    return data[0].name;

  } catch (error) {
    console.log(error);
  }
};

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


const setupGame = () => {

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

      } else if (attemptCount === maxAttempts) {
        msgInfo.textContent = "Tu as perdu 💩"
        msgInfo.classList.add('active');
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

initializeGame();
