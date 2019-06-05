import template from './settings.page.html';

export class HomePage extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;
    }
}


customElements.define('app-settings-page', HomePage);
