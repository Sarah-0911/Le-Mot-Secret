import { fetchWord } from './utils/fetchWordApi.js';
import { initializeWinAnimation, initializeLoseAnimation } from './animation.js';

document.addEventListener('DOMContentLoaded', () => {
  const words = document.querySelectorAll('.word');
  const guessForm = document.querySelector('.guess-form');
  const wordEntry = guessForm.querySelector('.word-entry');

  let secretWord = '';
  let attemptWord = 0;
  const maxAttempts = words.length;
  let locked = false;

  // --- Display hint ---
  const hintContainer = document.querySelector('.hint-container');
  const hintModal = document.querySelector('.hint-modal');

  const displayHint = (category) => {
    hintModal.innerHTML = `- catégorie -<br/><span>${category}</span>`;

    hintContainer.addEventListener('click', () => {
      if (locked) return;
      hintModal.classList.add('active');
      hintContainer.style.display = 'none';
      locked = true;

      setTimeout(() => {
        hintModal.classList.remove('active');
        locked = false;
      }, 3000);
    });

    hintContainer.addEventListener('touchstart', () => {
      if (locked) return;
      hintModal.classList.add('active');
      hintContainer.style.display = 'none';
      locked = true;

      setTimeout(() => {
        hintModal.classList.remove('active');
        locked = false;
      }, 3000);
    });
  };

  // --- Fetch formatted wordData ---
  const initializeGame = async () => {
    const wordData = await fetchWord();

    if (wordData) {
      const { name, category } = wordData;
      console.log(category);

      secretWord = name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toUpperCase();
      console.log(secretWord);

      displayHint(category);
      setupGame();
    } else {
      console.log('Failed to fetch');
    }
  };

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
      });
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

    const inputWords = [];

    const addWord = () => {
      const inputWord = wordEntry.value.toUpperCase();
      const emptyWord = document.querySelector('.empty');

      inputWords.push(inputWord);

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
            appendNextRow(inputWords);
          }
          locked = false;
        }, inputWord.length * 300);
      });

      attemptWord++;
      displayMsg(inputWord);

      wordEntry.value = '';
    };

    // --- Display final msg ---
    const msgInfo = document.querySelector('.msg-info');
    const answer = document.querySelector('.answer');

    const displayMsg = (word) => {
      setTimeout(() => {
        if (word === secretWord) {
          hintContainer.style.display = 'none';

          msgInfo.textContent = "🎉🎉🎉 Tu as gagné! 🎉🎉🎉";
          msgInfo.classList.add('active');

          const winCanvas = document.querySelector("#win-dotLottie-canvas");
          winCanvas.classList.add('active');

          initializeWinAnimation();
          locked = true;
        } else if (attemptWord === maxAttempts) {
          hintContainer.style.display = 'none';

          msgInfo.textContent = "Tu as perdu 💩";
          msgInfo.classList.add('active');

          answer.innerHTML = `La réponse était <span>${secretWord}</span>.`;
          answer.classList.add('active');

          const loseCanvas = document.querySelector("#lose-dotLottie-canvas");
          loseCanvas.classList.add('active');

          initializeLoseAnimation();
        }
      }, word.length * 300);
    };

    const appendNextRow = (checkedWords) => {
      const nextRow = document.querySelector('.empty');

      if (nextRow) {
        const nextRowLetters = nextRow.querySelectorAll('.letter');
        nextRowLetters.forEach(letter => letter.textContent = '.');

        checkedWords.forEach(checkedWord => {
          checkedWord.split('').forEach((letter, index) => {
            if (isCorrectPosition({ textContent: letter }, index)) {
              nextRowLetters[index].textContent = letter;
            }
          });
        })
      }
    };

    guessForm.addEventListener('submit', (e) => {
      e.preventDefault();
      addWord();
    });
  };

  initializeGame();
});
