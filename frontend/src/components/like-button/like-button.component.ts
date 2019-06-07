import template from './like-button.component.html';

export class LikeButtonComponent extends HTMLElement {
    liked = false;
    likeButton: HTMLButtonElement;
    likeIcon: SVGSVGElement;

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;

        this.likeButton = <HTMLButtonElement>this.shadowRoot.querySelector("[data-js=like-button]");
        this.likeIcon = this.likeButton.querySelector("svg");

        this.likeButton.addEventListener('click', () => {
            this.liked = !this.liked;
            if (this.liked) {
                this.likeIcon.classList.add("liked");
            } else {
                this.likeIcon.classList.remove("liked");
            }
            this.dispatchEvent(new CustomEvent('change', {detail: this.liked}));
        });
    }
}

customElements.define('app-like-button', LikeButtonComponent);
