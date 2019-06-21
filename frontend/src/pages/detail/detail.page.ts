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
    imageElement: HTMLImageElement;
    videoElement: HTMLVideoElement;

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;

        this.onDislikeButtonChange = this.onDislikeButtonChange.bind(this);
        this.onLikeButtonChange = this.onLikeButtonChange.bind(this);

        this.likeButton = this.shadowRoot.querySelector("[data-js=like-button]");
        this.dislikeButton = this.shadowRoot.querySelector("[data-js=dislike-button]");

        this.imageElement = this.shadowRoot.querySelector("[data-js=image]");
        this.videoElement = this.shadowRoot.querySelector("[data-js=video]");

        this.descriptionElement = this.shadowRoot.querySelector("[data-js=description]");
    }

    async connectedCallback() {
        const id = getVariable();
        this.medium = await mediaService.fetch(id);


        this.descriptionElement.textContent = this.medium.description;

        this.likeButton.likes = this.medium.likes;
        this.dislikeButton.dislikes = this.medium.dislikes;
        this.likeButton.liked = this.medium.liked;
        this.dislikeButton.disliked = this.medium.disliked;

        if (this.medium.type === "image") {
            this.imageElement.srcset = `
            ${this.medium.fileUrls.s} 560w,
            ${this.medium.fileUrls.m} 960w,
            ${this.medium.fileUrls.l} 1200w
            `;
        } else {
            this.videoElement.poster = this.medium.fileUrls.thumbnail;
            this.videoElement.innerHTML = `
               <source src="${this.medium.fileUrls.s}" type="video/mp4" media="all and (max-width: 560px)"> 
               <source src="${this.medium.fileUrls.m}" type="video/mp4" media="all and (max-width: 960px)"> 
               <source src="${this.medium.fileUrls.l}" type="video/mp4"> 
            `;
            this.videoElement.style.display = "block";
            this.imageElement.style.display = "none";
        }


        this.likeButton.addEventListener('change', this.onLikeButtonChange);
        this.dislikeButton.addEventListener('change', this.onDislikeButtonChange);
    }

    async onLikeButtonChange(event: CustomEvent) {
        if (this.likeButton.liked) {
            if (this.dislikeButton.setStatus(false)) {
                await mediaService.undislike(this.medium.id);
            }
            await mediaService.like(this.medium.id);
        } else {
            await mediaService.unlike(this.medium.id);
        }
    }

    async onDislikeButtonChange(event: CustomEvent) {
        if (this.dislikeButton.disliked) {
            if (this.likeButton.setStatus(false)) {
                await mediaService.unlike(this.medium.id);
            }
            await mediaService.dislike(this.medium.id);
        } else {
            await mediaService.undislike(this.medium.id);
        }
    }

    disconnectedCallback() {
        this.likeButton.removeEventListener('change', this.onLikeButtonChange);
        this.dislikeButton.removeEventListener('change', this.onDislikeButtonChange);
    }
}


customElements.define('app-detail-page', DetailPage);
