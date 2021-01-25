let nowPlaying = document.querySelector("#nowPlaying"); 
let albumImage = document.querySelector("#albumImage"); 
let songName = document.querySelector("#songName"); 
let artistName = document.querySelector("#artistName"); 
  
let playBtn = document.querySelector("#play"); 
let skipNextBtn = document.querySelector("#skip-next"); 
let skipPreviousBtn = document.querySelector("#skip-previous"); 
  
let songSlider = document.querySelector("#songSlide"); 
let currentTime = document.querySelector(".currentTime"); 
let totalDuration = document.querySelector(".totalDuration"); 
  
// Specify globally used values 
let trackIndex = 0; 
let isPlaying = false; 
let updateTimer; 
  
// Create the audio element for the player 
let currentTrack = document.createElement('audio'); 
  
// Define the list of tracks that have to be played 
let trackList = [ 
  { 
    name: "Bad Intentions", 
    artist: "Le Gang", 
    image: "images/bad-intentions.png", 
    path: "audio/bad-intentions.mp3",
  }, 
  { 
    name: "Come Along", 
    artist: "Jay Someday", 
    image: "images/come-along.png", 
    path: "audio/come-along.mp3"
  }, 
  { 
    name: "Echoes", 
    artist: "LiQWYD", 
    image: "images/echoes.png", 
    path: "audio/echoes.mp3", 
  }, 
  { 
    name: "Voice", 
    artist: "KV", 
    image: "images/voice.jpg", 
    path: "audio/voice.mp3", 
  }, 
  { 
    name: "Coast", 
    artist: "Your Friend, Ghost", 
    image: "images/coast.png", 
    path: "audio/coast.mp3", 
  }, 
]; 

function loadTrack(trackIndex) { 
  // Clear the previous seek timer 
  clearInterval(updateTimer); 
  resetValues(); 
  
  // Load a new track 
  currentTrack.src = trackList[trackIndex].path; 
  currentTrack.play(); 
  
  // Update details of the track 
  albumImage.style.backgroundImage = "url(" + trackList[trackIndex].image + ")";
  songName.textContent = trackList[trackIndex].name; 
  artistName.textContent = trackList[trackIndex].artist; 
  nowPlaying.textContent =   "PLAYING " + (trackIndex + 1) + " OF " + trackList.length; 
  
  // Set an interval of 1000 milliseconds 
  // for updating the seek slider 
  updateTimer = setInterval(seekUpdate, 1000); 
  
  // Move to the next track if the current finishes playing 
  // using the 'ended' event 
  currentTrack.addEventListener("ended", nextTrack); 
  
  //Apply a random background color 
  random_bg_color(); 
} 
  

  
// Functiom to reset all values to their default 
function resetValues() { 
  currentTime.textContent = " : "; 
  totalDuration.textContent = "00:00 "; 
  songSlider.value = 0; 
} 


function playpauseTrack() { 
  // Switch between playing and pausing 
  // depending on the current state 
  if (!isPlaying) playTrack(); 
  else pauseTrack(); 
} 
  
function playTrack() { 
  // Play the loaded track 
  currentTrack.play(); 
  isPlaying = true; 
  
  // Replace icon with the pause icon 
  playBtn.innerHTML = '<i class="small material-icons">pause</i>'; 
} 
  
function pauseTrack() { 
  // Pause the loaded track 
  currentTrack.pause(); 
  isPlaying = false; 
  
  // Replace icon with the play icon 
  playBtn.innerHTML = '<i class="small material-icons">play_arrow</i>';
} 
  
function nextTrack() { 
  // Go back to the first track if the 
  // current one is the last in the track list 
  if (trackIndex < trackList.length - 1) 
    trackIndex += 1; 
  else trackIndex = 0; 
  
  // Load and play the new track 
  loadTrack(trackIndex); 
  playTrack(); 
} 
  
function prevTrack() { 
  // Go back to the last track if the 
  // current one is the first in the track list 
  if (trackIndex > 0) 
    trackIndex -= 1; 
  else trackIndex = trackList.length; 
    
  // Load and play the new track 
  loadTrack(trackIndex); 
  playTrack(); 
} 


function seekTo() { 
  // Calculate the seek position by the 
  // percentage of the seek slider  
  // and get the relative duration to the track 
  seekto = currentTrack.duration * (songSlider.value / 100); 
  
  // Set the current track position to the calculated seek position 
  currentTrack.currentTime = seekto; 
} 
  
// function setVolume() { 
//   // Set the volume according to the 
//   // percentage of the volume slider set 
//   currentTrack.volume = volume_slider.value / 100; 
// } 
  
function seekUpdate() { 
  let seekPosition = 0; 
  
  // Check if the current track duration is a legible number 
  if (!isNaN(currentTrack.duration)) { 
    seekPosition = currentTrack.currentTime * (100 / currentTrack.duration); 
    songSlider.value = seekPosition; 
  
    // Calculate the time left and the total duration 
    let currentMinutes = Math.floor(currentTrack.currentTime / 60); 
    let currentSeconds = Math.floor(currentTrack.currentTime - currentMinutes * 60); 
    let durationMinutes = Math.floor(currentTrack.duration / 60); 
    let durationSeconds = Math.floor(currentTrack.duration - durationMinutes * 60); 
  
    // Add a zero to the single digit time values 
    if (currentSeconds < 10) { currentSeconds = " " + currentSeconds; } 
    if (durationSeconds < 10) { durationSeconds = " " + durationSeconds; } 
    if (currentMinutes < 10) { currentMinutes = " " + currentMinutes; } 
    if (durationMinutes < 10) { durationMinutes = " " + durationMinutes; } 
  
    // Display the updated duration 
    currentTime.textContent = currentMinutes + " : " + currentSeconds; 
    totalDuration.textContent = durationMinutes + " : " + durationSeconds; 
  } 

}

function random_bg_color() { 
  // Get a random number between 64 to 256 
  // (for getting lighter colors) 
  let red = Math.floor(Math.random() * 256) + 64; 
  let green = Math.floor(Math.random() * 256) + 64; 
  let blue = Math.floor(Math.random() * 256) + 64; 
  
  // Construct a color withe the given values 
  let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")"; 
  
  // Set the background to the new color 
  document.getElementById('consoleSection').style.background = bgColor; 
} 



document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {});
});

