import template from './image.component.html';
import '../like-button/like-button.component'
import {LinkComponent} from "../link/link.component";
import {LikeButtonComponent} from "../like-button/like-button.component";
import {Medium, mediaService} from "../../api/media.service";

const templateNode = document.createRange().createContextualFragment(template);

export class ImageComponent extends HTMLElement {
    medium: Medium;
    likes: number;
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

        this.imageDescription = this.shadowRoot.querySelector("[data-js=image-description]");
        this.imageElement = this.shadowRoot.querySelector("[data-js=image]");
    }

    async connectedCallback() {
        const id = this.getAttribute("id");
        this.detailLink.href = `detail/${id}`;
        this.medium = await mediaService.fetch(id);
        this.imageElement.src = this.medium.fileUrls.thumbnail;
        this.imageElement.alt = this.medium.description;
        this.imageDescription.textContent = this.medium.description;

        this.likeButton.likes = this.medium.likes;
    }
}

customElements.define('app-image', ImageComponent);
