import { getResource } from "../services/services";

function cards() {
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

    getResource("http://localhost:3000/menu")
    .then(cards => {
        cards.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, ".menu .container")
            .render();
        });
    });
}

export default cards;