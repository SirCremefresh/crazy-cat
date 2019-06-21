import template from './detail.page.html';
import '../../components/like-button/like-button.component'
import '../../components/dislike-button/dislike-button.component'
import {getVariable} from "../../router";
import {LikeButtonComponent} from "../../components/like-button/like-button.component";
import {DislikeButtonComponent} from "../../components/dislike-button/dislike-button.component";
import {mediaService, Medium} from "../../api/media.service";

export class DetailPage extends HTMLElement {
    medium: Medium;
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

    async connectedCallback() {
        const id = getVariable();
        this.medium = await mediaService.fetch(id);


        this.descriptionElement.textContent = this.medium.description;

        this.likeButton.likes = this.medium.likes;
        this.dislikeButton.dislikes = this.medium.dislikes;

        this.likeButton.liked = false;
        this.dislikeButton.disliked = false;

        this.likeButton.addEventListener('change', this.onLikeButtonChange);
        this.dislikeButton.addEventListener('change', this.onDislikeButtonChange);
    }

    onLikeButtonChange(event: CustomEvent) {
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
