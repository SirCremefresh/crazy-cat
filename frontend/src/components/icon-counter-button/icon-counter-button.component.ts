import html from './icon-counter-button.component.html';

const template = document.createElement('template');
template.innerHTML = html;

export class IconCounterButtonComponent extends HTMLElement {
    counterElement: HTMLElement;
    buttonElement: HTMLButtonElement;
    iconElement: SVGSVGElement;

    static get observedAttributes() {
        return ['count', 'active-color', 'active'];
    }

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.onClick = this.onClick.bind(this);

        this.counterElement = this.shadowRoot.querySelector('[data-js=counter]');
        this.buttonElement = this.shadowRoot.querySelector('[data-js=button]');
        this.iconElement = this.shadowRoot.querySelector('[data-js=icon-container]');
    }

    connectedCallback() {
        this.buttonElement.addEventListener('click', this.onClick);
    }

    onClick(): void {
        this.setStatus(!this.active);

        this.dispatchEvent(new CustomEvent('change',
            {
                detail: {active: this.active, count: this.count},
                bubbles: true,
                cancelable: true
            }
        ));
    }

    setStatus(active: boolean): boolean {
        if (this.active !== active) {
            this.active = !this.active;
            this.count += (this.active) ? 1 : -1;

            this.render();

            return true;
        }
        return false;
    }

    private render() {
        if (this.active) {
            this.iconElement.style.fill = this.activeColor;
        } else {
            this.iconElement.style.fill = 'unset';
        }
        this.counterElement.textContent = this.count.toString();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    public disconnectedCallback() {
        this.buttonElement.removeEventListener('click', this.onClick);
    }

    get count(): number {
        return +this.getAttribute('count');
    }

    set count(value: number) {
        this.setAttribute('count', value.toString())
    }

    get activeColor(): string {
        return this.getAttribute('active-color');
    }

    set activeColor(value: string) {
        this.setAttribute('active-color', value)
    }

    get active(): boolean {
        return this.getAttribute('active') === 'true';
    }

    set active(value: boolean) {
        this.setAttribute('active', value.toString());
    }
}

customElements.define('app-icon-counter-button', IconCounterButtonComponent);
