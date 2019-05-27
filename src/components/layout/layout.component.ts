import template from './layout.component.html'

export class LayoutComponent extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;
    }

}

customElements.define('app-layout', LayoutComponent);