const newWords = document.querySelector('.new-words');
const wordInput = newWords.querySelector('input[name="word"]');
const wordContainer = document.querySelector('.word');
const newWordContainer = document.querySelector('.add-word');

  const wordToGuess = "Canuts";

  const addLetterClass = () => {
    wordInput.classList.add('input-word');
  }

  const addWord = (e) => {
    e.preventDefault();
  addLetterClass();
  const inputWord = wordInput.value;
  populateWordContainer(inputWord, wordContainer);
  populateWordContainer(inputWord, newWordContainer);
  if (inputWord.toUpperCase() !== wordToGuess.toUpperCase()) {
    newWordContainer.classList.add('word');
  } else {
    alert('You Won!')
  }
  wordInput.value = '';
};

const populateWordContainer = (wordInput, wordContainer) => {
  wordContainer.innerHTML = wordInput.split('').map((letter, index) => {
    return `<div data-index="${index}" class="letter">${letter}</div>`
  }).join('');
};

newWords.addEventListener('submit', addWord);
wordInput.addEventListener('input', addLetterClass);
newWordContainer.addEventListener('submit', addWord);

// populateWordContainer(wordInput.value, wordContainer);
