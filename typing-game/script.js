// Caching objects from DOM
// -------------------------------------
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endGameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// List of words for game
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "living",
];

// Initialize word
let randomWord;

//  Initialize the score
let score = 0;

// Initialize the time
let time = 10;

// Set difficulty to the value set in localStorage or set it to medium
let difficult =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// Set difficulty select value/option to the value set in localStorage or set it to medium
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// Focus cursor on text when app starts
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

//                               Methods
// -------------------------------------
// Generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add word to the word DOM element
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// Update the score DOM element
function updateScore() {
  score++; // increase score
  scoreEl.innerHTML = score;
}

// Update the time DOM element
function updateTime() {
  time--; // decrease time
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    // end game
    gameOver();
  }
}

// Game over, show end screen with the end game DOM element
function gameOver() {
  endGameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onClick="window.location.reload()">Reload</button>
  `;

  endGameEl.style.display = "flex";
}

addWordToDOM();

// Event Listeners
// -------------------------------------
// Typing
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // Clear input
    e.target.value = "";

    // Setting the difficulty level by time
    if (difficulty === "hard") {
      time += 1;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

// Settings btn click
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

// Settings select
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  // Setting the settings difficulty to the localStorage
  localStorage.setItem("difficulty", difficulty);
});
