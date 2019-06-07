import template from './imagedetail.component.html';

export class ImageDetailComponent extends HTMLElement {

    id: string
    image: HTMLImageElement;

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;

        this.image = this.shadowRoot.querySelector('.image');

    }

}

customElements.define('app-imagedetail', ImageDetailComponent);
