class Header {

    render (count) {
        const html = `
            <header class="header-container">
                    <div class="header__counter" onclick="shoppingPage.render();">
                        ${count}
                    </div>
            </header>
        `

        ROOT_HEADER.innerHTML = html;
    }
}

const headerPage = new Header();
headerPage.render(localStorageUtil.getCount());