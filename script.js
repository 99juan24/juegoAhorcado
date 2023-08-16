const wordList = ["javascript", "html", "css", "developer", "programming"];
let selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
let guessedLetters = [];
let incorrectGuesses = 0;

const wordDisplay = document.getElementById("word");
const hangmanDisplay = document.getElementById("hangman");
const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit");
const wrongGuessesDisplay = document.getElementById("wrong-guesses");

function updateWordDisplay() {
    let displayWord = "";
    for (const letter of selectedWord) {
        if (guessedLetters.includes(letter)) {
            displayWord += letter + " ";
        } else {
            displayWord += "_ ";
        }
    }
    wordDisplay.textContent = displayWord;
}

function updateHangmanDisplay() {
    hangmanDisplay.textContent = "x".repeat(incorrectGuesses);
}

function checkGameOver() {
    if (incorrectGuesses >= 6) {
        wordDisplay.textContent = `¡Perdiste! La palabra era "${selectedWord}".`;
        guessInput.disabled = true;
        submitButton.disabled = true;
    } else if (!wordDisplay.textContent.includes("_")) {
        wordDisplay.textContent = `¡Ganaste! La palabra era "${selectedWord}".`;
        guessInput.disabled = true;
        submitButton.disabled = true;
    }
}

updateWordDisplay();
updateHangmanDisplay();

submitButton.addEventListener("click", () => {
    const guess = guessInput.value.toLowerCase();
    if (guess.length === 1 && /^[a-z]$/.test(guess) && !guessedLetters.includes(guess)) {
        guessedLetters.push(guess);
        if (!selectedWord.includes(guess)) {
            incorrectGuesses++;
            updateHangmanDisplay();
            wrongGuessesDisplay.textContent = `Letras incorrectas: ${guessedLetters.join(", ")}`;
        }
        updateWordDisplay();
        checkGameOver();
    }
    guessInput.value = "";
});
