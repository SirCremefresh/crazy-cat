import html from './like-button.component.html';
import '../icon-counter-button/icon-counter-button.component'
import {IconCounterButtonComponent} from "../icon-counter-button/icon-counter-button.component";

const template = document.createElement('template');
template.innerHTML = html;

export class LikeButtonComponent extends HTMLElement {
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

    setStatus(liked: boolean): boolean {
        return this.iconCounterButtonElement.setStatus(liked);
    }

    get likes(): number {
        return this.iconCounterButtonElement.count;
    }

    set likes(value: number) {
        this.iconCounterButtonElement.count = value;
    }

    get liked(): boolean {
        return this.iconCounterButtonElement.active;
    }

    set liked(value: boolean) {
        this.iconCounterButtonElement.active = value;
    }
}

customElements.define('app-like-button', LikeButtonComponent);
