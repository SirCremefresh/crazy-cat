import template from './layout.component.html'
import '../header/header.component'

export class LayoutComponent extends HTMLElement {
    footer: HTMLElement;

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;

        this.footer = this.shadowRoot.querySelector("footer");
        this.footer.textContent = new Date().getFullYear() + ' - JOSIDO dev';
    }
}

customElements.define('app-layout', LayoutComponent);
