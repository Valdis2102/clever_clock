let info = new Userinfo();

async function city() {
    let res = await info.ip();
    console.log(res.city);
    $('#city').html(res.city);
};

//ЧАСЫ РЕАЛЬНОГО ВРЕМЕНИ
window.onload = function clock() {
    city();
    setAlarm();
    setInterval(function () {
        current_time();
    }, 500);
    user_set();
    loade();
};

//функция устанавливающая время в HEADER
function current_time() {
    let date = new Date();
    let hourse = date.getHours();
    let minutes = date.getMinutes();
    let second = date.getSeconds();
    if (hourse < 10) { hourse = "0" + hourse };
    if (minutes < 10) { minutes = "0" + minutes };
    if (second < 10) { second = "0" + second };
    let clock = hourse + " : " + minutes + " : " + second;
    $('#clock').html(clock);
    let time = hourse + ":" + minutes;
    return time
};

function current_date() {
    let now = new Date();
    let day = now.getDate();
    if (day < 10) {
        day = '0' + day;
    };
    let month = 1 + now.getMonth();
    console.log(month);
    if (month < 10) {
        month = '0' + month;
    };
    let year = now.getFullYear();
    let set = year + '-' + month + '-' + day;
    console.log('current Date: ' + set);
    return set;
};

//функция устанавливает ДАТУ и ВРЕМЯ в ALARM при загрузке
function setAlarm() {
    let set = current_date();
    $('#date_input').val(set);

    let time = current_time();
    $('#time_input').val(time);
    console.log('SetAlarm');
};

// f() работают с checkbox и меняют доступ к INPUT
$('#onoff').on('click', onoff);
function onoff() {
    if ($('#onoff').is(':checked')) {
        $('#lable_onoff').html('ON');
        console.log('onoff - ON');
        block();
        start_alarm();
    } else {
        $('#lable_onoff').html('OFF')
        console.log('onoff - OFF');
        resetBlock();
    };
};

function block() {
    $('#date_input').attr('readonly', true);
    $('#time_input').attr('readonly', true);
    $('#repeate').attr('disabled', true);
    console.log('BLOKED INPUT');
};

function resetBlock() {
    $('#date_input').attr('readonly', false);
    $('#time_input').attr('readonly', false);
    $('#repeate').attr('disabled', false);
    console.log('resetBlock');
};

$('#repeate').on('click', repeate);
function repeate() {
    if ($('#repeate').is(':checked')) {
        $('#lable_repeate').html('every day');
        console.log('every day');
    } else {
        console.log('once');
    }
};

