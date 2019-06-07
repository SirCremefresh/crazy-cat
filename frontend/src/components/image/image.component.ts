import template from './image.component.html';
import {LinkComponent} from "../link/link.component";
import '../like-button/like-button.component'
import {getRandomNumber} from "../../util";

const templateNode = document.createRange().createContextualFragment(template);


export class ImageComponent extends HTMLElement {
    isVideo = Math.random() >= 0.5;
    likeAmount = getRandomNumber();
    likeIcon: SVGSVGElement;
    likeButton: HTMLButtonElement;
    likeAmountElement: HTMLElement;

    detailLink: LinkComponent;

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(templateNode.cloneNode(true));

        this.onLikeButtonChange = this.onLikeButtonChange.bind(this);

        this.likeButton = <HTMLButtonElement>this.shadowRoot.querySelector("[data-js=like-button]");
        this.likeIcon = this.likeButton.querySelector("svg");
        this.likeAmountElement = this.shadowRoot.querySelector("[data-js=like-amount]");

        this.detailLink = <LinkComponent>this.shadowRoot.querySelector("[data-js=detail-link]");
        this.detailLink.href = `detail${(this.isVideo) ? '/video' : ''}/${getRandomNumber()}`;
    }

    connectedCallback() {
        this.likeButton.addEventListener('change', this.onLikeButtonChange);

        this.updateLikeAmount();
    }

    onLikeButtonChange(event: CustomEvent) {
        if (event.detail) {
            this.likeAmount++;
        } else {
            this.likeAmount--;
        }
        this.updateLikeAmount();
    }

    updateLikeAmount() {
        this.likeAmountElement.textContent = `${this.likeAmount}`;
    }

    public disconnectedCallback() {
        this.likeButton.removeEventListener('change', this.onLikeButtonChange);
    }
}

customElements.define('app-image', ImageComponent);
