var off = "#000000"
var on = "#ffffff"
var timerButton = document.getElementById("timerButton");
var root = document.documentElement;
var choiceText = document.getElementById("choiceText");
var timerText = document.getElementById("timerText");
var timerTimeContainer = document.getElementById("timerTimeContainer");
var choiceContainer = document.querySelector(".choice-container")

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

// event handler that all button-clicks pass their event to
// then uses buttonMap to map clicks to their function
var buttonClick = choiceContainer && choiceContainer.addEventListener("click", (event) => {
  var target = event.target;
  var handler;
  if (target.nodeName === "BUTTON" && (handler = target.getAttribute('data-handler'))) {
    buttonMap[handler](event)
  }
})

// Start/Stop button listener, changes color.
timerButton.addEventListener("click", toggleTimer)

function toggleTimer() {
  if (timerText.innerHTML === "START") {
    timerText.innerHTML = "STOP";
    timerTimeContainer.style.display = '';
    choiceContainer.style.display = 'none';
    stopTimer();
  } else {
    timerText.innerHTML = "START";
    startTimer();
    timerTimeContainer.style.display = 'none';
    choiceContainer.style.display = 'grid';
  }
}

function startTimer() {
  root.style.setProperty('--on', on);
  root.style.setProperty('--off', off);
}

function stopTimer() {
  root.style.setProperty('--on', off);
  root.style.setProperty('--off', on);
}

function resumeTimer() {
  root.style.setProperty('--on', off);
  root.style.setProperty('--off', on);
}


function colorFadeChange(start, end) {
  
}