var choice;
var startTime;
var endTime;
var elapsedTime;
var keepRunning;
var awakeAlarm;

// message structure:
// {
//   cmd: the command to be run by background
//   choice or startTime or endTime: selected intervention, startTime, and endTime data.
// }

// (request.cmd === "STOP_TIME") 
function clearVars() {
  // resets timer, but leaves selected choice the same per session.
  startTime = undefined;
  endTime = undefined;
}



chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // when background receives message, 
  
  if (request.cmd === "GET_STATE") {
    // sends back the previous session's start time.
    //chrome.storage.sync.get(console.log)
    chrome.storage.sync.get((data) => {
      if (data.endTime === 0) {
        // if timer is running, update choice and startTime
        choice = data.choice
        startTime = data.startTime
        endTime =  0;
      } else {
        // if data is empty, then no timer was running, here as placeholder
      } 
    });
    // then send choice and startTime
    sendResponse({choice, startTime, endTime});

  } else if (request.cmd === "START_TIME") {
    // START_TIME command, records start time and intervention choice
    startTime = request.startTime;
    choice = request.choice;
    endTime = 0;
    chrome.storage.sync.set({choice: request.choice, startTime: request.startTime, endTime: 0})

  } else if (request.cmd === "STOP_TIME") {
    // END_TIME command, calculates elapsed time and clears variables
    elapsedTime = startTime - request.endTime;
    chrome.storage.sync.set({choice, startTime, endTime: request.endTime})
    clearVars();

  } else {
    console.log('god dammit');
  }
});