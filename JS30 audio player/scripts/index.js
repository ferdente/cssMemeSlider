const audioPlayer = document.querySelector(".audio-player");
const audio = new Audio();
const songs = [
  './audio/beyonce.mp3',
  './audio/dontstartnow.mp3'
];
const songsIMG = ['./img/lemonade.png', './img/dontstartnow.png'];
const songName = ['Beyonce - Don\'t Hurt Yourself', 'Dua Lipa - Don\'t Start Now'];

let currentSongIndex = 0;
audio.src = songs[currentSongIndex];

//Играть
function playSong() {
  audio.src = songs[currentSongIndex];
  document.querySelector(".name").textContent = songName[currentSongIndex]
  document.querySelector('.img_track').children[0].src = songsIMG[currentSongIndex]
  audio.play()
}

// след песня
const nextSongButton = document.querySelector('#next-song-button');

function nextSong() {
  currentSongIndex++;
  if (currentSongIndex >= songs.length) {
    currentSongIndex = 0;
  }
  if (Boolean(document.querySelector('.toggle-play.play')) == 1){
    toogPP()
    document.querySelector('.toggle-play.pause').children[0].src = './svg/pause.png'
  }
  playSong();
}

nextSongButton.addEventListener('click', nextSong);

//пред песня
const prevSongButton = document.querySelector('#prev-song-button');

function prevSong() {
  currentSongIndex--;
  if (currentSongIndex == -1) {
    currentSongIndex = songs.length - 1;
  }
  if (Boolean(document.querySelector('.toggle-play.play')) == 1){
    toogPP()
    document.querySelector('.toggle-play.pause').children[0].src = './svg/pause.png'
  }
  playSong();
}

prevSongButton.addEventListener('click', prevSong);

// переключатель воспроизведения
const playBtn = audioPlayer.querySelector(".controls .toggle-play");


function toogPP(){
  playBtn.classList.toggle("play");
  playBtn.classList.toggle("pause");
}

playBtn.addEventListener(
  "click",
  () => {
    if (audio.paused) {
      toogPP()
      document.querySelector('.toggle-play.pause').children[0].src = './svg/pause.png'
      playSong()
    } else {
      toogPP()
      document.querySelector('.toggle-play.play').children[0].src = './svg/play.png'
      audio.pause();
    }
  },
  false
);

setInterval(() => {
  const progressBar = audioPlayer.querySelector(".progress");
  progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
  audioPlayer.querySelector(".time .current").textContent = getTimeCodeFromNum(
    audio.currentTime
  );
}, 500);


// обсчет времени трека
audio.addEventListener(
  "loadeddata",
  () => {
    audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(
      audio.duration
    );
    audio.volume = .75;
  },
  false
);


function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}


// отображение прогресс бара и его обсчет
const timeline = audioPlayer.querySelector(".timeline");
timeline.addEventListener("click", e => {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
  audio.currentTime = timeToSeek;
}, false);


setInterval(() => {
  const progressBar = audioPlayer.querySelector(".progress");
  progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
  audioPlayer.querySelector(".time .current").textContent = getTimeCodeFromNum(
    audio.currentTime
  );
}, 500);

