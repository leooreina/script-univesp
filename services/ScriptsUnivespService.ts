import IScriptUnivesp from '../interfaces/IScriptUnivesp'
import * as $ from 'jquery';

export class ScriptsUnivespService implements IScriptUnivesp {

    /** Verificações gerais: */
    internetExplorer = (BrowserDetect.browser === 'Mozilla');
    temTextArea = (document.getElementsByClassName('textarea').length > 0)
    temInputField = (document.getElementsByClassName('inputfield').length > 0)
    temInputFieldLinha = (document.getElementsByClassName('inputfieldlinha').length > 0)
    temAudio = (document.getElementsByClassName('insertAudio').length > 0)
    temModelo1 = (document.getElementsByClassName('btn-challenge').length > 0)
    temModelo2 = (document.getElementsByClassName('botao-enviar-gabarito1').length > 0);
    temModelo3 = (document.getElementsByClassName('botao-enviar-gabarito1-modelo3').length > 0);
    temModelo4 = (document.getElementsByClassName('draggable-modelo4').length > 0)
    temModelo5 = (document.getElementsByClassName('gridItem-modelo5').length > 0)
    temModelo6 = (document.getElementsByClassName('caixa-checkbox').length > 0)
    temModelo7 = (document.getElementsByClassName('caixa-checkbox-modelo7').length > 0)
    temTranscricaoAudio = (document.getElementsByClassName('transcricao-audio-container').length > 0) || (document.getElementsByClassName('transcricao-audio-container-texto').length > 0)
    temSaberMais = (document.getElementById('botao-saber-mais')) as any;
    temImprimir = (document.getElementById('imprimir')) as any;


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

    public temReact(): boolean {
        return this.temTextArea || this.temInputField || this.temInputFieldLinha || this.temAudio 
    }

    public temDiferenciados(): boolean {
        return this.temModelo1 || this.temModelo4 || 
                this.temModelo6 || this.temModelo7 || 
                this.temTranscricaoAudio || this.temSaberMais || this.temImprimir
    }

    public temMostrarGabarito(): boolean {
        return this.temModelo2 || this.temModelo3
    }

    public verificaPaginaInicialAutomatizada(): boolean {
        let menuSemanas = document.getElementsByClassName('container');
        let classeSemana = document.getElementsByClassName('menu-semanas');
        return menuSemanas.length > 0 && classeSemana.length > 0
    }

    public verificaPaginaInicialAutomatizada4Bimestre(): boolean {
        let menuSemanas = document.getElementsByClassName('container');
        let classeSemana = document.getElementsByClassName('menu-semanas-BIM042019');
        return menuSemanas.length > 0 && classeSemana.length > 0
    }

    public verificaPaginaInicialAutomatizadaMediacao(): boolean {
        let menuSemanas = document.getElementsByClassName('container');
        let classeSemanaMed = document.getElementsByClassName('menu-semanas-med');
        return menuSemanas.length > 0 && classeSemanaMed.length > 0;
    }

    public verificaPaginaInicialAutomatizadaMediacao2020(): boolean {
        let menuSemanas = document.getElementsByClassName('container');
        let classeSemanaMed = document.getElementsByClassName('menu-semanas-medi');
        return menuSemanas.length > 0 && classeSemanaMed.length > 0;
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