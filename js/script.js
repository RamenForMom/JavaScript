window.addEventListener('DOMContentLoaded', function () {
    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
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
        let target = e.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });


    let deadLine = '2022-04-01';

    function getTimeRemaining(endTime) {
        let t = Date.parse(endTime) - Date.parse(new Date());
        if (t > 0) {
            let seconds = Math.floor((t / 1000) % 60),
                minutes = Math.floor((t / 1000 / 60) % 60),
                hours = Math.floor((t / (1000 * 60 * 60)));
            return {
                'total': t,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        } else {
            return {
                'total': 0,
                'hours': 0,
                'minutes': 0,
                'seconds': 0
            };
        }
    }

    function setCloack(id, endtime) {
        let timer = document.querySelector('.timer'),
            hourse = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);
            if (t.hours <= 9) {
                hourse.textContent = "0" + t.hours;
            } else {
                hourse.textContent = t.hours;
            }
            if (t.minutes <= 9) {
                minutes.textContent = "0" + t.minutes;
            } else {
                minutes.textContent = t.minutes;
            }
            if (t.seconds <= 9) {
                seconds.textContent = "0" + t.seconds;
            } else {
                seconds.textContent = t.seconds;
            }

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setCloack('timer', deadLine);



    let wind = document.querySelector(".overlay"),
        moreBtn = document.querySelector(".more"),
        close = document.querySelector('.popup-close');

    moreBtn.addEventListener('click', function () {
        wind.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hiden';
    });

    close.addEventListener('click', function () {
        wind.style.display = 'none';
        moreBtn.classList.remove('more-splash');
    });

    let massege = {
        loading: "Загрузка...",
        success: "Спасибо, скоро мы с вами свяжемся!",
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName("input"),
        statusMassage = document.createElement("div");
    statusMassage.classList.add('status');

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        form.appendChild(statusMassage);

        let requst = new XMLHttpRequest();
        requst.open('POST', 'server.php');
        requst.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        let formData = new FormData(form);

        let obj = {};
        formData.forEach(function(value, key){
            obj[key] = value;
        });
        let json = JSON.stringify(obj);
                requst.send(json);

        requst.addEventListener('readystatechange', function () {
            if (requst.readyState < 4) {
                statusMassage.innerHTML = massege.loading;
            } else if (requst.readyState === 4 && requst.status == 200) {
                statusMassage.innerHTML = massege.success;
            } else {
                statusMassage.innerHTML = massege.failure;
            }
        });

        for (let i = 0; i < input.length; i++){
            input[i].value = "";
        }

    });

    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides(n) {
        if(n > slides.length){
            slideIndex = 1;
        }
        if( n < 1){
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlide(n){
        showSlides(slideIndex += n);
    }

    function currentSlide(n){
        showSlides(slideIndex = n);
    }

    next.addEventListener('click', function(){
        plusSlide(1);
    });

    prev.addEventListener('click', function(){
        showSlides(-1);
    });

    dotsWrap.addEventListener('click', function(e){
        for (let i = 0; i < dots.length + 1; i++){
            if(e.target.classList.contains('dot') && e.target == dots[i-1]){
                currentSlide(i);

            }
        }

    });

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.innerHTML = 0;


    persons.addEventListener('change', function () {
        personSum = +this.value;
        total = (daysSum + personSum) * 4000;

        if (restDays.value == "" || persons.value == "") {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    restDays.addEventListener('change', function () {
    daysSum = +this.value;
    total = (daysSum + personSum) * 4000;

    if (restDays.value == "" || persons.value == '') {
        totalValue.innerHTML = 0;
    } else {
        totalValue.innerHTML = total;
    }
    });

    place.addEventListener('change', function(){
        if (restDays.value == "" || persons.value == ''){
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });

});