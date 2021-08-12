var choice;
var start;
var end;
var elapsedTime;
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.cmd === "GET_STATE") {
    sendResponse({choice, start});
  } else if (request.cmd === "START_TIME") {
    start = request.startTime;
    choice = request.choice;
  } else {
    elapsedTime = start - request.endTime;
    clearVars();
  }
});
// (request.cmd === "STOP_TIME") 
function clearVars() {
  start = undefined;
  end = undefined;
}


