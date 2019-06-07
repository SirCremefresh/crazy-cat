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

        this.outerButton = this.shadowRoot.querySelector(".outer");
        this.innerButton = this.shadowRoot.querySelector(".inner");
    }

    connectedCallback() {
        this.outerButton.addEventListener('click', this.onOuterButtonClick);
    }

    onOuterButtonClick() {
        if (this.enabled) {
            this.innerButton.classList.add("disabled");
        } else {
            this.innerButton.classList.remove("disabled");
        }
        this.enabled = !this.enabled;
    }

    public disconnectedCallback() {
        this.outerButton.removeEventListener('click', this.onOuterButtonClick);
    }
}

customElements.define('app-switch', SwitchComponent);
