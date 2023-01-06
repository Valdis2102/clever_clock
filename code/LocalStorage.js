window.onbeforeunload = function () {
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
    console.log(saved);
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

