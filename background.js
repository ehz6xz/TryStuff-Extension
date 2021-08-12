var choice;
var start;
var end;
var elapsedTime;

// message structure:
// {
//   cmd: the command to be run by background
//   choice or startTime or endTime: selected intervention, startTime, and endTime data.
// }



chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // when background receives message, 
  
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
  // resets timer
  start = undefined;
  end = undefined;
}


