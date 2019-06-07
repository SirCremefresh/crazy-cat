import template from './header.component.html';

export class HeaderComponent extends HTMLElement {
    isMenuOpen = false;
    navigation: HTMLElement;
    menuButton: HTMLButtonElement;

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;

        this.menuButton = <HTMLButtonElement>this.shadowRoot.querySelector("[data-js=navigation-button]");
        this.navigation = <HTMLElement>this.shadowRoot.querySelector("[data-js=navigation]");

        this.menuButton.onclick = () => {
            this.isMenuOpen = !this.isMenuOpen;
            this.setNavAttribute();
        };

        this.setNavAttribute();
    }

    private setNavAttribute() {
        this.navigation.setAttribute("data-open", `${this.isMenuOpen}`);
    }

    public disconnectedCallback() {
        this.menuButton.onclick = undefined;
    }
}

customElements.define('app-header', HeaderComponent);
