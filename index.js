function render() {
    productsPage.render();
    headerPage.render(localStorageUtil.getCount());
}

let CATALOG = [];

spinner.render();

fetch('server/catalog.json')
    .then(res => res.json())
    .then(body => {
        CATALOG = body;
        spinner.handleClear();
        render();
    })
    .catch(() => {
        spinner.handleClear();
        error.render();
    });