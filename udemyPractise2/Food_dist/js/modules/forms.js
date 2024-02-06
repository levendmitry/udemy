import { closeModalWindow, openModalWindow } from "./modalWindow";
import { postData } from "../services/services";

function forms(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);

    const formStatusMessages = {
        loading: "img/form/spinner.svg",
        success: "Thank you, see you later",
        failure: "Something went wrong"
    };

    forms.forEach(form => {
        formingData(form);
    });


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
        openModalWindow(".modal", modalTimerId);

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
            closeModalWindow(".modal");
        }, 4000);
    }
}

export default forms;