import html from './dislike-button.component.html';
import {IconCounterButtonComponent} from "../icon-counter-button/icon-counter-button.component";

const template = document.createElement('template');
template.innerHTML = html;

export class DislikeButtonComponent extends HTMLElement {
    private iconCounterButtonElement: IconCounterButtonComponent;

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.onChange = this.onChange.bind(this);

        this.iconCounterButtonElement = <IconCounterButtonComponent>this.shadowRoot.querySelector("[data-js=icon-counter-button]");
    }

    connectedCallback() {
        this.iconCounterButtonElement.addEventListener('change', this.onChange);
    }

    public disconnectedCallback() {
        this.iconCounterButtonElement.removeEventListener('change', this.onChange);
    }

    onChange(e: CustomEvent) {
        this.dispatchEvent(new CustomEvent('change', {detail: e.detail}));
    }

    setStatus(disliked: boolean): boolean {
        return this.iconCounterButtonElement.setStatus(disliked);
    }

    get dislikes(): number {
        return this.iconCounterButtonElement.count;
    }

    set dislikes(value: number) {
        this.iconCounterButtonElement.count = value;
    }

    get disliked(): boolean {
        return this.iconCounterButtonElement.active;
    }

    set disliked(value: boolean) {
        this.iconCounterButtonElement.active = value;
    }
}

customElements.define('app-dislike-button', DislikeButtonComponent);
