import template from './image.component.html';

export class ImageComponent extends HTMLElement {
    likes = Math.floor(Math.random() * 50);

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;
    }

    public disconnectedCallback() {
    }

    private setNavAttribute() {
    }
}

customElements.define('app-image', ImageComponent);
