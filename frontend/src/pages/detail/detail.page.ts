import template from './detail.page.html';
import '../../components/like-button/like-button.component'
import '../../components/dislike-button/dislike-button.component'
import {getRandomNumber} from "../../util";
import {getPath} from "../../router";
import {LikeButtonComponent} from "../../components/like-button/like-button.component";
import {DislikeButtonComponent} from "../../components/dislike-button/dislike-button.component";

export class DetailPage extends HTMLElement {
    likeButton: LikeButtonComponent;
    dislikeButton: DislikeButtonComponent;

    descriptionElement: HTMLElement;

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;

        this.onDislikeButtonChange = this.onDislikeButtonChange.bind(this);
        this.onLikeButtonChange = this.onLikeButtonChange.bind(this);

        this.likeButton = this.shadowRoot.querySelector("[data-js=like-button]");
        this.dislikeButton = this.shadowRoot.querySelector("[data-js=dislike-button]");

        this.descriptionElement = this.shadowRoot.querySelector("[data-js=description]")
    }

    connectedCallback() {
        this.likeButton.addEventListener('change', this.onLikeButtonChange);
        this.dislikeButton.addEventListener('change', this.onDislikeButtonChange);

        if (getPath().indexOf("video") === -1) {
            this.descriptionElement.textContent += " image"
        } else {
            this.descriptionElement.textContent += " video"
        }

        this.likeButton.likes = getRandomNumber();
        this.dislikeButton.dislikes = getRandomNumber();

        this.likeButton.liked = false;
        this.dislikeButton.disliked = false;
    }

    onLikeButtonChange(event: CustomEvent) {
        console.log("change");
        if (this.likeButton.liked) {
            this.dislikeButton.setStatus(false);
        }
    }

    onDislikeButtonChange(event: CustomEvent) {
        if (this.dislikeButton.disliked) {
            this.likeButton.setStatus(false);
        }
    }

    disconnectedCallback() {
        this.likeButton.removeEventListener('change', this.onLikeButtonChange);
        this.dislikeButton.removeEventListener('change', this.onDislikeButtonChange);
    }
}


customElements.define('app-detail-page', DetailPage);
