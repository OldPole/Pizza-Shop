class Shopping {

    handleClear () {
        ROOT_SHOPPING.innerHTML = '';
    }

    updateCount (id, size, base, newCount) {
        if (newCount === 0) {
            localStorageUtil.removeProduct(id, size, base);
            this.render();
            headerPage.render(localStorageUtil.getCount());
        } else {
            localStorageUtil.updateCount(id, size, base, newCount)
            this.render();
            headerPage.render(localStorageUtil.getCount());
        }
    }

    removeShoppingItem (id, size, base) {
            localStorageUtil.removeProduct(id, size, base);
            this.render();
            headerPage.render(localStorageUtil.getCount());
    }

    render () {
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
                        <div class="shopping-item__wrapper">
                            <img class="shopping-item__img" src=${product.img}></img>
                            <div class="shopping-item__info">
                                <h3 class="shopping-item__name">${product.name}</h3>
                                <span class="shopping-item__characteristics">${size + ', ' + base + ' тесто'}</span>
                            </div>
                        </div>
                        <div class="shopping-item__remove-btn" onclick="shoppingPage.removeShoppingItem('${id}', '${size}', '${base}');"></div>
                    </div>
                    <div class="shopping-item__total-price">
                        <span class="shopping-item__price">${product.prices[priceIndex] * count + ' BYN'}</span>
                        <div class="shopping-item__controls">
                            <button class="shopping-item__btn" onclick="shoppingPage.updateCount('${id}', '${size}', '${base}', ${count - 1})">−</button>
                            <span class="shopping-item__counter">${count}</span>
                            <button class="shopping-item__btn" onclick="shoppingPage.updateCount('${id}', '${size}', '${base}', ${count + 1})">+</button>
                        </div>
                    </div>
                </div>
            `;
        });

        const html = `
            <div class="shopping-overlay">
                <div class="shopping-container">
                    <div class="shopping-wrapper">
                        <div class="shopping__header">
                            <h1 class="shopping__title">${localStorageUtil.getCount() + ' товаров на ' + totalPrice.toFixed(2)} BYN</h1>
                            <div class="shopping__close-btn" onclick="shoppingPage.handleClear();"></div>
                        </div>
                        ${htmlShopping || 'Корзина пуста'}
                    </div>
                    <div class="shopping-totals">
                        <div class="shopping__total-price">
                            Сумма заказа
                            <span>${totalPrice.toFixed(2)} BYN</span>
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