import template from './detail.page.html';
import '../../components/like-button/like-button.component'
import '../../components/dislike-button/dislike-button.component'

export class DetailPage extends HTMLElement {
    likeAmount = 3;
    dislikeAmount = 5;
    likeAmountElement: HTMLElement;
    dislikeAmountElement: HTMLElement;

    likeButton: HTMLButtonElement;
    dislikeButton: HTMLButtonElement;

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;

        this.likeButton = this.shadowRoot.querySelector("[data-js=like-button]");
        this.dislikeButton = this.shadowRoot.querySelector("[data-js=dislike-button]");

        this.likeAmountElement = this.shadowRoot.querySelector("[data-js=like-amount]");
        this.dislikeAmountElement = this.shadowRoot.querySelector("[data-js=dislike-amount]");

        this.likeButton.addEventListener('change', (event: CustomEvent) => {
            if (event.detail) {
                this.likeAmount++;
            } else {
                this.likeAmount--;
            }
            this.updateCounters();
        });

        this.dislikeButton.addEventListener('change', (event: CustomEvent) => {
            if (event.detail) {
                this.dislikeAmount++;
            } else {
                this.dislikeAmount--;
            }
            this.updateCounters();
        });

        this.updateCounters()
    }

    updateCounters() {
        this.likeAmountElement.textContent = this.likeAmount.toString();
        this.dislikeAmountElement.textContent = this.dislikeAmount.toString();
    }
}


customElements.define('app-detail-page', DetailPage);
