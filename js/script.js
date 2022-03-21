window.addEventListener('DOMContentLoaded', function () {
    'use strict';
    var tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (var i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    hideTabContent(1);


    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }
    info.addEventListener('click', function (e) {
        var target = e.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (var i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });


    var deadLine = '2022-04-01';

    function getTimeRemaining(endTime){
        var t = Date.parse(endTime) - Date.parse(new Date());
        if(t > 0){
        var seconds = Math.floor((t/1000)%60);
        var minutes = Math.floor((t/1000/60)%60);
        var hours = Math.floor((t/(1000*60*60)));
        return{
            'total' : t,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
        }else {
            return{
                'total' : 0,
                'hours' : 0,
                'minutes' : 0,
                'seconds' : 0
            };
        }
    }

    function setCloack(id, endtime){
        var timer = document.querySelector('.timer');
        var hourse = timer.querySelector('.hours');
        var minutes = timer.querySelector('.minutes');
        var seconds = timer.querySelector('.seconds');
        var timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            var t = getTimeRemaining(endtime);
            if (t.hours <= 9){
            hourse.textContent = "0" + t.hours  ;
            } else{
                hourse.textContent = t.hours;
            }
            if (t.minutes <= 9 ){
                minutes.textContent = "0" + t.minutes;
            }else {
                minutes.textContent = t.minutes;
            }
            if (t.seconds <= 9){
            seconds.textContent = "0" + t.seconds;
            } else{
                seconds.textContent = t.seconds;
            }

            if( t.total <= 0){
                clearInterval(timeInterval);
            }
        }
    }

    setCloack('timer', deadLine);
});