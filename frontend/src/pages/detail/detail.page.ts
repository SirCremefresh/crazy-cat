import template from './detail.page.html';

export class DetailPage extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;
    }
}


customElements.define('app-detail-page', DetailPage);
