class Order {

    constructor() {
        this.keySize = '25 см';
        this.keyBase = 'Традиционное';
    }

    addToCart (id, size, base) {
        localStorageUtil.putProduct(id, size, base);
        this.handleClear();
        headerPage.render(localStorageUtil.getCount());
    }

    handleClear () {
        ROOT_ORDER.innerHTML = '';
    }

    handleSizeClick (id, newSize) {
        if (this.keySize !== newSize) {
            this.keySize = newSize;
            this.render(id);
        }
    }

    handleBaseClick (id, newBase) {
        if (this.keyBase !== newBase) {
            this.keyBase = newBase;
            this.render(id);
        }
    }

    render(id) {
        const product = CATALOG.find(element => element.id === id);
        const index =
            this.keySize === '25 см' ? 0 : 
            this.keySize === '30 см' ? 1 : 2;
        const html = `
        <div class="order-overlay">
            <div class="order-container">
                <div class="order__close" onclick="orderPage.handleClear()"></div>
                <img class="order__img" src=${product.img}></img>
                <div class="order__content">
                    <h3 class="order__name">${product.name}</h3>
                    <span class="order__info">${this.keySize + ', ' + product.weights[index] + ' г' + ', ' + this.keyBase + ' тесто'}</span>
                    <p class="order__ingredients">${product.ingredients}</p>
                    <div class="order__options">
                        <button class="size-option ${this.keySize === '25 см' ? 'size-option_active' : ''}" onclick="orderPage.handleSizeClick('${id}', '25 см');">25 см</button>
                        <button class="size-option ${this.keySize === '30 см' ? 'size-option_active' : ''}" onclick="orderPage.handleSizeClick('${id}', '30 см');">30 см</button>
                        <button class="size-option ${this.keySize === '35 см' ? 'size-option_active' : ''}" onclick="orderPage.handleSizeClick('${id}', '35 см');">35 см</button>
                    </div>
                    <div class="order__options">
                        <button class="base-option ${this.keyBase === 'Традиционное' ? 'base-option_active' : ''}" onclick="orderPage.handleBaseClick('${id}', 'Традиционное');">Традиционное</button>
                        <button class="base-option ${this.keyBase === 'Тонкое' ? 'base-option_active' : ''}" onclick="orderPage.handleBaseClick('${id}', 'Тонкое');">Тонкое</button>
                    </div>
                    <button class="order__btn" onclick="orderPage.addToCart('${id}', '${this.keySize}', '${this.keyBase}');">В корзину за ${product.prices[index] + ' BYN'}</button>
                </div>
            </div>
        </div>
        `;

        ROOT_ORDER.innerHTML = html;
    }
}

const orderPage = new Order();