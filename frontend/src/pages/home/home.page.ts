import '../../components/image/image.component';
import template from './home.page.html';
import { navigateTo } from '../../router';

export class HomePage extends HTMLElement {
    private imagesContainer: HTMLElement;
    private imageComponents = [];

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;

        this.imagesContainer = this.shadowRoot.getElementById('images');

        for (let i = 0; i < 20; i++) {
            this.imageComponents.push(document.createElement('app-image'));
        }

        this.imagesContainer.append(...this.imageComponents);

        this.imageComponents.forEach((e) => {
            e.addEventListener('click', () => {
                navigateTo('detail/1');
            })
        });
    }
}


customElements.define('app-home-page', HomePage);
