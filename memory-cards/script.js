// Caching objects from DOM
// -------------------------------------
const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");
const addContainer = document.getElementById("add-container");

// Keep track of current card
let currentActiveCard = 0;

// Store the DOM cards
const cardsEl = [];

// Store card data to localStorage
const cardsData = getCardsData();

// Store hard coded card data
// const cardsData = [
//   {
//     question: "What must a variable begin with?",
//     answer: "A letter, $ or _",
//   },
//   {
//     question: "What is a variable?",
//     answer: "Container for a piece of data",
//   },
//   {
//     question: "Example of case sensitive variable",
//     answer: "thisIsAVariable",
//   },
// ];

//                               Methods
// -------------------------------------
// Create all cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

// Create a single card to insert into the DOM
function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");

  // if the first card index
  if (index === 0) {
    card.classList.add("active");
  }

  // fill in the HTML
  card.innerHTML = `
    <div class="inner-card">
      <div class="inner-card-front">
        <p>
          ${data.question}
        </p>
      </div>
      <div class="inner-card-back">
        <p>
          ${data.answer}
        </p>
      </div>
    </div>
  `;

  card.addEventListener("click", () => card.classList.toggle("show-answer"));

  // Add to the DOM cards
  cardsEl.push(card);

  // Appending the card
  cardsContainer.appendChild(card);

  // Show number of cards
  updateCurrentText();
}

// Show number of cards
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

// Get cards from local storage
function getCardsData() {
  // turn cards back to an array when retrieving strings from local storage
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}

// Add card to local storage
function setCardsData(cards) {
  // turn cards array back to a string when setto local storage
  localStorage.setItem("cards", JSON.stringify(cards));

  // Reload the page after storing to local storage
  window.location.reload();
}

createCards();

// Event Listeners
// -------------------------------------
// Next button
nextBtn.addEventListener("click", () => {
  //  hides the card to the left set from css
  cardsEl[currentActiveCard].className = "card left";
  // moving forward 1
  currentActiveCard = currentActiveCard + 1;

  if (currentActiveCard > cardsEl.length - 1) {
    //set current card to the last index
    currentActiveCard = cardsEl.length - 1;
  }
  // Set next card to active
  cardsEl[currentActiveCard].className = "card active";

  updateCurrentText();
});

// Previous button
prevBtn.addEventListener("click", () => {
  //  hides the card to the left set from css
  cardsEl[currentActiveCard].className = "card right";
  // moving backward 1
  currentActiveCard = currentActiveCard - 1;

  if (currentActiveCard < 0) {
    // set the current card back to the 0 index
    currentActiveCard = 0;
  }
  // Set next card to active
  cardsEl[currentActiveCard].className = "card active";

  updateCurrentText();
});

// Show add container
showBtn.addEventListener("click", () => addContainer.classList.add("show"));

// Hide add container
hideBtn.addEventListener("click", () => addContainer.classList.remove("show"));

// Add new caed
addCardBtn.addEventListener("click", () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    // Set the card with question and answer
    // The key/value pairs have same name in the object
    // so shorten the syntax object property/value assignment
    const newCard = { question, answer };

    createCards(newCard);

    // Clear inputs Q and A to empty
    questionEl.value = "";
    answerEl.value = "";

    // Hide the container first
    addContainer.classList.remove("show");

    // Add the new card to the cards data array
    cardsData.push(newCard);

    // Store it in local storage
    setCardsData(cardsData);
  }
});

// Clear cards button
clearBtn.addEventListener("click", () => {
  // Clear everything in local storage first
  localStorage.clear();
  // take the cards out of the DOM
  cardsContainer.innerHTML = "";
  // Reload the page after clearinglocal storage
  window.location.reload();
});
