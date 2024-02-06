function openModalWindow(modalSelector, modalTimerId) {
    const modalWindow = document.querySelector(modalSelector);

    modalWindow.classList.add("show");
    modalWindow.classList.remove("hide");
    document.body.style.overflow = "hidden";

    if(modalTimerId) {
        clearInterval(modalTimerId);
    }
    
}

function closeModalWindow(modalSelector, modalTimerId) {
    const modalWindow = document.querySelector(modalSelector);

    modalWindow.classList.add("hide");
    modalWindow.classList.remove("show");
    document.body.style.overflow = "";
}

function modalWindow(triggerSelector, modalSelector, modalTimerId) {
    const modalWindow = document.querySelector(modalSelector),
          openModalButtons = document.querySelectorAll(triggerSelector);

    openModalButtons.forEach((element) => {
        element.addEventListener("click", () => {
            openModalWindow(modalSelector, modalTimerId);
        });
    });

    modalWindow.addEventListener("click", (event) => {
        if (event.target === modalWindow ||
            event.target.hasAttribute("data-close")) {
            closeModalWindow(modalSelector);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.code === "Escape" && modalWindow.classList.contains("show")) {
            closeModalWindow(modalSelector);
        }
    });

    function showModalByScroll() {
        if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModalWindow(modalSelector, modalTimerId);
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("scroll", showModalByScroll);
}

export default modalWindow;
export {closeModalWindow};
export{openModalWindow};