var timerButton = document.getElementById("timerButton");
var content = document.getElementById("content");
var timerText = document.getElementById("timerText");
var root = document.documentElement;


function getDate(today){
    var date = today.getMonth()+1 + "/" + today.getDate() + "/" + today.getFullYear();
    return date;
};

function getTime(today){
    var time = today.getHours() + ":" + today.getMinutes();
    return time;
}

function subtractTime(t1,t2){
    var t1_seconds = 60*60*t1.getHours() + 60*t1.getMinutes() + t1.getSeconds();
    var t2_seconds = 60*60*t2.getHours() + 60*t2.getMinutes() + t2.getSeconds();
    var subtract = t2_seconds - t1_seconds;
    return subtract;
}

function secondsToTime(seconds){
    var hours = Math.floor(seconds/(60*60));
    var minutes = Math.floor((seconds - hours*60*60)/60);
    var seconds = seconds % 60;
    return hours + ":" + minutes + ":" + seconds;
}

function timeToSeconds(time){
    return 60*60*time.getHours() + 60*time.getMinutes() + time.getSeconds();
}

var logNumber = 1;
var begin = new Date();
var end = new Date();

timerButton.addEventListener("click", function(){
    if(timerText.innerHTML == "START"){   
        timerText.innerHTML = "STOP";
        begin = new Date();
        }
    else {
        timerText.innerHTML = "START";
        var row = document.getElementById("logTable").insertRow();
        end = new Date();
        
        endDate = getDate(end);
        endTime = getTime(end);

        //Insert entry #
        var cell1 = row.insertCell(0);
        cell1.innerHTML = logNumber;

        //Insert Begin Date
        var cell2 = row.insertCell(1);
        cell2.innerHTML = getDate(begin);

        //Insert start time
        var cell3 = row.insertCell(2);
        cell3.innerHTML = getTime(begin);

        //Insert end time
        var cell4 = row.insertCell(3);
        cell4.innerHTML = getTime(end);

        //Total time elapsed
        var cell5 = row.insertCell(4);
        cell5.innerHTML = secondsToTime(subtractTime(begin,end));
        logNumber += 1;
    }
});

