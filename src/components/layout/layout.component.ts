import template from './layout.component.html'

export class LayoutComponent extends HTMLElement {
    isMenuOpen = false;
    navigation: HTMLElement;

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;
        
        const menuButton = <HTMLButtonElement>this.shadowRoot.getElementById("menu-button");
        this.navigation = <HTMLElement>this.shadowRoot.getElementById("navigation");

        menuButton.onclick = () => {
            this.isMenuOpen = !this.isMenuOpen;
            this.setNavAttribute();
        };

        this.setNavAttribute();
    }

    private setNavAttribute() {
        this.navigation.setAttribute("data-open", `${this.isMenuOpen}`);
    }
}

customElements.define('app-layout', LayoutComponent);