// Caching objects from DOM
// -------------------------------------
const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const CORS = `https://cors-anywhere.herokuapp.com/`;
const apiURL = "https://api.lyrics.ovh";

//                               Methods
// -------------------------------------
// Search by song or artist
async function searchSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();

  showData(data);
}

// Show song and artist in DOM
function showData(data) {
  // console.log(data);
  result.innerHTML = `
    <ul class="songs">
      ${data.data
        .map(
          (song) => `
        <li>
          <span><stong>${song.artist.name}</stong> - ${song.title}</span>
          <button class="btn" data-artist="${song.artist.name}"
            data-songtitle="${song.title}">Get Lyrics</button>
        </li>
      `
        )
        .join("")}
    </ul>
  `;

  // Pagination
  if (data.prev || data.next) {
    more.innerHTML = `
      ${
        data.prev
          ? `<button class="btn" onClick="getMoreSongs('${data.prev}')">Prev</button>`
          : ""
      }
      ${
        data.next
          ? `<button class="btn" onClick="getMoreSongs('${data.next}')">Next</button>`
          : ""
      }
    `;
  } else {
    more.innerHTML = "";
  }
}

// Get prev and next song
async function getMoreSongs(url) {
  const res = await fetch(`${CORS}${url}`);
  const data = await res.json();

  showData(data);
}

// Get lyrics for song
async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();

  // format UI by using the API's carriage returns and new line
  // returns. Use the br line-break to format lyrics to next line
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

  // insert into DOM
  result.innerHTML = `
    <h2><strong>${artist}</strong> - ${songTitle}</h2>
    <span>${lyrics}</span>
  `;

  // clear the more container to make
  // room for the lyrics
  more.innerHTML = "";
}

// Event Listeners
// -------------------------------------
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert("Please type in a search term");
  } else {
    searchSongs(searchTerm);
  }
});

// Get lyrics button click
result.addEventListener("click", (e) => {
  const clickedEl = e.target;

  if (clickedEl.tagName === "BUTTON") {
    const artist = clickedEl.getAttribute("data-artist");
    const songTitle = clickedEl.getAttribute("data-songtitle");

    getLyrics(artist, songTitle);
  }
});