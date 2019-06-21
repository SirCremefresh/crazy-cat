import template from './settings.page.html';
import '../../components/switch/switch.component';
import {styleService} from "../../api/style.service";
import { SwitchComponent } from '../../components/switch/switch.component';

export class HomePage extends HTMLElement {

    prideSwitch: SwitchComponent;
    darkSwitch: SwitchComponent;

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;

        this.prideSwitch = this.shadowRoot.querySelector('app-switch[data-js="prideSwitch"]');
        this.darkSwitch = this.shadowRoot.querySelector('app-switch[data-js="darkSwitch"]');

        this.togglePrideMode = this.togglePrideMode.bind(this);
        this.toggleDarkMode = this.toggleDarkMode.bind(this);
    }

    connectedCallback() {
        this.prideSwitch.addEventListener('click', this.togglePrideMode);
        this.darkSwitch.addEventListener('click', this.toggleDarkMode);
    }

    togglePrideMode() {
        if(this.prideSwitch.enabled){
            styleService.setCurrentKey("Pride");
        } else {
            styleService.setCurrentKey("Default");
        }
    }

    toggleDarkMode(){
        if(this.darkSwitch.enabled){
            styleService.setCurrentKey("Dark");
        } else {
            styleService.setCurrentKey("Default");
        }
        
    }
}


customElements.define('app-settings-page', HomePage);
