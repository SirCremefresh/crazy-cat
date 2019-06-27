export class NotFoundPage extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <p>not found</p>
        `
    }
}

customElements.define('app-not-found-page', NotFoundPage);
