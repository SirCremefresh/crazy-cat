import template from './detail.page.html';
import '../../components/like-button/like-button.component'
import '../../components/dislike-button/dislike-button.component'
import {getRandomNumber} from "../../util";

export class DetailPage extends HTMLElement {
    likeAmount = getRandomNumber();
    dislikeAmount = getRandomNumber();
    likeAmountElement: HTMLElement;
    dislikeAmountElement: HTMLElement;

    likeButton: HTMLButtonElement;
    dislikeButton: HTMLButtonElement;

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;

        this.onDislikeButtonChange = this.onDislikeButtonChange.bind(this);
        this.onLikeButtonChange = this.onLikeButtonChange.bind(this);

        this.likeButton = this.shadowRoot.querySelector("[data-js=like-button]");
        this.dislikeButton = this.shadowRoot.querySelector("[data-js=dislike-button]");

        this.likeAmountElement = this.shadowRoot.querySelector("[data-js=like-amount]");
        this.dislikeAmountElement = this.shadowRoot.querySelector("[data-js=dislike-amount]");
    }

    connectedCallback() {
        this.likeButton.addEventListener('change', this.onLikeButtonChange);
        this.dislikeButton.addEventListener('change', this.onDislikeButtonChange);

        this.updateCounters()
    }

    onLikeButtonChange(event: CustomEvent) {
        if (event.detail) {
            this.likeAmount++;
        } else {
            this.likeAmount--;
        }
        this.updateCounters();
    }

    onDislikeButtonChange(event: CustomEvent) {
        if (event.detail) {
            this.dislikeAmount++;
        } else {
            this.dislikeAmount--;
        }
        this.updateCounters();
    }

    updateCounters() {
        this.likeAmountElement.textContent = this.likeAmount.toString();
        this.dislikeAmountElement.textContent = this.dislikeAmount.toString();
    }

    disconnectedCallback() {
        this.likeButton.removeEventListener('change', this.onLikeButtonChange);
        this.dislikeButton.removeEventListener('change', this.onDislikeButtonChange);
    }
}


customElements.define('app-detail-page', DetailPage);
