import template from './image.component.html';
import {LinkComponent} from "../link/link.component";
import '../like-button/like-button.component'
import {getRandomNumber} from "../../util";
import {LikeButtonComponent} from "../like-button/like-button.component";
import {Medium, mediaService} from "../../api/media.service";

const templateNode = document.createRange().createContextualFragment(template);


export class ImageComponent extends HTMLElement {
    medium: Medium;
    isVideo = Math.random() >= 0.5;
    likes = getRandomNumber();
    likeButton: LikeButtonComponent;

    detailLink: LinkComponent;

    imageDescription: HTMLElement;
    imageElement: HTMLImageElement;

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(templateNode.cloneNode(true));

        this.likeButton = <LikeButtonComponent>this.shadowRoot.querySelector("[data-js=like-button]");

        this.detailLink = <LinkComponent>this.shadowRoot.querySelector("[data-js=detail-link]");
        this.detailLink.href = `detail${(this.isVideo) ? '/video' : ''}/${getRandomNumber()}`;

        this.imageDescription = this.shadowRoot.querySelector("[data-js=image-description]");
        this.imageElement = this.shadowRoot.querySelector("[data-js=image]");
    }

    async connectedCallback() {
        const id = this.getAttribute("id");
        this.medium = await mediaService.fetch(id);
        this.imageElement.src = this.medium.fileUrls.s;
        if (this.isVideo) {
            this.imageDescription.textContent += " video"
        } else {
            this.imageDescription.textContent += " image"
        }

        this.likeButton.likes = this.likes;
    }
}

customElements.define('app-image', ImageComponent);
