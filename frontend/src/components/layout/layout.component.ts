import template from './layout.component.html'
import '../header/header.component'
import {styleService} from "../../api/style.service";

export class LayoutComponent extends HTMLElement {
    footer: HTMLElement;
    article: HTMLElement;

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;

        this.footer = this.shadowRoot.querySelector("footer");
        this.footer.textContent = new Date().getFullYear() + ' - JOSIDO dev';

        this.updateColors = this.updateColors.bind(this);

        this.article = this.shadowRoot.querySelector("article");
        
    }

    connectedCallback() {
        this.updateColors();
        styleService.observable.subscribe(this.updateColors)
    }

    updateColors() {
        this.article.style.backgroundColor = styleService.currentOption.siteBackground;
        this.article.style.color = styleService.currentOption.fontColor;
    }
}

customElements.define('app-layout', LayoutComponent);
