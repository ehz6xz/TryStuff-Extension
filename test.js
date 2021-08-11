function secondsToTime(seconds){
    var hours = Math.floor(seconds/(60*60));
    var minutes = Math.floor((seconds - hours*60*60)/60);
    var seconds = seconds % 60;
    return hours + ":" + minutes + ":" + seconds;
}

function timeToSeconds(time){
    return 60*60*time.getHours() + 60*time.getMinutes() + time.getSeconds();
}


function subtractTime(t1,t2){
    var t1_seconds = 60*60*t1.getHours() + 60*t1.getMinutes() + t1.getSeconds();
    var t2_seconds = 60*60*t2.getHours() + 60*t2.getMinutes() + t2.getSeconds();
    var subtract = t2_seconds - t1_seconds;
    return subtract;
}

