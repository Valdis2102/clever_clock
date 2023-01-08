let task_sound = new Audio();
task_sound.src = 'mp3/task.mp3';
let break_sound = new Audio();
break_sound.src = 'mp3/break.mp3'

$('#clas_tim').click(showPomoTipe);
$('#pomo_type').click(showClassicType);

function showPomoTipe(){
    $('#clas_tim').addClass('hid');
    $('#classical_timer').addClass('hid');
    $('#pomo_type').removeClass('hid');
    $('#pomo_timer').removeClass('hid');
}

function showClassicType(){
    $('#clas_tim').removeClass('hid');
    $('#classical_timer').removeClass('hid');
    $('#pomo_type').addClass('hid');
    $('#pomo_timer').addClass('hid');
};

let pomo_start = $('#pomo_start');
let pomo_stop = $('#pomo_stop');
let pomo_pause = $('#pomo_pause');
let pomo_run = $('#pomo_run');
let task_inp = $('#task_input');
let task_vis = $('#task_time');
let break_inp = $('#break_input');
let break_vis = $('#break_time');
let current_task_milis = ms($('#task_time')[0].innerText);
let current_break_time = ms($('#break_time')[0].innerText);
let auto_pomo = $('#auto_pomo');



task_inp.keyup(setPomo);
break_inp.keyup(setPomo);

function setPomo() {
    task_vis.html(task_inp.val());
    break_vis.html(break_inp.val());
};

function startPomo(start, stop, pause) {
    start.addClass('hid');
    stop.removeClass('hid');
    pause.attr('disabled', false);
    task_inp.attr('readonly', true);
    break_inp.attr('readonly',true);
    intervalStart = setInterval(funcTasckRun, 1000);
};

function funcTasckRun () {
    current_task_milis = ms($('#task_time')[0].innerText);
    current_break_time = ms($('#break_time')[0].innerText);
    console.log($('#break_time')[0].innerText);

    if(pomo_run.hasClass('hid')){
        if(current_task_milis > 0){
            countdown(current_task_milis, task_vis, task_sound);
        };
        if(current_task_milis == 0 && current_break_time > 0){
            countdown(current_break_time, break_vis, break_sound);
        };
        if(current_task_milis <= 0 && current_break_time <= 0){
            if(auto_pomo.is(':checked')){
                stopPomo();
                console.log('autorepeate ON');
                startPomo(pomo_start, pomo_stop, pomo_pause, task_inp, break_inp);
            }else{
            stopPomo();
            console.log('autorepeate OFF');
            };
        };
    };
};

function countdown(milisec, vis, sound){
        milisec -= 1000;
        HH = Math.floor((milisec / 1000 / 60 / 60) % 24);
        MM = Math.floor((milisec / 1000 / 60) % 60);
        SS = (milisec / 1000) % 60;
        if (HH < 10) { HH = "0" + HH };
        if (MM < 10) { MM = "0" + MM };
        if (SS < 10) { SS = "0" + SS };
        let result = HH + ':' + MM + ':' + SS;
        vis.html(result);
        console.log(milisec);
        if (milisec == 0){
            sound.play();
        };
        };

function stopPomo() {
    pomo_stop.addClass('hid');
    pomo_start.removeClass('hid');
    pomo_run.addClass('hid');
    pomo_pause.removeClass('hid').attr('disabled', true);
    console.log('POMO-stoped');
    clearInterval(intervalStart);
    task_inp.attr('readonly', false);
    break_inp.attr('readonly', false);
    setPomo(); 
};

function pausePomo() {
    pomo_pause.addClass('hid');
    pomo_run.removeClass('hid');
    console.log('pause on');
    clearInterval(intervalStart);
};

function runPomo() {
    pomo_run.addClass('hid');
    pomo_pause.removeClass('hid');
    clearInterval(intervalStart);
    intervalStart = setInterval(funcTasckRun, 1000);
};


