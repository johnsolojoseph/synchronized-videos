//Initialize all Materialize JavaScript
M.AutoInit();



var socket = io.connect('http://localhost:5000');

socket.on('state', function(data) {
  if (data === "play") {
    player.playVideo();
  } else if (data == "pause") {
    player.pauseVideo();
  }

});

socket.on('progress', function(data) {
  player.seekTo(data);

});



//Youtube Iframe API

//Loads play async
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player, time_update_interval = 0;;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'pBuZEGYXA6E',
    playerVars: {
            controls: 0,
            disablekb: 1
        },
    events: {
      onReady: initialize
    }
  })
};

function initialize() {
  updateTimerDisplay();
  updateProgressBar();

  // Clear any old interval.
  clearInterval(time_update_interval);

  time_update_interval = setInterval(function() {
    updateTimerDisplay();
    updateProgressBar();
  }, 1000);
};

// This function is called by initialize()
function updateTimerDisplay() {
  // Update current time text display.
  console.log(formatTime(player.getCurrentTime()));
  document.getElementById("current-time").innerHTML = (formatTime(player.getCurrentTime()));
  document.getElementById("duration").innerHTML = (formatTime(player.getDuration()));
}

function formatTime(time) {
  time = Math.round(time);

  var minutes = Math.floor(time / 60),
    seconds = time - minutes * 60;

  seconds = seconds < 10 ? '0' + seconds : seconds;

  return minutes + ":" + seconds;
};

$('#scrub').on('mouseup touchend', function(e) {

  // Calculate the new time for the video.
  // new time in seconds = total duration in seconds * ( value of range input / 100 )
  var newTime = player.getDuration() * (e.target.value / 100);

  // Skip video to new time.
  player.seekTo(newTime);

  socket.emit('progress', newTime);

});

function updateProgressBar() {
  $('#scrub').val((player.getCurrentTime() / player.getDuration()) * 100);
}

function playYTVideo() {
  player.playVideo();
  socket.emit('state', 'play');
  socket.emit('progress', player.getCurrentTime());
  updateTimerDisplay();
  updateProgressBar();
};

function pauseYTVideo() {
  player.pauseVideo();
  socket.emit('state', 'pause');
  socket.emit('progress', player.getCurrentTime());
  updateTimerDisplay();
  updateProgressBar();
};
