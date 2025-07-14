class LocalStorageUtil {
    constructor () {
        this.keyName = 'products';
    }

    getProducts () {
        const products = localStorage.getItem(this.keyName);
        return products !== null ? JSON.parse(products) : [];
    }

    putProduct (id, size, base) {
        let products = this.getProducts();

        const index = products.findIndex(element => 
            element.id === id && 
            element.size === size &&
            element.base === base
        );

        if (index >= 0) {
            products[index].count += 1;
        } else {
            products.push( {id, size, base, count : 1} );
        }

        localStorage.setItem(this.keyName, JSON.stringify(products));
        return products;
    }

    removeProduct (id, size, base) {
        let products = localStorageUtil.getProducts();
        const index = products.findIndex(element => 
            element.id === id &&
            element.size === size &&
            element.base === base
        );
        products.splice(index, 1);
        localStorage.setItem(this.keyName, JSON.stringify(products));
        return products
    }

    updateCount (id, size, base, newCount) {
        let products = localStorageUtil.getProducts();
        const index = products.findIndex(element => 
            element.id === id &&
            element.size === size &&
            element.base === base
        );
        products[index].count = newCount;
        localStorage.setItem(this.keyName, JSON.stringify(products));
        return products;
    }

    getCount () {
        return localStorageUtil.getProducts().reduce((total, element) => total += element.count, 0);
    }
}
const localStorageUtil = new LocalStorageUtil();