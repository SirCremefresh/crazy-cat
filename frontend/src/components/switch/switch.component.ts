import template from './switch.component.html';

export class SwitchComponent extends HTMLElement {

    enabled: boolean = true;
    outerButton: HTMLButtonElement;
    innerButton: HTMLElement;

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;

        this.outerButton = this.shadowRoot.querySelector(".outer");
        this.innerButton = this.shadowRoot.querySelector(".inner");

        this.outerButton.addEventListener('click', () => {
            if (this.enabled) {
                this.innerButton.classList.add("disabled");
            } else {
                this.innerButton.classList.remove("disabled");
            }
            this.enabled = !this.enabled;
        });
    }
}

customElements.define('app-switch', SwitchComponent);
