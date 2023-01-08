window.onbeforeunload = function () {
    let pomo_task_inp = $('#task_input').val();
    let pomo_break_inp = $('#break_input').val();
    let date = $('#date_input').val();
    let time = $('#time_input').val();
    if ($('#repeate').is(':checked')) {
        $('#repeate').val('1');
        repeat = $('#repeate').val();
    } else {
        $('#repeate').val('0');
        repeat = $('#repeate').val();
    };
    if ($('#onoff').is(':checked')) {
        $('#onoff').val('1');
        on = $('#onoff').val();
    } else {
        $('#onoff').val('0');
        on = $('#onoff').val();
    }
    let alarm = {
        date: date,
        time: time,
        rep: repeat,
        onoff: on,
        task: pomo_task_inp,
        break: pomo_break_inp,
    };
    localStorage.setItem('left', JSON.stringify(alarm));
};

function getLocalData() {
    let setting = localStorage.getItem('left');
    setting = JSON.parse(setting);
    return setting;
};

function loade() {
    let saved = getLocalData();
    pomoTimerLoad(saved.task, saved.break);
    setPomo();
    let cur_d = current_date();
    let cur_t = current_time();
    if (saved.date > cur_d) {
        changeAlarmParameter(saved);
        console.log('first step');
    } else if (saved.date == cur_d) {
        if (saved.time > cur_t) {
            changeAlarmParameter(saved);
            console.log('second step');
        };
    };
    if (saved.rep == '1') {
        $('#repeate').prop('checked', true);
        repeate();
        if (saved.time > cur_t) {
            $('#time_input').val(saved.time);
            if (saved.onoff == '1') {
                $('#onoff').prop('checked', true);
                onoff();
            };
        };
        if (saved.time < cur_t) {
            let nextDay = resetDay();
            $('#date_input').val(nextDay);
            $('#time_input').val(saved.time);
            if (saved.onoff == '1') {
                $('#onoff').prop('checked', true);
                onoff();
            };
        };
    };
};

function changeAlarmParameter(saved) {
    $('#date_input').val(saved.date);
    $('#time_input').val(saved.time);
    if (saved.onoff == '1') {
        $('#onoff').prop('checked', true);
        onoff();
    };
    if (saved.rep == '1') {
        $('#repeate').prop('checked', true);
        repeate();
    };
};

function pomoTimerLoad(task, breake){
    if($('#task_input').val(task) == 0){
        let default_task_time = $('#task_input')[0].defaultValue;
        $('#task_input').val(default_task_time);
    }else{
        $('#task_input').val(task);
    };
    if($('#break_input').val(breake) == 0){
        let default_break_time = $('#break_input')[0].defaultValue;
        $('#break_input').val(default_break_time);
    }else{
        $('#break_input').val(breake);
    };
}