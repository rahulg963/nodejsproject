/**
 * Created by rahul on 9/8/16.
 */
var minutes = 1000 * 60;
var hours = minutes * 60;
var days = hours * 24;
var week = days * 7;
var years = days * 365;

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

function ConvertTime(t1) {
    var t2 = new Date().getTime();
    time_diff = t2 - t1;
    time_seconds = time_diff/1000;
    time_minutes = time_diff/minutes;
    time_hours = time_diff/hours;
    time_days = time_diff/days;
    time_weeks = time_diff/week;

    // console.log("Minutes passed " + time_minutes)
    // console.log("Hours passed " + time_hours)
    // console.log("Days passed " + time_days)
    // console.log("Weeks passed " + time_weeks)


    if(time_seconds >=0 && time_seconds < 60 ){
        console.log("Just Now");
    }

    else if(time_minutes >= 1 && time_minutes < 2){
        console.log(Math.floor(time_minutes) + " min ago")
    }

    else if(time_minutes >= 2 && time_minutes < 60){
        console.log(Math.floor(time_minutes) + " mins ago")
    }

    else if(time_hours >= 1 && time_hours < 2){
        console.log(Math.floor(time_hours) + " hour ago")
    }
    else if(time_hours >= 2 && time_hours < 24){
        console.log(Math.floor(time_hours) + " hours ago")
    }

    else if(time_days >= 1 && time_days < 2){
        console.log(Math.floor(time_days) + " day ago")
    }
    else if(time_days >= 2 && time_days < 7){
        console.log(Math.floor(time_days) + " days ago")
    }

    else if(time_weeks >= 1 && time_weeks < 2){
        console.log(Math.floor(time_weeks) + " week ago")
    }
    else if(time_weeks >= 2 && time_weeks < 5){
        console.log(Math.floor(time_weeks) + " weeks ago")
    }

    else{
        console.log("Message time was : " + timeConverter(t1));
    }

}

ConvertTime(new Date().getTime());