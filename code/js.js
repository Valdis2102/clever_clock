window.onload = function clock(){
    setInterval(function calc_clock(){
        let date = new Date();
        let hourse = date.getHours();
        let minutes = date.getMinutes();
        let second = date.getSeconds();
        if(hourse<10){hourse = "0" + hourse};
        if(minutes<10){minutes = "0" + minutes};
        if(second<10){second = "0" + second};
        let clock = hourse + " : " + minutes + " : " + second;
        $('#clock').html(clock);
    });
};

$('#timer_input').keyup($('#set_timer')[0].onclick);
$('#timer_input2').keyup($('#set_timer2')[0].onclick);

function setTimer(inp, vis){     
    vis.html(inp);
};

let timer_sound = new Audio();
let alarm_sound = new Audio();
timer_sound.src = 'mp3/timer.mp3';
alarm_sound.src = 'mp3/alarm.mp3';

function startTimer(a , b , c, d){
    let time = a;
    let dataTime = time.split(":");
    let dataNum = dataTime.map(item => Number(item));
    let HH = dataNum[0];
    let MM = dataNum[1];
    let SS = dataNum[2];
    let milisec = ((HH*60+MM)*60+SS)*1000;
    console.log(milisec);
    d.attr('disabled', true);    
    setInterval(function(){
        if(!isStop){
            if(!isPause){
                if(milisec >= 0){
                    milisec = milisec-1000;
                    console.log(milisec);
                    HH = Math.floor((milisec/1000/60/60)%24);
                    MM = Math.floor((milisec/1000/60)%60);
                    SS = (milisec/1000)%60;
                    if(HH<10){HH = "0" + HH};
                    if(MM<10){MM = "0" + MM};
                    if(SS<10){SS = "0" + SS};
                    let result = HH +':'+ MM +':'+ SS;
                    if (milisec < 0){
                        result = '00:00:00'
                        timer_sound.play();
                        d.attr('disabled', false);
                    };
                    b.html(result);
                    if(c.is(':checked') && milisec < 0){
                        timer_sound.play();
                        alert('Repeat Timer?');
                        b.html(a);
                        startTimer(a, b, c, d);
                    };
                };
            };
        }else{
            isPause = true;
            b.html(a);
            d.attr('disabled', false);
            timer_stop();
        }; 
    },1000);
};

let isPause = false;
let isStop = false;
function paused(){
    if(isPause == false){
        isPause = true;
        console.log(isPause);
    }else {
        isPause = false;
        console.log(isPause);
    };
};
function timer_stop(){
    if(isStop == false){
        isStop = true;
        console.log(isStop);
    }else {
        isStop = false;
        console.log(isStop);
    };      
};
$('#timer_pause').on('click', paused);
$('#timer_stop').on('click', timer_stop);

$('#remove_timer').attr('disabled', true);
function add_timer(){
    $('.second-timer').css('display','flex');
    $('#add_timer').attr('disabled', true);
    $('#remove_timer').attr('disabled', false);
};
function remove_timer(){
    $('.second-timer').css('display','none');
    $('#add_timer').attr('disabled', false);
    $('#remove_timer').attr('disabled', true);
}