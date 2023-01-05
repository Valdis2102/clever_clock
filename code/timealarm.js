let alarm_sound = new Audio();
alarm_sound.src = 'mp3/alarm.mp3';

function transformDate() {
    let date = $('#date_input').val();
    let dateDate = date.split("-");
    let dateNum = dateDate.map(item => Number(item));
    console.log('Trans Date');
    return dateNum;
};

function transformTime() {
    let time = $('#time_input').val();
    let dateTime = time.split(":");
    let timeNum = dateTime.map(item => Number(item));
    console.log('Trans Time');
    return timeNum;
};

function user_set() {
    let time = transformTime();
    let date = transformDate();
    date[1] = date[1] - 1;
    let set_time = new Date(date[0], date[1], date[2], time[0], time[1]);
    console.log('user_set');
    return set_time;
};

function start_alarm() {
    let user = user_set();
    console.log(user);
    let start = setInterval(function () {
        if ($('#onoff').is(':checked')) {
            let now = new Date();
            let left = user - now;
            console.log(left);
            if (left <= 0) {
                $('#onoff').prop('checked', false);
                $('#lable_onoff').html('OFF');
                clearInterval(start);
                alarm_sound.play();
                console.log('start 1');
                resetBlock();
            }
            if (left <= 0 && $('#repeate').is(':checked')) {
                resetDay();
                clearInterval(start);
                console.log('start 3');
                $('#onoff').prop('checked', true);
            };
        };
    }, 1000)
};

function resetDay() {
    let now = new Date();
    let day = 1 + now.getDate();
    if (day < 10) {
        day = '0' + day;
    };
    let month = 1 + now.getMonth();
    console.log(month);
    if (month < 10) {
        month = '0' + month;
    };
    let year = now.getFullYear();
    let reset = year + '-' + month + '-' + day;
    console.log('reset Date');
    $('#date_input').val(reset);
    $('#lable_onoff').html('ON');
    block();
    start_alarm();
    return reset;
};