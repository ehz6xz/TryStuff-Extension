var timerButton = document.getElementById("timerButton");
var root = document.documentElement;
var choiceText = document.getElementById("choiceText");
var timerText = document.getElementById("timerText");
var timerTimeContainer = document.getElementById("timerTimeContainer");
var choiceContainer = document.querySelector(".choice-container")
var timerTime = document.getElementById("timerTime")
var startTime;
var timerInterval;
var elapsedTime = 0;
var endTime;

/**************************************************************************************************/

//Maps buttons to their functions
var buttonMap = {
  b_A: function(e) {
    choiceText.innerHTML = "RUNNING";
  },
  b_B: function(e) {
    choiceText.innerHTML = "NATURE";
  },
  b_C: function(e) {
    choiceText.innerHTML = "SLEEPING";
  },
  b_D: function(e) {
    choiceText.innerHTML = "MUSIC";
  },
  b_E: function(e) {
    choiceText.innerHTML = "SUPPLEMENTS";
  },
  b_F: function(e) {
    choiceText.innerHTML = "COFFEE";
  },
  b_G: function(e) {
    choiceText.innerHTML = "MEDITATION";
  },
  b_H: function(e) {
    choiceText.innerHTML = "YOGA";
  },
  b_I: function(e) {
    choiceText.innerHTML = "NOTHING";
  },
}

/**************************************************************************************************/

function setTime(time) {
  var diffHrs = time / 3_600_000;
  var hrs = Math.floor(diffHrs);

  var diffMin = (diffHrs - hrs) * 60;
  var min = Math.floor(diffMin);
  
  var sec = Math.floor((diffMin - min) * 60);

  var formHrs = hrs.toString().padStart(2, "0");
  var formMin = min.toString().padStart(2, "0");
  var formSec = sec.toString().padStart(2, "0");

  timerTime.innerHTML = `${formHrs} : ${formMin} : ${formSec}`;
}

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    setTime(elapsedTime);
  }, 500);
}

function stopTimer() {
  endTime = Date.now();
  timerInterval = clearTimeout(timerInterval);
}

function resumeTimer() {
  root.style.setProperty('--on', "#000000");
  root.style.setProperty('--off', "#ffffff");
}

/**************************************************************************************************/

function showStart() {
  timerText.innerHTML = "STOP"; //
  timerTimeContainer.style.display = '';
  choiceContainer.style.display = 'none';
  root.style.setProperty('--on', "#000000");
  root.style.setProperty('--off', "#ffffff");
  if (choiceText.innerHTML === "...") {
    choiceText.innerHTML = "NOTHING";
  }
}

function showStop() {
  timerText.innerHTML = "START";
  timerTimeContainer.style.display = 'none';
  choiceContainer.style.display = 'grid';
  root.style.setProperty('--on', "#ffffff");
  root.style.setProperty('--off', "#000000");
}

/**************************************************************************************************************/

// Creates Toggle button that reformats page on button press
function toggleTimer() {
  if (timerText.innerHTML === "START") {
    // If pressed on START button,
    startTimer();
    showStart();
  } else {
    // If pressed on STOP button,
    stopTimer();
    showStop();
  }
}

/**************************************************************************************************************/

// Start/Stop button listener
timerButton.addEventListener("click", toggleTimer)

// event handler that all button-clicks pass their event to
// then uses buttonMap to map clicks to their function
var buttonClick = choiceContainer && choiceContainer.addEventListener("click", (event) => {
  var target = event.target;
  var handler;
  if (target.nodeName === "BUTTON" && (handler = target.getAttribute('data-handler'))) {
    buttonMap[handler](event)
  }
})