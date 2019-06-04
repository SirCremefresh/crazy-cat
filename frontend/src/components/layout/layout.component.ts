import template from './layout.component.html'

export class LayoutComponent extends HTMLElement {
    isMenuOpen = false;
    navigation: HTMLElement;
    menuButton: HTMLButtonElement;

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;

        this.menuButton = <HTMLButtonElement>this.shadowRoot.getElementById("navigation-button");
        this.navigation = <HTMLElement>this.shadowRoot.getElementById("navigation");

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

customElements.define('app-layout', LayoutComponent);
