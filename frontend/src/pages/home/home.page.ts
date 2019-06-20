import '../../components/image/image.component';
import template from './home.page.html';
import {mediaService} from "../../api/media.service";

export class HomePage extends HTMLElement {
    private imagesContainer: HTMLElement;

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;

        this.imagesContainer = this.shadowRoot.querySelector('[data-js=images]');


    }

    async connectedCallback() {
        const media = await mediaService.fetchAll();

        const imageComponents = [];
        for (const medium of media) {
            const appImage = document.createElement('app-image');
            appImage.setAttribute("id", medium.id);
            imageComponents.push(appImage);
        }

        this.imagesContainer.removeChild(this.imagesContainer.firstChild);
        this.imagesContainer.append(...imageComponents);
        console.log(media);
    }

}


customElements.define('app-home-page', HomePage);
