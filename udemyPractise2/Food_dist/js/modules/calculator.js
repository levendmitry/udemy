function calculator() {
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
}

export default calculator;