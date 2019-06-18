import template from './image.component.html';
import {LinkComponent} from "../link/link.component";
import '../like-button/like-button.component'
import {getRandomNumber} from "../../util";
import {LikeButtonComponent} from "../like-button/like-button.component";

const templateNode = document.createRange().createContextualFragment(template);


export class ImageComponent extends HTMLElement {
    isVideo = Math.random() >= 0.5;
    likes = getRandomNumber();
    likeButton: LikeButtonComponent;

    detailLink: LinkComponent;

    imageDescription: HTMLElement;

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(templateNode.cloneNode(true));

        this.likeButton = <LikeButtonComponent>this.shadowRoot.querySelector("[data-js=like-button]");

        this.detailLink = <LinkComponent>this.shadowRoot.querySelector("[data-js=detail-link]");
        this.detailLink.href = `detail${(this.isVideo) ? '/video' : ''}/${getRandomNumber()}`;

        this.imageDescription = this.shadowRoot.querySelector("[data-js=image-description]")
    }

    connectedCallback() {
        if (this.isVideo) {
            this.imageDescription.textContent += " video"
        } else {
            this.imageDescription.textContent += " image"
        }

        this.likeButton.likes = this.likes;
    }
}

customElements.define('app-image', ImageComponent);
