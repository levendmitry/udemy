window.addEventListener("DOMContentLoaded", () => {

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
        const timeDifference = Date.parse(endTime) - Date.parse(new Date()),
              days = Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
              hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24),
              minutes = Math.floor((timeDifference / 1000 / 60) % 60),
              seconds = Math.floor((timeDifference / 1000) % 60);

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





});