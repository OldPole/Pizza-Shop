class Products {

    render() {
        let htmlProducts = '';

        CATALOG.forEach(({id, name, img, info, price}) => {
            htmlProducts += `
                <li class="products-element">
                    <img class="products-element__img" src=${img}></img>
                    <span class="products-element__name">${name}</span>
                    <span class="products-element__info">${info}</span>
                    <div class="products-element__content">
                        <span class="products-element__price">От ${price} BYN</span>
                        <button class="products-element__btn">Добавить</button>
                    </div>
                </li>
            `;
        })

        const html = `
            <ul class="products-container">
                ${htmlProducts}
            </ul>
        `;

        ROOT_PRODUCTS.innerHTML = html;
    }
}

const productsPage = new Products();
productsPage.render();