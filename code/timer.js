//Настройка таймера
// определение звуковых эффектов
let timer_sound = new Audio();
timer_sound.src = 'mp3/timer.mp3';

//установка значений таймера и вычисление милисекунд
$('#timer_input').keyup($('#set_timer')[0].onclick);
$('#timer_input2').keyup($('#set_timer2')[0].onclick);

function setTimer(inp, vis) {
    vis.html(inp);
};

//расчёт милисекунд из input
function ms(input) {
    let time = input;
    console.log(time);
    let dataTime = time.split(":");
    let dataNum = dataTime.map(item => Number(item));
    let HH = dataNum[0];
    let MM = dataNum[1];
    let SS = dataNum[2];
    let milisec = ((HH * 60 + MM) * 60 + SS) * 1000;
    return milisec
};

//Запуск таймера
function startTimer(vis, start_btn, pause_btn, stop_btn) {
    start_btn.addClass('hid');
    stop_btn.removeClass('hid');
    pause_btn.attr('disabled', false);
    let milis = ms(vis[0].outerText);
    transform(milis, vis, pause_btn, start_btn);
};

//Счётчик таймера
function transform(milisec, vis, pause_btn, start_btn) {
    let x = setInterval(function () {
        if (milisec > 0 && start_btn.hasClass('hid')) {
            if (!pause_btn.hasClass('hid')) {
                milisec = milisec - 1000;
                HH = Math.floor((milisec / 1000 / 60 / 60) % 24);
                MM = Math.floor((milisec / 1000 / 60) % 60);
                SS = (milisec / 1000) % 60;
                if (HH < 10) { HH = "0" + HH };
                if (MM < 10) { MM = "0" + MM };
                if (SS < 10) { SS = "0" + SS };
                let result = HH + ':' + MM + ':' + SS;
                vis.html(result);
                return milisec;
            } else {
            };
        };
        if (!start_btn.hasClass('hid')) {
            clearInterval(x);
            milisec = 0;
        };
        if (milisec == 0) {
            timer_sound.play();
            clearInterval(x);
        };
    }, 1000);
};
//функция определяющая текущее значение в отсчёте таймера
let ti = function tim(vis) {
    let time = vis[0].outerText;
    console.log(time);
    return time;
};

//функции для кнопок ПАУЗА и ПРОДОЛЖИТЬ.
function paused(pause_btn, run_btn) {
    pause_btn.addClass('hid');
    run_btn.removeClass('hid');
    console.log('pause on');
};

function run(vis, pause_btn, run_btn, start_btn) {
    run_btn.addClass('hid');
    pause_btn.removeClass('hid');
    let bug = ti(vis);
    let milis = ms(bug);
    console.log('pause off');
    transform(milis, vis, pause_btn, start_btn);
};

//Функция для RESET
function timerStop(start_btn, stop_btn, inp, vis, pause_btn, run_btn) {
    stop_btn.addClass('hid');
    start_btn.removeClass('hid');
    run_btn.addClass('hid');
    pause_btn.removeClass('hid').attr('disabled', true);
    console.log('timer-stoped');
    setTimer(inp, vis);
};

// добавление/скрытие нового таймера
function add_timer() {
    $('.second-timer').css('display', 'flex');
    $('#add_timer').attr('disabled', true);
    $('#remove_timer').attr('disabled', false);
};
function remove_timer(start_btn, stop_btn, inp, vis, pause_btn, run_btn) {
    $('.second-timer').css('display', 'none');
    $('#add_timer').attr('disabled', false);
    $('#remove_timer').attr('disabled', true);
    timerStop(start_btn, stop_btn, inp, vis, pause_btn, run_btn);
};