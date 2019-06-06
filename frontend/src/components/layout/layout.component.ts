import template from './layout.component.html'
import '../header/header.component'

export class LayoutComponent extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;
    }
}

customElements.define('app-layout', LayoutComponent);
