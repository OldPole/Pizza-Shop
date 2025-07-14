class Shopping {

    handleClear() {
        ROOT_SHOPPING.innerHTML = '';
    }

    updateCount(id, size, base, newCount) {
        if (newCount <= 0) {
            localStorageUtil.removeProduct(id, size, base);
            this.render();
        } else {
            localStorageUtil.updateCount(id, size, base, newCount)
            this.render();
        }
    }

    render() {
        const products = localStorageUtil.getProducts();
        let htmlShopping = '';
        let totalPrice = 0;

        products.forEach(({id, size, base, count}) => {
            const product = CATALOG.find(element => element.id === id);
            const priceIndex = 
                size === '25 см' ? 0 :
                size === '30 см' ? 1 : 2;
            totalPrice += product.prices[priceIndex] * count;
            htmlShopping += `
                <div class="shopping-item">
                    <div class="shopping-item__content">
                        <img class="shopping-item__img" src=${product.img}></img>
                        <div class="shopping-item__info">
                            <h3>${product.name}</h3>
                            <span>${size + ', ' + base + ' тесто'}</span>
                        </div>
                        <div class="shopping-item__btn-close"></div>
                    </div>
                    <div class="shopping-item__price">
                        <span class=""></span>
                        <div class="shopping-item__controls">
                            <button onclick="shoppingPage.updateCount('${id}', '${size}', '${base}', ${count + 1})">+</button>
                            <span>${count}</span>
                            <button onclick="shoppingPage.updateCount('${id}', '${size}', '${base}', ${count - 1})">-</button>
                        </div>
                    </div>
                </div>
            `;
        });

        const html = `
            <div class="shopping-overlay" onclick="shoppingPage.handleClear();">
                <div class="shopping-container">
                    <h1 class="shopping-title">${localStorageUtil.getCount() + ' товаров на ' + totalPrice + ' BYN'}</h1>
                    ${htmlShopping || 'Корзина пуста'}
                    <div class="shopping-totals">
                        <div class="shopping__total-price">
                            Сумма заказа
                            <span>${totalPrice}</span>
                        </div>
                        <button class="shopping__order-btn">К оформлению заказа</button>
                    </div>
                </div>
            </div>
        `;

        ROOT_SHOPPING.innerHTML = html;
    }
}

const shoppingPage = new Shopping();
shoppingPage.render();