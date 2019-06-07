import template from './icon-button.component.html';

export class IconButtonComponent extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;
    }
}

customElements.define('app-icon-button', IconButtonComponent);
