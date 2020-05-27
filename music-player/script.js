// Caching objects from DOM
// -------------------------------------
const musicContainer = document.getElementById("music-container");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");

const title = document.getElementById("title");
const cover = document.getElementById("cover");

// Song titles
const songs = [
  "Hussle & Motivate",
  "summer",
  "Blue Laces 2",
  "ukulele",
  "Double Up",
  "hey",
];

// Keep track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

//                               Methods
// -------------------------------------
// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--; // decrease the song by 1

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// Next song
function nextSong() {
  songIndex++; // increase the song by 1

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;

  const progressPercent = (currentTime / duration) * 100;

  // Set to width of the progress element
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  // Length of progress bar
  const width = this.clientWidth;
  // this is where I clicked
  const clickX = e.offsetX;
  // Get the duration of the song
  const duration = audio.duration;
  // set where the click happened during the duration
  audio.currentTime = (clickX / width) * duration;
}

// Event Listeners
// -------------------------------------
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Time/song update
audio.addEventListener("timeupdate", updateProgress);

// lick on progress bar
progressContainer.addEventListener("click", setProgress);

// Song ends
audio.addEventListener("ended", nextSong);
