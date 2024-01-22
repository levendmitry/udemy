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

    const getResource = async (url) => {
        const result = await fetch(url);

        if(!result.ok) {
            throw new Error(`Could not fetch ${url}, status: ${result.status}`);
        }
        return await result.json();
    }

    getResource("http://localhost:3000/menu")
    .then(cards => {
        cards.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, ".menu .container")
            .render();
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

    //Slider

    const slides = document.querySelectorAll(".offer__slide"),
          slider = document.querySelector(".offer__slider"),
          prevSlideArrow = document.querySelector(".offer__slider-prev"),
          nextSlideArrow = document.querySelector(".offer__slider-next"),
          totalSlidesCounter = document.querySelector("#total"),
          currentSlideCounter = document.querySelector("#current"),
          slidesWrapper = document.querySelector(".offer__slider-wrapper"),
          slidesField = document.querySelector(".offer__slider-inner"),
          widthSlidesWrapper = window.getComputedStyle(slidesWrapper).width,
          carouselDots = document.createElement("ol");
    let currentSlideNumber = 1;
    let slideOffset = 0;

    slidesField.style.width = 100 * slides.length + "%";
    slides.forEach(slide => slide.style.with = widthSlidesWrapper);
    slidesField.style.display = "flex";
    slidesField.style.transition = "0.5s all";
    slidesWrapper.style.overflow = "hidden";
    slider.style.position = "relative";
    carouselDots.classList.add("carousel-dots");
    slider.append(carouselDots);

    const dots = [];

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("li");
        dot.setAttribute("data-slide-to", i + 1);
        dot.classList.add("dot");
        carouselDots.append(dot);
        dots.push(dot);
    }

    function showDots(currentDotNumber) {
        dots.forEach(dot => dot.style.opacity = "0.5");
        dots[currentDotNumber - 1].style.opacity = "1";
    }
    
    function addZeroToSlideNumber(slide) {
        return slide = `0${slide}`;
    }

    function showCurrentSlideCounter(currentSlideNumber) {
        if (currentSlideNumber < 10) {
            currentSlideNumber = addZeroToSlideNumber(currentSlideNumber);
        }
        currentSlideCounter.textContent = currentSlideNumber;
    }

    function showTotalSlidesCounter(totalSlidesNumber) {
        if (totalSlidesNumber < 10) {
            totalSlidesNumber = addZeroToSlideNumber(totalSlidesNumber);
        }
        totalSlidesCounter.textContent = totalSlidesNumber;
    }

    showCurrentSlideCounter(currentSlideNumber);
    showTotalSlidesCounter(slides.length);
    dots[currentSlideNumber - 1].style.opacity = "1";

    function removeNotDigits(string) {
        return +string.replace(/\D/g, "");
    }

    nextSlideArrow.addEventListener("click", () => {
        if (slideOffset == removeNotDigits(widthSlidesWrapper) * (slides.length - 1)) {
            slideOffset = 0;
        } else slideOffset += removeNotDigits(widthSlidesWrapper);

        slidesField.style.transform = `translateX(-${slideOffset}px)`;
        
        if (currentSlideNumber == slides.length ) {
            currentSlideNumber = 1;
        } else {
            currentSlideNumber++;
        }

        showCurrentSlideCounter(currentSlideNumber);
        showDots(currentSlideNumber);
    });

    prevSlideArrow.addEventListener("click", () => {

        if (slideOffset == 0) {
            slideOffset = removeNotDigits(widthSlidesWrapper) * (slides.length - 1);
        } else slideOffset -= removeNotDigits(widthSlidesWrapper);

        slidesField.style.transform = `translateX(-${slideOffset}px)`;

        if (currentSlideNumber == 1 ) {
            currentSlideNumber = slides.length;
        } else {
            currentSlideNumber--;
        }

        showCurrentSlideCounter(currentSlideNumber);
        showDots(currentSlideNumber);
    });

    dots.forEach(dot => {
        dot.addEventListener("click", (event) => {
            const slideTo = event.target.getAttribute("data-slide-to");
            currentSlideNumber = slideTo;

            slideOffset = removeNotDigits(widthSlidesWrapper) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${slideOffset}px)`;
            showDots(currentSlideNumber);
            showCurrentSlideCounter(currentSlideNumber);

        });
    });

    //Calculator

    const resultCaloriesElem = document.querySelector(".calculating__result span");
    let sex = localStorage.getItem("sex") || "female",
        height,
        weight,
        age,
        activityRatio = localStorage.getItem("activityRatio") || "1.375";
    
    function initialLocalSettings(selector, activeClass) {
        const formElements = document.querySelectorAll(selector);
        localStorage.setItem("sex", sex);
        localStorage.setItem("activityRatio", activityRatio);

        formElements.forEach(element => {
            element.classList.remove(activeClass);
            if (element.getAttribute("id") === localStorage.getItem("sex")) {
                element.classList.add(activeClass);
            }
            if (element.getAttribute("data-ratio") === localStorage.getItem("activityRatio")) {
                element.classList.add(activeClass);
            }  
        });
    }
    
    initialLocalSettings("#gender div", "calculating__choose-item_active");
    initialLocalSettings(".calculating__choose_big div", "calculating__choose-item_active");

    function calcResultCalories() {
        let resultCalories;

        if (!sex || !height || !weight || !age || !activityRatio) {
            resultCaloriesElem.textContent = "____";
            return;
        }

        if (sex === "female") {
            resultCalories = (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * activityRatio;
        } else {
            resultCalories = (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * activityRatio;
        }

        resultCaloriesElem.textContent = Math.round(resultCalories);

    }

    function getStaticFieldsData(parentSelector, activeClass) {
        const formElements = document.querySelectorAll(`${parentSelector} div`);

        formElements.forEach(element => {
            element.addEventListener("click", (event) => {
                if (event.target.hasAttribute("data-ratio")) {
                    activityRatio = +event.target.getAttribute("data-ratio");
                    localStorage.setItem("activityRatio", +event.target.getAttribute("data-ratio"));
                } else {
                    sex = event.target.getAttribute("id");
                    localStorage.setItem("sex", event.target.getAttribute("id"));
                }

                formElements.forEach(elem => elem.classList.remove(activeClass));
                event.target.classList.add(activeClass);
                
                calcResultCalories();

            }); 
        });
    }

    getStaticFieldsData("#gender", "calculating__choose-item_active");
    getStaticFieldsData(".calculating__choose_big", "calculating__choose-item_active");

    function getDynamicFieldData(fieldSelector) {
        const input = document.querySelector(fieldSelector);

        input.addEventListener("input", () => {
            if (input.value.match(/\D/g)) {
                input.style.border = "1px solid red";
            } else {
                input.style.border = "none";
            }

            switch (input.getAttribute("id"))  {
                case "height":
                    height = + input.value;
                    break;
                case "weight":
                    weight = + input.value;
                    break;
                case "age":
                    age = + input.value;
                    break;
            }
            calcResultCalories();
        });
    }

    getDynamicFieldData("#height");
    getDynamicFieldData("#weight");
    getDynamicFieldData("#age");

});

