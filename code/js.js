//ЧАСЫ РЕАЛЬНОГО ВРЕМЕНИ
window.onload = function clock() {
    setInterval(function calc_clock() {
        let date = new Date();
        let hourse = date.getHours();
        let minutes = date.getMinutes();
        let second = date.getSeconds();
        if (hourse < 10) { hourse = "0" + hourse };
        if (minutes < 10) { minutes = "0" + minutes };
        if (second < 10) { second = "0" + second };
        let clock = hourse + " : " + minutes + " : " + second;
        $('#clock').html(clock);
    });
};

//Настройка таймера
// определение звуковых эффектов
let timer_sound = new Audio();
let alarm_sound = new Audio();
timer_sound.src = 'mp3/timer.mp3';
alarm_sound.src = 'mp3/alarm.mp3';

//установка значений таймера и вычисление милисекунд
$('#timer_input').keyup($('#set_timer')[0].onclick);
$('#timer_input2').keyup($('#set_timer2')[0].onclick);

function setTimer(inp, vis) {
    vis.html(inp);
    let milisec = ms(inp);
    return milisec;
};

//расчёт милисекунд из input
function ms(input) {
    let time = input;
    let dataTime = time.split(":");
    let dataNum = dataTime.map(item => Number(item));
    let HH = dataNum[0];
    let MM = dataNum[1];
    let SS = dataNum[2];
    let milisec = ((HH * 60 + MM) * 60 + SS) * 1000;
    return milisec
};

//Запуск таймера
function startTimer(inp, vis, start_button) {
    isStop = false;
    start_button.attr('disabled', true);
    let milis = setTimer(inp,vis);    
    transform(milis, vis,);
};

//Счётчик таймера
function transform (milisec, vis){
    setInterval (function(){
        if(milisec>0 && !isStop){
            if(!isPause){
                milisec = milisec - 1000;
                console.log(milisec);
                HH = Math.floor((milisec / 1000 / 60 / 60) % 24);
                MM = Math.floor((milisec / 1000 / 60) % 60);
                SS = (milisec / 1000) % 60;
                if (HH < 10) { HH = "0" + HH };
                if (MM < 10) { MM = "0" + MM };
                if (SS < 10) { SS = "0" + SS };
                let result = HH + ':' + MM + ':' + SS;
                vis.html(result);
            };
        };
    },1000);
    return
};

function autores(){
    console.log('autorestart');
};

//функции для кнопок ПАУЗА и СТОП.
$('#timer_pause').on('click', paused);
let isPause = false;
let isStop = false;
function paused() {
    if (isPause == false) {
        isPause = true;
        console.log('pause on');
    } else {
        isPause = false;
        console.log('pause off');
    };
};
function timerStop(start, inp, vis) {
        isStop = true;
        console.log('timer-stoped');
        start.attr('disabled', false);
        setTimer(inp, vis);
};

// добавление/скрытие нового таймера
$('#remove_timer').attr('disabled', true);
function add_timer() {
    $('.second-timer').css('display', 'flex');
    $('#add_timer').attr('disabled', true);
    $('#remove_timer').attr('disabled', false);
};
function remove_timer() {
    $('.second-timer').css('display', 'none');
    $('#add_timer').attr('disabled', false);
    $('#remove_timer').attr('disabled', true);
};