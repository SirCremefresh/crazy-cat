import template from './image.component.html';

export class ImageComponent extends HTMLElement {
    likes = Math.floor(Math.random() * 50);
    liked = false;
    likeIcon: HTMLElement;
    likeButton: HTMLButtonElement;

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;

        this.likeIcon = this.shadowRoot.querySelector("#like-button > svg");
        this.likeButton = <HTMLButtonElement>this.shadowRoot.getElementById("like-button");

        this.likeButton.addEventListener('click', () => {
            if (this.liked) {
                this.likeIcon.classList.remove("liked")
            } else {
                this.likeIcon.classList.add("liked");
            }
            this.liked = !this.liked;
        });


    }

    public disconnectedCallback() {
    }

    private setNavAttribute() {
    }
}

customElements.define('app-image', ImageComponent);
