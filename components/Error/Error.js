class Error {

    handleClear () {
        ROOT_ERROR.innerHTML = '';
    }

    render () {
        const html = `
            <div class="error-container">
                <div class="error-content">
                    <p class="error__text">Возникла неизвестная проблема. Попробуйте зайти позже!</p>
                </div>
            </div>
        `;

        ROOT_ERROR.innerHTML = html;
    }
}

const error = new Error();