window.addEventListener("DOMContentLoaded", () => {

    const body = document.querySelector("body");

    //Tabs

    const tabs = document.querySelectorAll(".tabheader__item"),
          tabsContent = document.querySelectorAll(".tabcontent"),
          tabsParent = document.querySelector(".tabheader__items");

    function hideTabContent() {
        tabsContent.forEach(content => {
            content.classList.add("hide");
            content.classList.remove("show", "fade");
        });

        tabs.forEach(tabItem => {
            tabItem.classList.remove("tabheader__item_active");
        });
    }

    function showTabContent(tabIndex = 0) {
        tabsContent[tabIndex].classList.add("show", "fade");
        tabsContent[tabIndex].classList.remove("hide");
        tabs[tabIndex].classList.add("tabheader__item_active");
    }

    hideTabContent();
    showTabContent(0);

    tabsParent.addEventListener("click", (event) => {
        const target = event.target;

        if (target || target.classList.contains("tabheader__item")) {
            tabs.forEach((tab, tabIndex) => {
                if (target == tab) {
                    hideTabContent();
                    showTabContent(tabIndex);
                }
            }
            );
        }
    });

    //Timer

    const deadline = '2023-10-4';

    function getTimeRemaining(endTime) {
        let days,
            hours,
            minutes,
            seconds;

        const timeDifference = Date.parse(endTime) - Date.parse(new Date());

        if (timeDifference <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
            hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((timeDifference / 1000 / 60) % 60),
            seconds = Math.floor((timeDifference / 1000) % 60);
        }   

        return {
            "total": timeDifference,
            days,
            hours,
            minutes,
            seconds,
        };
    }

    function setZero(num) {
       return num >= 0 && num < 10 ? `0${num}` : num;
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector("#days"),
              hours = timer.querySelector("#hours"),
              minutes = timer.querySelector("#minutes"),
              seconds = timer.querySelector("#seconds"),
              timeInterval = setInterval(updateClock, 1000);
        
        updateClock();

        function updateClock() {
            const timeLeft = getTimeRemaining(endTime);

            days.innerHTML = setZero(timeLeft.days);
            hours.innerHTML = setZero(timeLeft.hours);
            minutes.innerHTML = setZero(timeLeft.minutes);
            seconds.innerHTML = setZero(timeLeft.seconds);

            if (timeLeft.total <= 0) {
                clearInterval(timeInterval);
            } 
        }
    }

    setClock(".timer", deadline);


    //Modal window

    const modalWindow = document.querySelector(".modal"),
          openModalButtons = document.querySelectorAll("[data-modal]"),
          closeModalButtons = document.querySelectorAll("[data-close]");

    const modalTimerId = setTimeout(() => {
            openModalWindow(modalWindow);
          }, 5000);

    function openModalWindow(modalElement) {
        modalElement.classList.toggle("show");
        document.body.style.overflow = "hidden";
        clearInterval(modalTimerId);
    }
    
    function closeModalWindow(modalElement = modalWindow) {
        modalElement.classList.toggle("show");
        document.body.style.overflow = "";
    }

    openModalButtons.forEach((element) => {
        element.addEventListener("click", () => {
            openModalWindow(modalWindow);
        });
    });

    modalWindow.addEventListener("click", (event) => {
        if (event.target === modalWindow) {
            closeModalWindow(modalWindow);
        }
    });

    closeModalButtons.forEach((element) => {
        element.addEventListener("click", () => {
            closeModalWindow(modalWindow);
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.code === "Escape" && modalWindow.classList.contains("show")) {
            closeModalWindow(modalWindow);
        }
    });

    function showModalByScroll() {
        if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModalWindow(modalWindow);
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("scroll", showModalByScroll);

    // Samples for cards

    class MenuCard {
        constructor(imgSrc, imgAlt, title, description, price, parentSelector) {
            this.imgSrc = imgSrc;
            this.imgAlt = imgAlt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.exchangeRate = 100;
            this.currencyConversion();
        }
        currencyConversion() {
            this.price *= this.exchangeRate;
        }

        render() {
            const card = document.createElement("div");
            card.innerHTML = `
                <div class="menu__item">
                    <img src=${this.imgSrc} alt=${this.imgAlt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.description}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> рублей/день</div>
                    </div>
                </div>
            `;
            this.parent.append(card);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        14,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        21,
        ".menu .container"
    ).render();

    //Forms

    const forms = document.querySelectorAll("form");
    const message = {
        loading: "Loading",
        success: "Thank you, see you later",
        failure: "Something went wrong"
    };

    forms.forEach(form => {
        postData(form);
    });

    function postData(form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            let statusMessage = document.createElement("div");
            statusMessage.classList.add("status");
            statusMessage.textContent = message.loading;
            form.append(statusMessage);

            const request = new XMLHttpRequest();
            request.open("POST", "server.php");
            request.setRequestHeader("Content-type", "application-json");

            const formData = new FormData(form);
            const objectData = {};

            formData.forEach((dataValue, dataKey) => {
                objectData[dataKey] = dataValue;
            });

            const jsonData = JSON.stringify(objectData);


            request.send(jsonData);

            request.addEventListener("load", () => {
                if (request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent = message.success;
                    form.reset();
                    setTimeout(() => statusMessage.remove(), 2000);
                } else {
                    statusMessage.textContent = message.failure;
                }
            });


        });
    }






    



   






});