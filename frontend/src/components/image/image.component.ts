import template from './image.component.html';
import {LinkComponent} from "../link/link.component";
import '../like-button/like-button.component'
import {getRandomNumber} from "../../util";

const templateNode = document.createRange().createContextualFragment(template);


export class ImageComponent extends HTMLElement {
    likeAmount = getRandomNumber();
    likeIcon: SVGSVGElement;
    likeButton: HTMLButtonElement;
    likeAmountElement: HTMLElement;

    detailLink: LinkComponent;

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(templateNode.cloneNode(true));

        this.likeButton = <HTMLButtonElement>this.shadowRoot.querySelector("[data-js=like-button]");
        this.likeIcon = this.likeButton.querySelector("svg");
        this.detailLink = <LinkComponent>this.shadowRoot.querySelector("[data-js=detail-link]");
        this.likeAmountElement = this.shadowRoot.querySelector("[data-js=like-amount]");

        this.updateLikeAmount();
        this.detailLink.href = `detail/${getRandomNumber()}`;

        this.likeButton.addEventListener('change', (event: CustomEvent) => {
            if (event.detail) {
                this.likeAmount++;
            } else {
                this.likeAmount--;
            }
            this.updateLikeAmount();
        });
    }

    updateLikeAmount() {
        this.likeAmountElement.textContent = `${this.likeAmount}`;
    }
}

customElements.define('app-image', ImageComponent);
