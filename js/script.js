window.addEventListener('DOMContentLoaded',function() {
    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    
    function hideTabContent(a) {
        for (let i = a; i< tabContent.length; i++){
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

    info.addEventListener('click', function(event){
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0 ; i < tab.length; i++){
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

//TIMER

let deadline = '2024-04-14';

function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()),
    seconds = Math.floor((t/1000)%60),
    minutes = Math.floor((t/1000/60)%60),
    hours = Math.floor((t/(1000*60*60)));

    return {
        'total': t,
        'hours': hours,
        'minutes':minutes,
        'seconds' : seconds

    };
}

    function setClock(id,endtime ) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds =  timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock,1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);

            function addZero(num) {
                if (num<=9){
                    return '0' + num;
                } else return num ;
            };

            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;

            if (t.total <=0){
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }

        }



    }
    setClock('timer',deadline);

    //Modal
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');
    
    more.addEventListener('click',function() {
        overlay.style.display = 'block'; // overlay стає блоком 
        this.classList.add('more-splash'); // додаємо стилі з цсс файлу з класу more-splash
        document.body.style.overflow='hidden'; //сторінка не рухається, поки не клікнуто на хрестик
    });

    close.addEventListener('click',function(){
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow=''; 

    })
    
/*-------------------------*/
//Form

// Об'єкт для зберігання повідомлень, які будуть відображені під час відправки форми
let message ={
    loading :'Loading',// Повідомлення під час завантаження
    success: 'Thanks! We will contact you asap!', // Повідомлення після успішної відправки форми
    failure: 'something went wrong' // Повідомлення після невдалої відправки форми
};

// Отримуємо форму та всі поля вводу
    let form = document.querySelector('.main-form'),
        input= form.getElementsByTagName('input'),

// Створюємо div-елемент для відображення повідомлень під час відправки форми
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status');

// Додаємо обробник події "submit" до форми
    form.addEventListener('submit',function(event){
        event.preventDefault(); // Відключаємо стандартну поведінку браузера для форми (автоматичне перезавантаження сторінки після відправки форми)

// Додаємо div-елемент для відображення повідомлення про завантаження
    form.appendChild(statusMessage);

    let request = new XMLHttpRequest(); // Створення нового об'єкту XMLHttpRequest для взаємодії з сервером
request.open('Post','server.php'); // Встановлення методу та URL для запиту на сервер
request.setRequestHeader('content-type','application/x-www-form-urlencoded'); // Встановлення заголовка content-type для передачі даних форми

let formData = new FormData(form); // Створення об'єкту FormData, який містить дані з форми
request.send(formData); // Відправлення запиту на сервер з даними форми

request.addEventListener('readystatechange', function() {
    // Встановлення обробника події для відстеження зміни стану запиту

    if (request.readyState < 4) {
        // Якщо стан запиту менше 4 (який відповідає частково завершеному стану), відображаємо повідомлення про завантаження
        statusMessage.innerHTML = message.loading;
    } else if(request.readyState === 4 && request.status == 200) {
        // Якщо стан запиту 4 (завершений) і код статусу 200 (успішний відповідь сервера), відображаємо повідомлення про успішне виконання
        statusMessage.innerHTML = message.success;
    } else {
        // В інших випадках, коли стан запиту 4 і код статусу не дорівнює 200, відображаємо повідомлення про невдачу
        statusMessage.innerHTML = message.failure;
    }
});




//



for (let i = 0; i < input.length; i++) {
    input[i].value = '';
}

     
    });
});

