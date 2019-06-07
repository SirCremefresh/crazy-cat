import template from './image.component.html';
import {LinkComponent} from "../link/link.component";

const templateNode = document.createRange().createContextualFragment(template);

function getRandomNumber() {
    return Math.floor(Math.random() * 18).toString();
}

export class ImageComponent extends HTMLElement {
    liked = false;
    likeIcon: HTMLElement;
    likeButton: HTMLButtonElement;
    likeAmount: HTMLElement;

    detailLink: LinkComponent;

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(templateNode.cloneNode(true));

        this.likeIcon = this.shadowRoot.querySelector("[data-js=like-button] > svg");
        this.likeButton = <HTMLButtonElement>this.shadowRoot.querySelector("[data-js=like-button]");
        this.detailLink = <LinkComponent>this.shadowRoot.querySelector("[data-js=detail-link]");
        this.likeAmount = this.shadowRoot.getElementById("like-amount");

        this.likeAmount.textContent = getRandomNumber();

        this.detailLink.href = `detail/${getRandomNumber()}`;

        this.likeButton.addEventListener('click', () => {
            if (this.liked) {
                this.likeIcon.classList.remove("liked");
                this.likeAmount.innerText = (+this.likeAmount.innerText - 1).toString();
            } else {
                this.likeIcon.classList.add("liked");
                this.likeAmount.innerText = (+this.likeAmount.innerText + 1).toString();
            }
            this.liked = !this.liked;
        });
    }
}

customElements.define('app-image', ImageComponent);
