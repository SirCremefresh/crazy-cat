import {Observable} from "../util/observer";

type StyleKeys = "Default" | "Dark" | "Pride"

type StyleOptions = { headerBackground: string, siteBackground: string, fontColor: string, linkFontColor: string, 
                      secondaryBackgroundColor: string };

class StyleService {
    private static readonly LOCAL_STORAGE_KEY = "CURRENT_THEME";
    private options: { [key in StyleKeys]: StyleOptions } = {
        Default: {
            headerBackground: 'var(--primary-color)',
            siteBackground: '#FFF',
            fontColor: '#000',
            linkFontColor: '',
            secondaryBackgroundColor: ''
        },
        Dark: {
            headerBackground: 'var(--primary-color)',
            siteBackground: '#2E2E2E',
            fontColor: '#FFF',
            linkFontColor: '#06D6A0',
            secondaryBackgroundColor: '#FFF'
        },
        Pride: {
            headerBackground: 'var(--pride-color-gradient)',
            siteBackground: '#FFF',
            fontColor: '#000',
            linkFontColor: '',
            secondaryBackgroundColor: ''
        }
    };

    constructor() {
        const localstorageKey = <StyleKeys>localStorage.getItem(StyleService.LOCAL_STORAGE_KEY);
        if (localstorageKey === null) {
            return;
        } else {
            this.setCurrentKey(localstorageKey)
        }
    }

    private currentKey: StyleKeys = "Default";

    get currentOption() {
        return this.options[this.currentKey];
    }

    setCurrentKey(currentKey: StyleKeys) {
        localStorage.setItem(StyleService.LOCAL_STORAGE_KEY, currentKey);
        this.currentKey = currentKey;
        this.observable.emit(this.currentOption);
    }

    getCurrentKey(): StyleKeys {
        return this.currentKey;
    }

    public observable = new Observable<StyleOptions>()
}



export const styleService = new StyleService();
