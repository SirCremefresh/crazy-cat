import template from './switch.component.html';

export class SwitchComponent extends HTMLElement {

    enabled: boolean = false;
    outerButton: HTMLButtonElement;
    innerButton: HTMLElement;

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;

        this.onOuterButtonClick = this.onOuterButtonClick.bind(this);

        this.outerButton = this.shadowRoot.querySelector("[data-js=outer]");
        this.innerButton = this.shadowRoot.querySelector("[data-js=inner]");
    }

    connectedCallback() {
        this.outerButton.addEventListener('click', this.onOuterButtonClick);
    }

    onOuterButtonClick() {
        this.setEnabled(!this.enabled);
    }

    setEnabled(value: boolean) {
        this.enabled = value;
        this.render();
    }

    render() {
        if (this.enabled) {
            this.innerButton.classList.remove("disabled");
        } else {
            this.innerButton.classList.add("disabled");
        }
    }

    public disconnectedCallback() {
        this.outerButton.removeEventListener('click', this.onOuterButtonClick);
    }
}

customElements.define('app-switch', SwitchComponent);
