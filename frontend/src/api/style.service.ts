import {Observable} from "../util/observer";

type StyleKeys = "Default" | "Dark" | "Pride"

type StyleOptions = { headerBackground: string, siteBackground: string, fontColor: string, linkFontColor: string, 
                      secondaryBackgroundColor: string };

class StyleService {
    private static readonly LOCAL_STORAGE_KEY = "CURRENT_THEME";
    private options: { [key in StyleKeys]: StyleOptions } = {
        Default: {
            headerBackground: '#26547C',
            siteBackground: '#FFF',
            fontColor: '#000',
            linkFontColor: '',
            secondaryBackgroundColor: ''
        },
        Dark: {
            headerBackground: '#26547C',
            siteBackground: '#2E2E2E',
            fontColor: '#FFF',
            linkFontColor: '#06D6A0',
            secondaryBackgroundColor: '#FFF'
            // secondaryBackgroundColor: '#FFD166'
        },
        Pride: {
            headerBackground: 'linear-gradient(\n' +
                '    #d04b36 0%,\n' +
                '    #d04b36 16.6666%,\n' +
                '    #e36511 16.6666%,\n' +
                '    #e36511 33.333%,\n' +
                '    #ffba00 33.333%,\n' +
                '    #ffba00 50%,\n' +
                '    #00b180 50%,\n' +
                '    #00b180 66.6666%,\n' +
                '    #147aab 66.6666%,\n' +
                '    #147aab 83.3333%,\n' +
                '    #675997 83.3333%,\n' +
                '    #675997 100%\n' +
                '  )',
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

    public observable = new Observable<StyleOptions>()
}



export const styleService = new StyleService();
