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

    const deadline = new Date();

    deadline.setDate(deadline.getDate() + 1);

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
          openModalButtons = document.querySelectorAll("[data-modal]");

    const modalTimerId = setTimeout(() => {
            openModalWindow(modalWindow);
          }, 5000);

    function openModalWindow() {
        modalWindow.classList.add("show");
        modalWindow.classList.remove("hide");
        document.body.style.overflow = "hidden";
        clearInterval(modalTimerId);
    }
    
    function closeModalWindow() {
        modalWindow.classList.add("hide");
        modalWindow.classList.remove("show");
        document.body.style.overflow = "";
    }

    openModalButtons.forEach((element) => {
        element.addEventListener("click", () => {
            openModalWindow();
        });
    });

    modalWindow.addEventListener("click", (event) => {
        if (event.target === modalWindow ||
            event.target.hasAttribute("data-close")) {
            closeModalWindow();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.code === "Escape" && modalWindow.classList.contains("show")) {
            closeModalWindow();
        }
    });

    function showModalByScroll() {
        if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModalWindow();
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

    const getCards = async (url) => {
        const result = await fetch(url);

        if(!result.ok) {
            throw new Error(`Could not fetch ${url} status: ${result.status}`);
        }
        return await result.json();
    }

    getCards("http://localhost:3000/menu")
    .then(cards => {
        cards.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
        });
    });

    //Forms

    const forms = document.querySelectorAll("form");

    const formStatusMessages = {
        loading: "img/form/spinner.svg",
        success: "Thank you, see you later",
        failure: "Something went wrong"
    };

    forms.forEach(form => {
        formingData(form);
    });

    const postData = async (url, data) => {
        const fetchOptions = {
            method: "POST",
            body: data,
            headers: {
                "Content-type": "application/json"
            }, 
        };
        const result = await fetch(url, fetchOptions);

        return await result.json();
    }

    function formingData(form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            let statusMessage = document.createElement("img");
            statusMessage.src = formStatusMessages.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement("afterend", statusMessage);

            const formData = new FormData(form);
            const jsonFormData = JSON.stringify(Object.fromEntries(formData
                .entries()));
            
            postData("http://localhost:3000/requests", jsonFormData)
            .then((data) => {
                showThanksModal(formStatusMessages.success);
            })
            .catch(() => {
                showThanksModal(formStatusMessages.failure)
            })
            .finally(() => {
                form.reset();
                statusMessage.remove();
            });
        });
    }

    function showThanksModal(message) {
        const contactModal = document.querySelector(".modal__dialog");

        contactModal.classList.add("hide");
        openModalWindow();

        const thanksModalWindow = document.createElement("div");
        thanksModalWindow.classList.add("modal__dialog");
        thanksModalWindow.innerHTML = `
            <div class = "modal__content">
                <div class = "modal__close" data-close>&times;</div>
                <div class = "modal__title">${message}</div>
            </div>
        `;

        document.querySelector(".modal").append(thanksModalWindow);

        setTimeout( () => {
            thanksModalWindow.remove();
            contactModal.classList.add("show");
            contactModal.classList.remove("hide");
            closeModalWindow();
        }, 4000);
    }

    fetch("http://localhost:3000/menu")
        .then(data => data.json())
        .then(result => console.log(result));

    //Slider

    const slides = document.querySelectorAll(".offer__slide");
    const prevSlideArrow = document.querySelector(".offer__slider-prev");
    const nextSlideArrow = document.querySelector(".offer__slider-next");
    const totalSlidesNumber = document.querySelector("#total");
    const currentSlideNumber = document.querySelector("#current");
    let shownSlideIndex = 1;

    // function showSlide(currentSlide) {
    //     if (currentSlide > slides.length) {
    //         currentSlide = 1;
    //     }

    //     if (currentSlide < 1) {
    //         currentSlide = slides.length;
    //     }

    //     slides.forEach(slide => slide.classList.add("hide"));
    //     slides[currentSlide - 1].classList.remove("hide");
    //     showCurrentSlideCounter(currentSlide);

    // }

    // function showTotalSlidesCounter(totalSlides) {
    //     if (totalSlides < 10) {
    //         totalSlides = addZeroToSlidesNum(totalSlides);
    //     }
    //     totalSlidesNumber.textContent = totalSlides;
    // }

    // function showCurrentSlideCounter(currentSlide) {
    //     if (currentSlide < 10) {
    //         currentSlide = addZeroToSlidesNum(currentSlide);
    //     }
    //     currentSlideNumber.textContent = currentSlide;
    // }

    // function addZeroToSlidesNum(slideNumber) {
    //     return slideNumber = `0${slideNumber}`;
    // }

    // function showNextSlide(slideChangeNum) {
    //     showSlide(shownSlideIndex += slideChangeNum);
    // }

    // nextSlideArrow.addEventListener("click", () => {
    //     showNextSlide(1);
    // });

    // prevSlideArrow.addEventListener("click", () => {
    //     showNextSlide(-1);
    // });

    // showSlide(shownSlideIndex);
    // showTotalSlidesCounter(slides.length);





    


    
});