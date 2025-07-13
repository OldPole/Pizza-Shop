class Order {

    constructor() {
        this.keySize = '25 см';
        this.keyBase = 'Традиционное';
    }

    handleClear() {
        ROOT_ORDER.innerHTML = '';
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
                        <button class="size-option ${this.keySize === '25 см' ? 'size-optin_active' : ''}" data-size="25 см">25 см</button>
                        <button class="size-option ${this.keySize === '30 см' ? 'size-optin_active' : ''}" data-size="30 см">30 см</button>
                        <button class="size-option ${this.keySize === '35 см' ? 'size-optin_active' : ''}" data-size="35 см">35 см</button>
                    </div>
                    <div class="order__options">
                        <button class="base-option ${this.keyBase === 'Традиционное' ? 'base-option_active' : ''}" data-base="Традиционное">Традиционное</button>
                        <button class="base-option ${this.keyBase === 'Тонкое' ? 'base-option_active' : ''}" data-base="Тонкое">Тонкое</button>
                    </div>
                    <button class="order__btn" onclick="orderPage.handleClear();">В корзину за ${product.prices[index] + ' BYN'}</button>
                </div>
            </div>
        </div>
        `;

        ROOT_ORDER.innerHTML = html;

        document.querySelectorAll('.size-option').forEach(element => {
            element.addEventListener('click', event => {
                const newSize = event.target.dataset.size;

                if ( newSize !== this.keySize) {
                    this.keySize = newSize;
                    this.render(id);
                }
            })
        });

        document.querySelectorAll('.base-option').forEach(element => {
            element.addEventListener('click', event => {
                const newBase = event.target.dataset.base;

                if (newBase !== this.keyBase) {
                    this.keyBase = newBase;
                    this.render(id);
                }
            })
        });
    }
}

const orderPage = new Order();