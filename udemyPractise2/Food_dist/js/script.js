import calculator from "./modules/calculator";
import cards from "./modules/cards";
import forms from "./modules/forms";
import modalWindow from "./modules/modalWindow";
import slider from "./modules/slider";
import tabs from "./modules/tabs";
import timer from "./modules/timer";
import { openModalWindow } from "./modules/modalWindow";

window.addEventListener("DOMContentLoaded", () => {

    const modalTimerId = setTimeout(() => {
        openModalWindow(".modal", modalTimerId);
      }, 5000);
    
    calculator();
    cards();
    forms("form", modalTimerId);
    modalWindow("[data-modal]", ".modal", modalTimerId);
    slider({ 
        slideSelector: ".offer__slide",
        slidesContainerSelector: ".offer__slider",
        prevSwitchSelector: ".offer__slider-prev",
        nextSwitchSelector: ".offer__slider-next",
        totalSlidesCounterSelector: "#total",
        currentSlideCounterSelector: "#current",
        sliderWrapperSelector: ".offer__slider-wrapper",
        slidesFieldSelector: ".offer__slider-inner"
    });
    tabs(".tabheader__item", ".tabcontent", ".tabheader__items");
    timer(".timer", "2024-06-11");
});


    

