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
var choice = 'b_I';

/**************************************************************************************************/

//Maps buttons to their functions, will move this to backend as to add customization 
// and make message passing simpler
var buttonMap = {
  b_A: function() {
    choiceText.innerHTML = "RUNNING";
  },
  b_B: function() {
    choiceText.innerHTML = "NATURE";
  },
  b_C: function() {
    choiceText.innerHTML = "SLEEPING";
  },
  b_D: function() {
    choiceText.innerHTML = "MUSIC";
  },
  b_E: function() {
    choiceText.innerHTML = "SUPPLEMENTS";
  },
  b_F: function() {
    choiceText.innerHTML = "COFFEE";
  },
  b_G: function() {
    choiceText.innerHTML = "MEDITATION";
  },
  b_H: function() {
    choiceText.innerHTML = "YOGA";
  },
  b_I: function() {
    choiceText.innerHTML = "NOTHING";
  },
  b_J: function() {
    // default choice, does nothing
  }
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
  chrome.runtime.sendMessage({cmd: "START_TIME", startTime, choice})
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    setTime(elapsedTime);
  }, 100);
}

function stopTimer() {
  endTime = Date.now();
  chrome.runtime.sendMessage({cmd: "STOP_TIME", endTime})
  timerInterval = clearTimeout(timerInterval);
}

function resumeTimer(time) {
  startTime = time;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    setTime(elapsedTime);
  }, 100);
  showStart();
}

/**************************************************************************************************/

function showStart() {
  timerText.innerHTML = "STOP"; //
  timerTimeContainer.style.display = '';
  choiceContainer.style.display = 'none';
  root.style.setProperty('--on', "#000000");
  root.style.setProperty('--off', "#ffffff");
  buttonMap[choice]()
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
  if (target.nodeName === "BUTTON" && (choice = target.getAttribute('data-handler'))) {
    buttonMap[choice]()
  }
})

chrome.runtime.sendMessage({cmd: "GET_STATE"}, response => {
  // if the current end time is unfilled, resume timer.
  // if (!response.time.end) {
  //   resumeTimer(response.time.start)
  // }
  buttonMap[response.choice]();
  choice = response.choice;
  if (response.start !== undefined) {
    resumeTimer(response.start);
  }
})

