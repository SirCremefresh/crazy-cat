import {navigateTo} from '../../router';

export class LinkComponent extends HTMLAnchorElement {
	connectedCallback() {
		this.addEventListener('click', e => {
			e.preventDefault();

			console.log(this.pathname);

			navigateTo(this.pathname);
		});
	}
}

customElements.define('app-link', LinkComponent, {
	extends: 'a'
});
