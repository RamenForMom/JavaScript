window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    let calc = require('./parts/calc.js'),
        forms = require('./parts/forms.js'),
        modal = require('./parts/modal.js'),
        slider = require('./parts/slider.js'),
        tabs = require('./parts/tabs.js'),
        timer = require('./parts/timer.js');

    calc();
    forms();
    modal();
    slider();
    tabs();
    timer();
});