//              Caching objects from DOM
// -------------------------------------
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

polulateUI();

let ticketPrice = +movieSelect.value; //plus(+) turns string into a number like JSON.parse


//                               Methods
// -------------------------------------
// Save selected movie ad price to localStorage with key/value pairs
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}


// Update count and total
function updateSelectedCountAndTotal() {
  // put selected seats into a NodeList
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  // Copy(spread operator) selected element(NodeList) seats into an array
  // Map through that array - map returns the array
  // return a new array of indexes
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  //Store seatsIndex in localStorage as a string
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  // Get length of elements NodeList
  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localStorage and populate UI
function polulateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  //check for selected seats
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) { // if nothing there, -1
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  // if it's in localeStorage
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex; // the movie in localStorage
  }
}


//                       Event Listeners
// -------------------------------------
// Movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value; //plus(+) turns string into a number like JSON.parse
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCountAndTotal();
});

// Seat click event
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("seat") &&
  !e.target.classList.contains("occupied")){
    e.target.classList.toggle("selected");
    updateSelectedCountAndTotal();
  }
});

// Initial count and total set
updateSelectedCountAndTotal();
