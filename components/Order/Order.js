class Order {

    constructor() {
        this.keyRadius = '25 см';
        this.keyBase = 'традиционное';
    }

    handleClear() {
        ROOT_ORDER.innerHTML = '';
    }

    render(id) {
        const product = CATALOG.find(element => element.id === id);
        const index =
            this.keyRadius === '25 см' ? 0 : 
            this.keyRadius === '30 см' ? 1 : 2;
        const html = `
        <div class="order-overlay">
            <div class="order-container">
                <div class="order__close" onclick="orderPage.handleClear()"></div>
                <img class="order__img" src=${product.img}></img>
                <div class="order__content">
                    <h3 class="order__name">${product.name}</h3>
                    <span class="order__info">${this.keyRadius + ', ' + product.weights[index] + ' г' + ', ' + this.keyBase + ' тесто'}</span>
                    <p class="order__ingredients">${product.ingredients}</p>
                    <form>
                        <label>
                            <input type="radio" name="pizza-size" value="25 см" ${this.keyRadius === '25 см' ? 'checked' : ''}>
                            25 см
                        </lable>
                        <label>
                            <input type="radio" name="pizza-size" value="30 см" ${this.keyRadius === '30 см' ? 'checked' : ''}>
                            30 см
                        </lable>
                        <label>
                            <input type="radio" name="pizza-size"  value="35 см"${this.keyRadius === '35 см' ? 'checked' : ''}>
                            35 см
                        </lable>
                    </form>
                    <form>
                        <lable>
                            <input type="radio" name="pizza-base" value="традиционное" ${this.keyBase === 'традиционное' ? 'checked' : ''}>
                            традиционное
                        </lable>
                        <lable>
                            <input type="radio" name="pizza-base" value="тонкое" ${this.keyBase === 'тонкое' ? 'checked' : ''}>
                            тонкое
                        </lable>
                    </form>
                    <button class="order__btn" onclick="">В корзину за ${product.prices[index] + ' BYN'}</button>
                </div>
            </div>
        </div>
        `;

        ROOT_ORDER.innerHTML = html;

        document.querySelectorAll('input[name="pizza-size"]').forEach(element => {
            element.addEventListener('change', event => {
                this.keyRadius = event.target.value;
                this.render(id);
            })
        });

        document.querySelectorAll('input[name="pizza-base"]').forEach(element => {
            element.addEventListener('change', event => {
                this.keyBase = event.target.value;
                this.render(id);
            })
        })
    }
}

const orderPage = new Order();