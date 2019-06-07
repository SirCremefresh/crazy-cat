import template from './dislike-button.component.html';

export class DislikeButtonComponent extends HTMLElement {
    disliked = false;
    dislikeButton: HTMLButtonElement;
    dislikeIcon: SVGSVGElement;

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;

        this.onDislikeButtonClick = this.onDislikeButtonClick.bind(this);

        this.dislikeButton = <HTMLButtonElement>this.shadowRoot.querySelector("[data-js=dislike-button]");
        this.dislikeIcon = this.dislikeButton.querySelector("svg");
    }

    connectedCallback() {
        this.dislikeButton.addEventListener('click', this.onDislikeButtonClick);
    }

    onDislikeButtonClick() {
        this.disliked = !this.disliked;
        if (this.disliked) {
            this.dislikeIcon.classList.add("disliked");
        } else {
            this.dislikeIcon.classList.remove("disliked");
        }
        this.dispatchEvent(new CustomEvent('change', {detail: this.disliked}));
    }

    disconnectedCallback() {
        this.dislikeButton.removeEventListener('click', this.onDislikeButtonClick);
    }
}

customElements.define('app-dislike-button', DislikeButtonComponent);
