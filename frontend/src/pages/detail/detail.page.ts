import template from './detail.page.html';
import '../../components/imagedetail/imagedetail.component';

export class DetailPage extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;
    }
}


customElements.define('app-detail-page', DetailPage);
