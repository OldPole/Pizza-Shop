class LocalStorageUtil {
    constructor() {
        this.keyName = 'products';
    }
    
    getProducts() {
        const productsLocalStorage = localStorage.getItem(this.keyName);
        if(productsLocalStorage !== null) {
            return JSON.parse(productsLocalStorage);
        } 
        return [];
    }

    putProduct(id) {
        let productsLocalStorage = this.getProducts();
        const index = productsLocalStorage.indexOf(id);
        
        if(index === -1) {
            productsLocalStorage.push(id)
        } else {
            productsLocalStorage.splice(index, 1);
        }
        
        localStorage.setItem(this.keyName, JSON.stringify(productsLocalStorage));
    }
}

const localStorageUtil = new LocalStorageUtil();
localStorageUtil.putProduct('el1');