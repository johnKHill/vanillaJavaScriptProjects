// Caching objects from DOM
// -------------------------------------
const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");

//  Method
// ------------

//  Event Listeners
// ------------
// Rules and close button event handlers
rulesBtn.addEventListener("click", () => rules.classList.add("show"));
closeBtn.addEventListener("click", () => rules.classList.remove("show"));
