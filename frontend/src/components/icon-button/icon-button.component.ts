import template from './icon-button.component.html';

export class IconButtonComponent extends HTMLButtonElement {
    count: number;
    active = false;
    activeColor: string;

    counterElement: HTMLElement;
    buttonElement: HTMLButtonElement;
    iconElement: SVGSVGElement;

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;

        this.counterElement = this.shadowRoot.querySelector('[data-js=counter]');
    }

    connectedCallback() {
        this.count = +this.getAttribute('count');
        this.activeColor = this.getAttribute('active-color');

        this.render();
    }

    click(): void {
        this.active = !this.active;
        this.count += (this.active) ? 1 : -1;

        this.render();
        this.dispatchEvent(new CustomEvent('change', {detail: {active: this.active, count: this.count}}));
    }

    private render() {
        if (this.active) {
            this.iconElement.style.fill = this.activeColor;
        } else {
            this.iconElement.style.fill = 'unset';
        }
    }
}

customElements.define('app-icon-button', IconButtonComponent, {
    extends: 'button'
});
