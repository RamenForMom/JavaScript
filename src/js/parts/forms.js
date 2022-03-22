function forms() {
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
        formData.forEach(function (value, key) {
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

        for (let i = 0; i < input.length; i++) {
            input[i].value = "";
        }

    });
}
module.exports = forms;