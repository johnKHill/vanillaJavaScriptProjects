// -------------------------------
// Caching objects from DOM
// -------------------------------
const msgEl = document.getElementById("msg");

const randNum = getRandomNumber();
console.log("Number:", randNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start Recognition and game
recognition.start();

// -------------------------------
// Methods
// -------------------------------
// Capture user speak
function onSpeak(e) {
  const msg = e.results[0][0].transcript;
  // console.log(msg)
  // Writes out whats spoken into the mic
  writeMessage(msg);
  // Check for a valid number that matches
  checkNumber(msg);
}

// Write what user speaks
function writeMessage(msg) {
  msgEl.innerHTML = `
    <div>You said:</div>
    <span class="box">${msg}</span>
  `;
}

// Check message against number
function checkNumber(msg) {
  const num = +msg;
  // Check for a valid number
  if (Number.isNaN(num)) {
    msgEl.innerHTML += "<div>That is not a valid number</div>";
    return;
  }
  // Check in range
  if (num > 100 || num < 1) {
    msgEl.innerHTML += "<div>Number must be betweem 1 and 100</div>";
    return;
  }
  // Check number
  if (num === randNum) {
    document.body.innerHTML = `
      <h2>Congrats! You have guessed the number! <br/><br/>
      It was ${num}</h2>
      <button class="play-again" id="play-again">Play Again</button>
    `;
  } else if (num > randNum) {
    msgEl.innerHTML += "<div>GO LOWER</div>";
  } else {
    msgEl.innerHTML += "<div>GO HIGHER</div>";
  }
}

// Generate random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}
// -------------------------------
//  Event Listeners
// -------------------------------
//Speak result
recognition.addEventListener("result", onSpeak);

// End SpeechRecognition service
recognition.addEventListener("end", () => recognition.start());

// Button that was dynamically created with JavaScript
document.body.addEventListener("click", (e) => {
  if (e.target.id === "play-again") {
    window.location.reload();
  }
});
