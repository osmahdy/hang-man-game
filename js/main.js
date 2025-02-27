let letters = 'abcdefghijklmnopqrstuvwxyz';
let lettersArr = Array.from(letters);

//display the letters in the game
let lettersElement = document.querySelector('.row .letters');
lettersArr.forEach((letter) => {
  let span = document.createElement('span');
  span.textContent = letter.toUpperCase();
  lettersElement.appendChild(span);
});

//pick the word and the category randomly
let words = {
  Programming: ['java', 'python', 'javascript', 'html', 'css', 'jquery', 'php', 'go', 'laravel', 'mysql'],
  Countries: ['egypt', 'palestine', 'syria', 'lebanon', 'jordan', 'libya'],
  Arabic_Names: ['osama', 'bader', 'maher', 'ahmed', 'mohammed', 'khaled', 'qatar'],
};

//pick the category
let categoryiesNames = Object.keys(words);
let r1 = Math.floor(Math.random() * categoryiesNames.length);
let categoryElement = document.querySelector('.game-info .category span:last-child');
categoryElement.textContent = categoryiesNames[r1];
if (categoryElement.textContent === 'Arabic_Names') {
  categoryElement.textContent = `Arabic Names`;
}

//pick the word
let tryEl = document.querySelector(`.game-info .try`);
let lettersGuess = document.querySelector('.letters-guess');
let category = categoryiesNames[r1];
let numberOfWords = words[category].length;
let r2 = Math.floor(Math.random() * numberOfWords);
let word = words[category][r2];
tryEl.textContent = `8/8`;
//create the inputs
let wordArr = Array.from(word);
wordArr.forEach((char) => {
  let span = document.createElement(`span`);
  span.type = 'text';
  lettersGuess.appendChild(span);
});

let wrong = 0;
//handle clicking the letters
let letter = document.querySelectorAll(`.row .letters span`);
let lettersToGuessSpans = document.querySelectorAll(`.letters-guess span`);
let chosenWord = Array.from(word);
let finish = 0;
letter.forEach((ltr) => {
  let theStatus = false;
  ltr.onclick = () => {
    ltr.classList.add('clicked');
    let clickedLetter = ltr.textContent;
    chosenWord.forEach((wordLetter, wordIndex) => {
      if (wordLetter.toUpperCase() == clickedLetter) {
        theStatus = true;
        finish++;
        lettersToGuessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.textContent = clickedLetter;
          }
        });
      }
      if (finish === word.length) {
        letter.forEach((lrr) => lrr.classList.add('clicked'));
        let trueEl = document.querySelector(`.true`);
        trueEl.innerHTML = `Winner Winner Chicken Dinner`;
        trueEl.style.color = 'green';
      }
    });

    if (!theStatus) {
      if (wrong < 8) {
        let draw = document.querySelectorAll(`.row .hangman-draw div`);
        draw[wrong].style.display = 'block';
        tryEl.textContent = `${8 - wrong}/8`;
        wrong++;
      } else {
        tryEl.textContent = `0/8`;
        letter.forEach((ltr) => ltr.classList.add('clicked'));
        let trueEl = document.querySelector(`.true`);
        trueEl.innerHTML = `The Word is: <span>${word}</span>`;
      }
    }
  };
});

let footerYear = document.querySelector(`footer .year`);
let date = new Date();
footerYear.textContent = date.getFullYear();