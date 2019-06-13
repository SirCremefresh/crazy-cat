import template from './like-button.component.html';

export class LikeButtonComponent extends HTMLElement {
    liked = false;
    likeCount: number;
    likeButton: HTMLButtonElement;
    likeIcon: SVGSVGElement;
    likeAmountElement: HTMLElement;

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;

        this.onLikeButtonClick = this.onLikeButtonClick.bind(this);

        // this.likeButton = <HTMLButtonElement>this.shadowRoot.querySelector("[data-js=like-button]");
        // this.likeIcon = this.likeButton.querySelector("svg");
        // this.likeAmountElement = this.shadowRoot.querySelector("[data-js=like-amount]");
    }

    connectedCallback() {
        // this.likeCount = +this.getAttribute('like-count');
        //
        // this.likeButton.addEventListener('click', this.onLikeButtonClick);
        //
        // this.renderLikeAmount();
    }

    onLikeButtonClick() {
        // this.liked = !this.liked;
        // if (this.liked) {
        //     this.likeCount++;
        //     this.likeIcon.classList.add("liked");
        // } else {
        //     this.likeCount--;
        //     this.likeIcon.classList.remove("liked");
        // }
        // this.dispatchEvent(new CustomEvent('change', {detail: {liked: this.liked, likeCount: this.likeCount}}));
        // this.renderLikeAmount();
    }

    private renderLikeAmount() {
        this.likeAmountElement.textContent = this.likeCount.toString();
    }

    public disconnectedCallback() {
        this.likeButton.removeEventListener('click', this.onLikeButtonClick);
    }
}

customElements.define('app-like-button', LikeButtonComponent);
