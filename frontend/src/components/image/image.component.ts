import template from './image.component.html';

export class ImageComponent extends HTMLElement {
    likes = Math.floor(Math.random() * 50);
    likeIcon: HTMLElement;
    likeButton: HTMLButtonElement;

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;

        this.likeIcon = this.shadowRoot.getElementById("like-icon");
        this.likeButton = <HTMLButtonElement>this.shadowRoot.getElementById("like-button");

        this.likeButton.addEventListener('click', () => {
            this.likeIcon.classList.add("liked");
        });


    }

    public disconnectedCallback() {
    }

    private setNavAttribute() {
    }
}

customElements.define('app-image', ImageComponent);
