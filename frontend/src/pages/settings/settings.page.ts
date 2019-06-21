import template from './settings.page.html';
import '../../components/switch/switch.component';
import {styleService} from "../../api/style.service";
import { SwitchComponent } from '../../components/switch/switch.component';

export class HomePage extends HTMLElement {

    prideSwitch: SwitchComponent;
    darkSwitch: SwitchComponent;

    links: any;

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;

        this.prideSwitch = this.shadowRoot.querySelector('app-switch[data-js="prideSwitch"]');
        this.darkSwitch = this.shadowRoot.querySelector('app-switch[data-js="darkSwitch"]');

        this.togglePrideMode = this.togglePrideMode.bind(this);
        this.toggleDarkMode = this.toggleDarkMode.bind(this);

        this.links = this.shadowRoot.querySelectorAll('a');
        this.updateColors = this.updateColors.bind(this);
    }

    connectedCallback() {
        this.prideSwitch.addEventListener('click', this.togglePrideMode);
        this.darkSwitch.addEventListener('click', this.toggleDarkMode);

        this.updateColors();
        styleService.observable.subscribe(this.updateColors);
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

    updateColors() {
        this.links.forEach((e)=> {
            e.style.color = styleService.currentOption.linkFontColor;
        })
    }
}


customElements.define('app-settings-page', HomePage);
