import template from './switch.component.html';

export class SwitchComponent extends HTMLElement {

    enabled: boolean = false;

    switchButton: HTMLButtonElement;

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;

        this.onSwitchButtonClick = this.onSwitchButtonClick.bind(this);

        this.switchButton = this.shadowRoot.querySelector("[data-js=switchButton]");
    }

    connectedCallback() {
        this.switchButton.addEventListener('click', this.onSwitchButtonClick);
    }

    disconnectedCallback() {
        this.switchButton.removeEventListener('click', this.onSwitchButtonClick);
    }

    onSwitchButtonClick() {
        this.setEnabled(!this.enabled);
    }

    setEnabled(value: boolean) {
        this.enabled = value;
        this.render();
    }

    render() {
        if (this.enabled) {
            this.switchButton.classList.remove("disabled");
        } else {
            this.switchButton.classList.add("disabled");
        }
    }
}

customElements.define('app-switch', SwitchComponent);
