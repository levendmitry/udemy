function slider( { slideSelector, slidesContainerSelector, prevSwitchSelector, nextSwitchSelector,
     totalSlidesCounterSelector, currentSlideCounterSelector, sliderWrapperSelector, slidesFieldSelector } ) {
    
    const slides = document.querySelectorAll(slideSelector),
          slider = document.querySelector(slidesContainerSelector),
          prevSlideArrow = document.querySelector(prevSwitchSelector),
          nextSlideArrow = document.querySelector(nextSwitchSelector),
          totalSlidesCounter = document.querySelector(totalSlidesCounterSelector),
          currentSlideCounter = document.querySelector(currentSlideCounterSelector),
          slidesWrapper = document.querySelector(sliderWrapperSelector),
          slidesField = document.querySelector(slidesFieldSelector),
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

    function removePx(string) {
        return +string.slice(0, -2);
    }

    nextSlideArrow.addEventListener("click", () => {
        if (slideOffset == removePx(widthSlidesWrapper) * (slides.length - 1)) {
            slideOffset = 0;
        } else slideOffset += removePx(widthSlidesWrapper);

        console.log(removePx(widthSlidesWrapper), slideOffset);

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
            slideOffset = removePx(widthSlidesWrapper) * (slides.length - 1);
        } else slideOffset -= removePx(widthSlidesWrapper);

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

            slideOffset = removePx(widthSlidesWrapper) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${slideOffset}px)`;
            showDots(currentSlideNumber);
            showCurrentSlideCounter(currentSlideNumber);

        });
    });
}
export default slider;