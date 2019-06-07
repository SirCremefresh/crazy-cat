import template from './image.component.html';

const templateNode = document.createRange().createContextualFragment(template);

export class ImageComponent extends HTMLElement {
    liked = false;
    likeIcon: HTMLElement;
    likeButton: HTMLButtonElement;
    likeAmount: HTMLElement;

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(templateNode.cloneNode(true));

        this.likeIcon = this.shadowRoot.querySelector("#like-button > svg");
        this.likeButton = <HTMLButtonElement>this.shadowRoot.getElementById("like-button");
        this.likeAmount = this.shadowRoot.getElementById("like-amount");

        this.likeAmount.innerText = this.getRandomNumber().toString();

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

    public disconnectedCallback() {
    }

    private setNavAttribute() {
    }

    private getRandomNumber() {
        let min = Math.ceil(0);
        let max = Math.floor(18);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

customElements.define('app-image', ImageComponent);
