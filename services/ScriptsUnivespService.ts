import IScriptUnivesp from '../interfaces/IScriptUnivesp'
import * as $ from 'jquery';

export class ScriptsUnivespService implements IScriptUnivesp {

    browser: Function | string;
    version: number | string;
    OS: Function | string;
    versionSearchString: any;
    dataBrowser: Object[] = [
        {
            string: navigator.userAgent,
            subString: "Chrome",
            identity: "Chrome"
        },
        
        {
            string: navigator.userAgent,
            subString: "OmniWeb",
            versionSearch: "OmniWeb/",
            identity: "OmniWeb"
        }, 
        
        {
            string: navigator.vendor,
            subString: "Apple",
            identity: "Safari",
            versionSearch: "Version"
        },

        {
            prop: (window as any).opera,
            identity: "Opera",
            versionSearch: "Version"
        },
        
        {
            string: navigator.vendor,
            subString: "iCab",
            identity: "iCab"
        },
        
        {
            string: navigator.vendor,
            subString: "KDE",
            identity: "Konqueror"
        },
        
        {   
            string: navigator.userAgent,
            subString: "Firefox",
            identity: "Firefox"
        },
        {
            string: navigator.vendor,
            subString: "Camino",
            identity: "Camino"
        },
        { // for newer Netscapes (6+)
            string: navigator.userAgent,
            subString: "Netscape",
            identity: "Netscape"
        },
        {
            string: navigator.userAgent,
            subString: "MSIE",
            identity: "Explorer",
            versionSearch: "MSIE"
        },
        {
            string: navigator.userAgent,
            subString: "Gecko",
            identity: "Mozilla",
            versionSearch: "rv"
        }, 
        { // for older Netscapes (4-)
            string: navigator.userAgent,
            subString: "Mozilla",
            identity: "Netscape",
            versionSearch: "Mozilla"
        }
    ];

    dataOS: Object[] = [
        {
            string: navigator.platform,
            subString: "Win",
            identity: "Windows"
        },
        {
            string: navigator.platform,
            subString: "Mac",
            identity: "Mac"
        },
        {
            string: navigator.userAgent,
            subString: "iPhone",
            identity: "iPhone/iPod"
        },
        {
            string: navigator.platform,
            subString: "Linux",
            identity: "Linux"
        }
    ];
    
    public init(): void {

        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
        this.OS = this.searchString(this.dataOS) || "an unknown OS";
        
    }

    public searchString(data: any) {

        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1) return data[i].identity;
            } else if (dataProp) return data[i].identity;
        }

    }

    public searchVersion(dataString: any): number {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    }

    public rodarTodas(): void {
        $(document).ready(function(){
            this.init();
            // desbloqueioDesemana();
            // desbloqueiaGabarito();
            // desbloqueiaReferencia();
            // docEstagioCanvas();
            // _ExecuteMostrarGabaritos();
            // _ExecuteDiferenciados();
            // escondeMostraConteudo();
            // addCalendario();
        })
    }
}


let scriptsUnivesp: ScriptsUnivespService = new ScriptsUnivespService();
scriptsUnivesp.rodarTodas();