import {navigateTo} from '../../router';

export class LinkComponent extends HTMLAnchorElement {
    connectedCallback() {
        this.addEventListener('click', e => {
            e.preventDefault();

            if (this.pathname === '.') {
                return;
            }

            navigateTo(this.pathname);
        });
    }
}

customElements.define('app-link', LinkComponent, {
    extends: 'a'
});
