import {Observable} from "../util/observer";

type StyleKeys = "Default" | "Pride"

type StyleOptions = { headerBackground: string };

class StyleService {
    private options: { [key in StyleKeys]: StyleOptions } = {
        Default: {
            headerBackground: 'green'
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
                '  );'
        }
    };

    private currentKey: StyleKeys = "Default";

    get currentOption() {
        return this.options[this.currentKey];
    }

    setCurrentKey(currentKey: StyleKeys) {
        this.currentKey = currentKey;
        this.observable.emit(this.currentOption);
    }

    public observable = new Observable<StyleOptions>()
}


export default new StyleService();