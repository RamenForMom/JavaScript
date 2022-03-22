function modal() {
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
}

module.exports = modal;