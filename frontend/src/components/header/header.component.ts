import template from './header.component.html';

export class HeaderComponent extends HTMLElement {
    isMenuOpen = false;
    navigation: HTMLElement;
    menuButton: HTMLButtonElement;

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;

        this.onMenuButtonClick = this.onMenuButtonClick.bind(this);

        this.menuButton = <HTMLButtonElement>this.shadowRoot.querySelector("[data-js=navigation-button]");
        this.navigation = <HTMLElement>this.shadowRoot.querySelector("[data-js=navigation]");
    }

    connectedCallback() {
        this.menuButton.addEventListener('click', this.onMenuButtonClick);

        this.setNavAttribute();
    }

    private onMenuButtonClick() {
        this.isMenuOpen = !this.isMenuOpen;
        this.setNavAttribute();
    }

    private setNavAttribute() {
        this.navigation.setAttribute("data-open", `${this.isMenuOpen}`);
    }

    public disconnectedCallback() {
        this.menuButton.removeEventListener('click', this.onMenuButtonClick);
    }
}

customElements.define('app-header', HeaderComponent);
