const CORRECT = "correct";
const INCORRECT = "incorrect";
const NOTHING = "nothing";

const countOfLetters = (word) => {
  const wordInObject = {};
  [...word].forEach(char => {
    if (!wordInObject[char]) {
      wordInObject[char] = 0;
    }
    wordInObject[char]++;
  })
  return wordInObject;
}

class WordValidator {
  constructor(secretWord) {
    this.secretWord = secretWord
  }

  validate(inputWord) {
    const lettersCount = countOfLetters(this.secretWord);
    const letters = inputWord.split('');
    const correctArray = letters.map((letter, index) => {
      return this.isCorrectPosition(letter, index, lettersCount);
    });
    return letters.map((letter, index) => {
      return this.isIncorrectPosition(letter, index, lettersCount, correctArray);
    });
  }

  isCorrectPosition(letter, index, lettersCount) {
    const isCorrectLetter = this.secretWord[index] === letter;
    if (isCorrectLetter) {
      lettersCount[letter]--;
      return CORRECT;
    } else {
      return NOTHING;
    }
  }

  isIncorrectPosition(letter, index, lettersCount, correctArray) {
    if (correctArray[index] === CORRECT) {
      return CORRECT;
    } else if (this.secretWord.includes(letter) && (lettersCount[letter] || 0) > 0) {
      lettersCount[letter]--;
      return INCORRECT;
    } else {
      return NOTHING;
    }
  }
}

// const validator = new WordValidator('canard')
// console.log(validator.validate('canard'));
// console.log(validator.validate('canuts'));
// console.log(validator.validate('cacaca'));
