import template from './header.component.html';
import styleService from '../../api/style.service'

export class HeaderComponent extends HTMLElement {
    isMenuOpen = false;
    navigation: HTMLElement;
    menuButton: HTMLButtonElement;
    header: HTMLElement;

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;

        this.onMenuButtonClick = this.onMenuButtonClick.bind(this);

        this.menuButton = <HTMLButtonElement>this.shadowRoot.querySelector("[data-js=navigation-button]");
        this.navigation = <HTMLElement>this.shadowRoot.querySelector("[data-js=navigation]");
        this.header = this.shadowRoot.querySelector("[data-js=header]")
    }

    connectedCallback() {
        this.menuButton.addEventListener('click', this.onMenuButtonClick);

        this.setNavAttribute();
        this.updateBackgroundColor();
    }

    private onMenuButtonClick() {
        this.isMenuOpen = !this.isMenuOpen;
        this.setNavAttribute();
    }

    private setNavAttribute() {
        this.navigation.setAttribute("data-open", `${this.isMenuOpen}`);
    }

    private updateBackgroundColor() {
        this.header.style.background = styleService.currentOption.headerBackground;
    }

    public disconnectedCallback() {
        this.menuButton.removeEventListener('click', this.onMenuButtonClick);
    }
}

customElements.define('app-header', HeaderComponent);
