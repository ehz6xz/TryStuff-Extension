var timerButton = document.getElementById("timerButton");
var root = document.documentElement;
var choiceText = document.getElementById("choiceText");

function A(e) {
  choiceText.innerHTML = "RUNNING";
}

function B(e) {
  choiceText.innerHTML = "NATURE";
}

function C(e) {
  choiceText.innerHTML = "SLEEPING";
}

function D(e) {
  choiceText.innerHTML = "MUSIC";
}

function E(e) {
  choiceText.innerHTML = "VITAMIN D";
}

function F(e) {
  choiceText.innerHTML = "COFFEE";
}

function G(e) {
  choiceText.innerHTML = "MEDITATION";
}

function H(e) {
  choiceText.innerHTML = "YOGA";
}

function I(e) {
  choiceText.innerHTML = "NOTHING";
}

var buttonMap = {
  b_A: function(event) {
    A(event.target)
  },
  b_B: function(event) {
    B(event.target)
  },
  b_C: function(event) {
    C(event.target)
  },
  b_D: function(event) {
    D(event.target)
  },
  b_E: function(event) {
    E(event.target)
  },
  b_F: function(event) {
    F(event.target)
  },
  b_G: function(event) {
    G(event.target)
  },
  b_H: function(event) {
    H(event.target)
  },
  b_I: function(event) {
    I(event.target)
  },
}

var container = document.querySelector(".choice-container")
var buttonClick = container && container.addEventListener("click", (event) => {
  var target = event.target;
  var handler;
  if (target.nodeName === "BUTTON" && (handler = target.getAttribute('data-handler'))) {
    buttonMap[handler](event)
  }
})






timerButton.addEventListener("click", toggleTimer)

function toggleTimer() {
  var x = document.getElementById("timerText");
  var off = "#000000"
  var on = "#ffffff"
  if (x.innerHTML === "START") {
    x.innerHTML = "STOP";
    root.style.setProperty('--on', off);
    root.style.setProperty('--off', on);
  } else {
    x.innerHTML = "START";
    root.style.setProperty('--on', on);
    root.style.setProperty('--off', off);
  }
}

function colorFadeChange(start, end) {
  
}