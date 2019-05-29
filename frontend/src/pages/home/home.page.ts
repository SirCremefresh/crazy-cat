import template from './home.page.html'

export class HomePage extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;
    }

}


customElements.define('app-home-page', HomePage);