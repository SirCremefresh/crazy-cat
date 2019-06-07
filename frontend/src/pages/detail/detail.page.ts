import template from './detail.page.html';
import '../../components/imagedetail/imagedetail.component';

export class DetailPage extends HTMLElement {
    image: HTMLElement;

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;

        this.image = this.shadowRoot.querySelector('#image');
        this.image.append(document.createElement('app-imagedetail'));
    }
}


customElements.define('app-detail-page', DetailPage);
