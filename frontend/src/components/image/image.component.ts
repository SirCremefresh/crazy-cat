import template from './image.component.html';

export class ImageComponent extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({mode: 'open'});
		this.shadowRoot.innerHTML = template;
	}

	public disconnectedCallback() {
	}

	private setNavAttribute() {
	}
}

customElements.define('app-image', ImageComponent);
