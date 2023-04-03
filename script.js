const words = ['javascript', 'html', 'css', 'python', 'react'];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let remainingGuesses = 6;

const wordContainer = document.querySelector('#word-container');
const remainingGuessesContainer = document.querySelector('#remaining-guesses');
const messageContainer = document.querySelector('#message-container');
const resetButton = document.querySelector('#reset-button');
const hangmanDisplay = document.querySelector('#hangman-display');
// ... (previous code)

// DOM elements
// ...
const alphabetContainer = document.querySelector('#alphabet-container');

// Function to generate alphabet buttons
function generateAlphabetButtons() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    for (let letter of alphabet) {
        const button = document.createElement('button');
        button.classList.add('letter-button');
        button.innerText = letter.toUpperCase();
        button.addEventListener('click', handleGuess);
        alphabetContainer.appendChild(button);
    }
}

// ... (previous code)

// Set up event listeners
window.onload = () => {
    // ... (previous code)

    // Generate alphabet buttons
    generateAlphabetButtons();
};


const hangmanStages = [
    `+---+
     |
     |
     |
    ===`,
    `+---+
     |   O
     |
     |
    ===`,
    `+---+
     |   O
     |   |
     |
    ===`,
    `+---+
     |   O
     |  /|
     |
    ===`,
    `+---+
     |   O
     |  /|\\
     |
    ===`,
    `+---+
     |   O
     |  /|\\
     |  /
    ===`,
    `+---+
     |   O
     |  /|\\
     |  / \\
    ===`
];

function displayHangman() {
    hangmanDisplay.innerHTML = hangmanStages[6 - remainingGuesses].replace(/ /g, '&nbsp;').replace(/\n/g, '<br>');
}

function displayWord() {
    const wordArray = selectedWord.split('').map(letter => (guessedLetters.includes(letter) ? letter : '_'));
    const wordString = wordArray.join(' ');
    wordContainer.innerText = wordString;
}

function handleGuess(event) {
    const guessedLetter = event.target.innerText.toLowerCase();

    if (guessedLetters.includes(guessedLetter) || remainingGuesses <= 0 || messageContainer.innerText !== '') {
        return;
    }

    guessedLetters.push(guessedLetter);

    if (selectedWord.includes(guessedLetter)) {
        displayWord();
    } else {
        remainingGuesses--;
        remainingGuessesContainer.innerText = `Remaining Guesses: ${remainingGuesses}`;
        displayHangman();
    }

    if (!wordContainer.innerText.includes('_')) {
        messageContainer.innerText = 'Congratulations, you win!';
    } else if (remainingGuesses === 0) {
        messageContainer.innerText = `You lose! The word was "${selectedWord}".`;
    }
}

function resetGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    remainingGuesses = 6;
    displayWord();
    displayHangman();
    remainingGuessesContainer.innerText = `Remaining Guesses: ${remainingGuesses}`;
    messageContainer.innerText = '';
}

window.onload = () => {
    displayWord();
    displayHangman();
    remainingGuessesContainer.innerText = `Remaining Guesses: ${remainingGuesses}`;

    const letterButtons = document.querySelectorAll('.letter-button');
    letterButtons.forEach(button => button.addEventListener('click', handleGuess));

    resetButton.addEventListener('click', resetGame);
};
