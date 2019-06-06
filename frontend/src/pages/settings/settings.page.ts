import template from './settings.page.html';
import '../../components/switch/switch.component';

export class HomePage extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;
    }
}


customElements.define('app-settings-page', HomePage);
