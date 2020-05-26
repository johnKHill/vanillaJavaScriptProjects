//              Caching objects from DOM
// -------------------------------------
const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const popup = document.getElementById("popup-container");
const finalMessage = document.getElementById("final-message");
const playAgainBtn = document.getElementById("play-button");
const notification = document.getElementById("notification-container");

// The parts of the hangman figure
const figureParts = document.querySelectorAll(".figure-part");

// Define the words used
const words = ["application", "programming", "interface", "wizard"];

// Random word from the words array - can use an API/DB later
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//                               Methods
// -------------------------------------
// Show the hidden word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `
        <span class="letter">
          ${correctLetters.includes(letter) ? letter : ""}
        </span>
      `
      )
      .join("")}
  `;

  const innerWord = wordEl.innerText.replace(/\n/g, "");
  // check for the win/match
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won! 😃";
    popup.style.display = "flex";
  }
}

// Update the wrong letters
function upDateWrongLettersEl() {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  // Display figure parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost. 😕";
    popup.style.display = "flex";
  }
}

// Show notification
function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

//                       Event Listeners
// -------------------------------------
// Keydown letter press on the window object
window.addEventListener("keydown", (e) => {
  // console.log(e.keyCode); (A/65 - Z/90)
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        upDateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

// Restart game and play again
playAgainBtn.addEventListener("click", () => {
  // Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  upDateWrongLettersEl();

  popup.style.display = "none";
});

displayWord();
