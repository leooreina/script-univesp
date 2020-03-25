var BrowserDetect = {
    init: function() {
      this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
      this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
      this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },
    searchString: function(data) {
      for (var i = 0; i < data.length; i++) {
        var dataString = data[i].string;
        var dataProp = data[i].prop;
        this.versionSearchString = data[i].versionSearch || data[i].identity;
        if (dataString) {
          if (dataString.indexOf(data[i].subString) != -1) return data[i].identity;
        } else if (dataProp) return data[i].identity;
      }
    },
    searchVersion: function(dataString) {
      var index = dataString.indexOf(this.versionSearchString);
      if (index == -1) return;
      return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    },
    dataBrowser: [{
      string: navigator.userAgent,
      subString: "Chrome",
      identity: "Chrome"
    }, {
      string: navigator.userAgent,
      subString: "OmniWeb",
      versionSearch: "OmniWeb/",
      identity: "OmniWeb"
    }, {
      string: navigator.vendor,
      subString: "Apple",
      identity: "Safari",
      versionSearch: "Version"
    }, {
      prop: window.opera,
      identity: "Opera",
      versionSearch: "Version"
    }, {
      string: navigator.vendor,
      subString: "iCab",
      identity: "iCab"
    }, {
      string: navigator.vendor,
      subString: "KDE",
      identity: "Konqueror"
    }, {
      string: navigator.userAgent,
      subString: "Firefox",
      identity: "Firefox"
    }, {
      string: navigator.vendor,
      subString: "Camino",
      identity: "Camino"
    }, { // for newer Netscapes (6+)
      string: navigator.userAgent,
      subString: "Netscape",
      identity: "Netscape"
    }, {
      string: navigator.userAgent,
      subString: "MSIE",
      identity: "Explorer",
      versionSearch: "MSIE"
    }, {
      string: navigator.userAgent,
      subString: "Gecko",
      identity: "Mozilla",
      versionSearch: "rv"
    }, { // for older Netscapes (4-)
      string: navigator.userAgent,
      subString: "Mozilla",
      identity: "Netscape",
      versionSearch: "Mozilla"
    }],
    dataOS: [{
      string: navigator.platform,
      subString: "Win",
      identity: "Windows"
    }, {
      string: navigator.platform,
      subString: "Mac",
      identity: "Mac"
    }, {
      string: navigator.userAgent,
      subString: "iPhone",
      identity: "iPhone/iPod"
    }, {
      string: navigator.platform,
      subString: "Linux",
      identity: "Linux"
    }]
  
  };
  
  BrowserDetect.init();
  //Se é o I.E é verdadeiro, se não é falso
  let internetExplorer = (BrowserDetect.browser === 'Mozilla');
  
  let temTextArea = (document.getElementsByClassName('textarea').length > 0)
  let temInputField = (document.getElementsByClassName('inputfield').length > 0)
  let temInputFieldLinha = (document.getElementsByClassName('inputfieldlinha').length > 0)
  let temAudio = (document.getElementsByClassName('insertAudio').length > 0)
  let temModelo1 = (document.getElementsByClassName('btn-challenge').length > 0)
  let temModelo2 = (document.getElementsByClassName('botao-enviar-gabarito1').length > 0);
  let temModelo3 = (document.getElementsByClassName('botao-enviar-gabarito1-modelo3').length > 0);
  let temModelo4 = (document.getElementsByClassName('draggable-modelo4').length > 0)
  let temModelo5 = (document.getElementsByClassName('gridItem-modelo5').length > 0)
  let temModelo6 = (document.getElementsByClassName('caixa-checkbox').length > 0)
  let temModelo7 = (document.getElementsByClassName('caixa-checkbox-modelo7').length > 0)
  let temTranscricaoAudio = (document.getElementsByClassName('transcricao-audio-container').length > 0) || (document.getElementsByClassName('transcricao-audio-container-texto').length > 0)
  // let temSemanasTeste = (document.getElementsByClassName('menu-semanas').length > 0)
  let temSaberMais = (document.getElementById('botao-saber-mais'))
  let temImprimir = (document.getElementById('imprimir'))
  
  
  function temReact() {
    if (temTextArea || temInputField || temInputFieldLinha || temAudio) {
      return true
    } else {
      return false
    }
  }
  
  function temDiferenciados() {
    if (temModelo1 || temModelo4 || temModelo5 || temModelo6 || temModelo7 || temTranscricaoAudio || temSaberMais || temImprimir) {
      return true
    } else {
      return false
    }
  }
  
  function temMostrarGabarito() {
    if (temModelo2 || temModelo3) {
      return true
    } else {
      return false
    }
  }
  
  // ////////////////////////////////////////////////////////////////////////////////////////
  // /////////////////////// FUNÇÃO SERVER TIME /////////////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////
  
  function desbloqueioDesemana(){
  
    if (document.getElementsByClassName('desbloqueio').length > 0) {
  
      var st = srvTime04Bi();
      var date = new Date(st);
      var hor = date.getHours();
      var min = date.getMinutes();
      var sec = date.getSeconds();
      var d = date.getDate();
      var m = (date.getMonth() + 1);
      var y = date.getFullYear();
  
      let meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  
      let semanasDesbloqueio = document.querySelectorAll('.desbloqueio .desabilitada');
      let datas = [];
  
  
      semanasDesbloqueio.forEach(function(argumento) {
        let dia = parseInt(argumento.getElementsByClassName('before')[0].innerHTML.substring(0, 2));
        let mes = meses.indexOf(argumento.getElementsByClassName('before')[0].innerHTML.substring(argumento.getElementsByClassName('before')[0].innerHTML.indexOf('>')+1, 9)) + 1;
        let ano = parseInt(argumento.getElementsByClassName('before')[0].getElementsByTagName('span')[0].innerHTML);
        let data = new Date(mes + '/' + dia + '/' + ano);
        datas.push(data)
        //Desabilita somente as datas que ainda não passaram.
  
        if (ano < y)
          argumento.classList.remove('desabilitada');
        else if (ano == y) {
          if (mes < m)
            argumento.classList.remove('desabilitada');
          else if (mes == m) {
            if (dia <= d) {
              argumento.classList.remove('desabilitada');
            }
          }
        }
      })
  
      //Coloca a classe atual se houver alguma semana desabilitada ainda.
      if (document.getElementsByClassName('desabilitada').length > 0) {
        document.getElementsByClassName('desabilitada')[0].previousSibling.previousSibling.classList.add('atual');
      }
      //Caso não exista nenhuma semana desabilitada, coloca a classe atual na última semana.
      else {
        const dateHTML = datas[datas.length - 1];
        const diffTime = Math.abs(date - dateHTML);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        //Só adiciona a classe atual se a diferença for de menos de 7 dias
        if (diffDays <= 7) {
          let semanasDesbloqueio2 = document.querySelectorAll('.desbloqueio .title');
          semanasDesbloqueio2[semanasDesbloqueio2.length - 1].classList.add('atual');
        }
      }
      jaDesbloqueou = true;
    }
  
  }
  
  // ////////////////////////////////////////////////////////////////////////////////////////
  // /////////////////////// FIM FUNÇÃO SERVER TIME /////////////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////
  
  let urlsJS = [
    'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/core.js',
    'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
    'https://assets.univesp.br/embeds/prism/prism.js',
    'https://assets.univesp.br/embeds/prism/documentacaoEstagio.js'
  ]
  
  let jaAlertou = false;
  if (temMostrarGabarito()) {
    urlsJS.push('https://assets.univesp.br/embeds/prism/mostrarGabarito.js');
  }
  
  if (temReact()) {
    if (internetExplorer && !jaAlertou) {
      alert('Para acessar este recurso, você deve utilizar um navegador mais moderno, como o Chrome ou o Firefox.');
      jaAlertou = true;
    } else {
      urlsJS.push('https://assets.univesp.br/embeds/prism/reactInclude.js');
    }
  }
  
  if (temDiferenciados()) {
    if (internetExplorer && !jaAlertou) {
      alert('Para acessar este recurso, você deve utilizar um navegador mais moderno, como o Chrome ou o Firefox.');
      jaAlertou = true;
    } else {
      urlsJS.push('https://assets.univesp.br/embeds/prism/modelosDiferenciados-v1.0.1.js');
    }
  }
  
  let urlsCSS = [
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.css',
    'https://assets.univesp.br/embeds/prism/prism.css'
  ]
  
  function includeJS(filename, onload) {
    //Pega o head do HTML
    var head = document.getElementsByTagName('head')[0];
    //Cria uma tag script na página.
    var script = document.createElement('script');
    //Atribui ao parâmetro src o filename(parametro da funcao)
    script.src = filename;
    //Atributo "type" do script será javascript.
    script.type = 'text/javascript';
    script.onload = script.onreadystatechange = function() {
      if (script.readyState) {
        if (script.readyState === 'complete' || script.readyState === 'loaded') {
          script.onreadystatechange = null;
          onload();
        }
      } else {
        onload();
      }
    };
    //Appenda a tag script.
    head.appendChild(script);
  }
  
  function includeCSS(filename, onload) {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.href = filename;
    link.rel = 'stylesheet';
    link.onload = link.onreadystatechange = function() {
      if (link.readyState) {
        if (link.readyState === 'complete' || link.readyState === 'loaded') {
          link.onreadystatechange = null;
          onload();
        }
      } else {
        onload();
      }
    };
    head.appendChild(link);
  }
  
  for (var i = 0; i < urlsCSS.length; i++) {
    includeCSS(urlsCSS[i], function() {
    })
  }
  
  const verificaPaginaInicialAutomatizada = function() {
    let menuSemanas = document.getElementsByClassName('container');
    let classeSemana = document.getElementsByClassName('menu-semanas');
    if (menuSemanas.length > 0 && classeSemana.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  
  const verificaPaginaInicialAutomatizada4Bimestre = function() {
    let menuSemanas = document.getElementsByClassName('container');
    let classeSemana = document.getElementsByClassName('menu-semanas-BIM042019');
    if (menuSemanas.length > 0 && classeSemana.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  
  const verificaPaginaInicialAutomatizadaMediacao = function() {
    let menuSemanas = document.getElementsByClassName('container');
    let classeSemanaMed = document.getElementsByClassName('menu-semanas-med');
    if (menuSemanas.length > 0 && classeSemanaMed.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  
  const verificaPaginaInicialAutomatizadaMediacao2020 = function() {
    let menuSemanas = document.getElementsByClassName('container');
    let classeSemanaMed = document.getElementsByClassName('menu-semanas-medi');
    if (menuSemanas.length > 0 && classeSemanaMed.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  
  // for (var i = 0; i < urlsJS.length; i++) {
  //   includeJS(urlsJS[i], function() {
  //     $(document).ready(function() {
  //
  //       if (verificaPaginaInicialAutomatizada()) {
  // //
  // //         // var st = srvTime04Bi();
  // //         // var date = new Date(st);
  // //         // var hor = date.getHours();
  // //         // var min = date.getMinutes();
  // //         // var sec = date.getSeconds();
  // //         // var d = date.getDate();
  // //         // var m = (date.getMonth() + 1);
  // //         // var y = date.getFullYear();
  // //
  // //
  // //
  // //
  // //  ///\/\/\/\/\/\/\/\/\/\/\\\\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
  // //
  // //  ///\/\/\/\/\/\/\/\/\/\/\\\\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
  // //  ///\/\/\/\/\/\/\/\/\/\/\\\\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
  // //
  // //  ///\/\/\/\/\/\/\/\/\/\/\\\\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\////\/\/\/\/\/\/\/\/\/\/\\\\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
  // //
  //       // Função para copiar
  //       const copyToClipboard = function(str) {
  //         let el = document.createElement('textarea'); // cria um textarea na pagina
  //         el.value = str; // atribui a ele a valor da variavel str passada
  //         document.body.appendChild(el); // coloca ele no body
  //         el.select(); // da um select no conteudo dele
  //         document.execCommand('copy'); // copiar o conteudo
  //         el.style.display = "none"; // da um display none no elemento
  //       }
  //
  //       $('#copy1').on('click', function() { // No clique do botao copy1...
  //         let code1 = $('#code1'); // atribui a variavel code1 a ele
  //         copyToClipboard(code1.html()) // da um copy no code1
  //       })
  //       $('#copy2').on('click', function() {
  //         let code2 = $('#code2');
  //         copyToClipboard(code2.html())
  //       })
  //       $('#copy3').on('click', function() {
  //         let code3 = $('#code3');
  //         copyToClipboard(code3.html())
  //       })
  //       $('#copy4').on('click', function() {
  //         let code4 = $('#code4');
  //         copyToClipboard(code4.html())
  //       })
  //       $('#copy5').on('click', function() {
  //         let code5 = $('#code5');
  //         copyToClipboard(code5.html())
  //       })
  //       $('#copy6').on('click', function() {
  //         let code6 = $('#code6');
  //         copyToClipboard(code6.html())
  //       })
  //
  
  //     )
  //   })
  // }
  
  // ////////////////////////////////////////////////////////////////////////////////////////
  // ////////////////// FUNÇÃO MOSTRA/ESCONDE ELEMENTOS ////////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////
  
  function escondeMostraConteudo() {
    $( ".mostrar-conteudo" ).on( "mouseover", function() {
      $( this ).css( "cursor", "pointer" );
    });
  
    $('.mostrar-conteudo').click(function() {
      $('.conteudo-mostra-esconde').toggle()
    })
  };
  
  // ////////////////////////////////////////////////////////////////////////////////////////
  // ////////////////// FIM FUNÇÃO MOSTRA/ESCONDE ELEMENTOS ///////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////
  
  
  
  
  
  // ////////////////////////////////////////////////////////////////////////////////////////
  // /////////////////////////// FUNÇÃO SLIDER /////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////
  
  function showNextItem(slider, itemActive, itemCount) {
    let next;
    if (itemActive < itemCount) {
      next = itemActive + 1;
    } else {
      next = 1;
    }
    slider.children("div:nth-child(" + next + ")").addClass("active");
  };
  
  function showPrevItem(slider, itemActive, itemCount) {
    let prev;
    if (itemActive !== 1) {
      prev = itemActive - 1;
    } else {
      prev = itemCount;
    }
    slider.children("div:nth-child(" + prev + ")").addClass("active");
  };
  
  $(".slider-nav i").unbind("click").click(function() {
    let slider = $(this).parent(".slider-nav").prev(".slider");
    let itemActive = slider.children(".active").index() + 1;
    let itemCount = slider.children("div").length;
  
    if ($(this).hasClass("next")) {
      showNextItem(slider, itemActive, itemCount);
    } else if ($(this).hasClass("previous")) {
      showPrevItem(slider, itemActive, itemCount);
    }
  
    slider.children("div:nth-child(" + itemActive + ")").removeClass("active");
  });
  
  // const _ExecuteSlider = function() {
  //   showNextItem(slider, itemActive, itemCount);
  //   showPrevItem(slider, itemActive, itemCount);
  // }
  
  // ////////////////////////////////////////////////////////////////////////////////////////
  // /////////////////////// FIM FUNÇÃO SLIDER //////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////
  
  
  
  
  
  // ////////////////////////////////////////////////////////////////////////////////////////
  // ///////////////////////// FUNÇÕES REACT /////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////
  
  let urlsReact = [
    'https://unpkg.com/react@16/umd/react.development.js',
    'https://unpkg.com/react-dom@16/umd/react-dom.development.js'
  ]
  
  function includeJS(filename, onload) {
    //Pega o head do HTML
    var head = document.getElementsByTagName('head')[0];
    //Cria uma tag script na página.
    var script = document.createElement('script');
    //Atribui ao parâmetro src o filename(parametro da funcao)
    script.src = filename;
    //Atributo "type" do script será javascript.
    script.type = 'text/javascript';
    script.onload = script.onreadystatechange = function() {
      if (script.readyState) {
        if (script.readyState === 'complete' || script.readyState === 'loaded') {
          script.onreadystatechange = null;
          onload();
        }
      } else {
        onload();
      }
    };
    //Appenda a tag script.
    head.appendChild(script);
  }
  
  const _AddingInput = function() {
    class InputField extends React.Component {
      render() {
        return React.createElement("input", {
          className: 'form-cx-curta',
          type: 'text',
          placeholder: 'Escreva aqui...'
        })
      }
    }
    let inputs = document.getElementsByClassName('inputfield');
    for (input of inputs) {
      ReactDOM.render(React.createElement(InputField), input)
    }
  }
  
  const _AddingInputTwo = function() {
    class InputFieldMenor extends React.Component {
      render() {
        return React.createElement("input", {
          className: 'form-cx-curta2',
          type: 'text',
          placeholder: 'Escreva aqui...'
        })
      }
    }
    let inputs2 = document.getElementsByClassName('inputfieldlinha');
    for (input of inputs2) {
      ReactDOM.render(React.createElement(InputFieldMenor), input)
    }
  }
  
  const _AddingTextArea = function() {
    class TextArea extends React.Component {
      render() {
        return React.createElement("textarea", {
          className: "form-cx-curta",
          rows: "10",
          cols: "70",
          placeholder: "Digite sua resposta..."
        })
      }
    }
    let textarea = document.getElementsByClassName('textarea');
    for (text of textarea) {
      ReactDOM.render(React.createElement(TextArea), text)
    }
  }
  
  const _AddingAudioTag = function(audio) {
    class Audio extends React.Component {
      render() {
        return (
          React.createElement(
            "div", {
              className: 'div-audio'
            },
            React.createElement('i', {
              className: 'fas fa-download'
            }),
            React.createElement('audio', {
              controls: 'controls',
              src: audio.href
            })
          )
        )
      }
    }
    ReactDOM.render(React.createElement(Audio), audio)
  }
  
  for (var i = 0; i < urlsReact.length; i++) {
    includeJS(urlsReact[i], function() {
      _AddingInput();
    })
  }
  
  for (var i = 0; i < urlsReact.length; i++) {
    includeJS(urlsReact[i], function() {
      _AddingInputTwo();
    })
  }
  
  for (var i = 0; i < urlsReact.length; i++) {
    includeJS(urlsReact[i], function() {
      _AddingTextArea()
    })
  }
  
  for (var i = 0; i < urlsReact.length; i++) {
    includeJS(urlsReact[i], function() {
      let audios = document.getElementsByClassName('insertAudio')
      for (var i = 0; i < audios.length; i++) {
        _AddingAudioTag(audios[i])
      }
    })
  }
  
  // ////////////////////////////////////////////////////////////////////////////////////////
  // /////////////////////////// FIM FUNÇÕES REACT //////////////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////
  
  
  
  
  
  // ////////////////////////////////////////////////////////////////////////////////////////
  // ///////////////////// FUNÇÃO BOTÃO MOSTRAR GABARITO //////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////
  
  function _Modelo2() {
    $('.botao-enviar-gabarito1').click(function() {
      $('.collapse-cx-curta1').slideToggle('slow');
      $(this).text(function(i, old) {
        return old == 'Mostrar Gabarito' ? 'Esconder Gabarito' : 'Mostrar Gabarito';
      });
    });
    $('.botao-enviar-gabarito2').click(function() {
      $('.collapse-cx-curta2').slideToggle('slow');
      $(this).text(function(i, old) {
        return old == 'Mostrar Gabarito' ? 'Esconder Gabarito' : 'Mostrar Gabarito';
      });
    });
    $('.botao-enviar-gabarito3').click(function() {
      $('.collapse-cx-curta3').slideToggle('slow');
      $(this).text(function(i, old) {
        return old == 'Mostrar Gabarito' ? 'Esconder Gabarito' : 'Mostrar Gabarito';
      });
    });
    $('.botao-enviar-gabarito4').click(function() {
      $('.collapse-cx-curta4').slideToggle('slow');
      $(this).text(function(i, old) {
        return old == 'Mostrar Gabarito' ? 'Esconder Gabarito' : 'Mostrar Gabarito';
      });
    });
    $('.botao-enviar-gabarito5').click(function() {
      $('.collapse-cx-curta5').slideToggle('slow');
      $(this).text(function(i, old) {
        return old == 'Mostrar Gabarito' ? 'Esconder Gabarito' : 'Mostrar Gabarito';
      });
    });
    $('.botao-enviar-gabarito6').click(function() {
      $('.collapse-cx-curta6').slideToggle('slow');
      $(this).text(function(i, old) {
        return old == 'Mostrar Gabarito' ? 'Esconder Gabarito' : 'Mostrar Gabarito';
      });
    });
    $('.botao-enviar-gabarito7').click(function() {
      $('.collapse-cx-curta7').slideToggle('slow');
      $(this).text(function(i, old) {
        return old == 'Mostrar Gabarito' ? 'Esconder Gabarito' : 'Mostrar Gabarito';
      });
    });
    $('.botao-enviar-gabarito8').click(function() {
      $('.collapse-cx-curta8').slideToggle('slow');
      $(this).text(function(i, old) {
        return old == 'Mostrar Gabarito' ? 'Esconder Gabarito' : 'Mostrar Gabarito';
      });
    });
    $('.botao-enviar-gabarito9').click(function() {
      $('.collapse-cx-curta9').slideToggle('slow');
      $(this).text(function(i, old) {
        return old == 'Mostrar Gabarito' ? 'Esconder Gabarito' : 'Mostrar Gabarito';
      });
    });
    $('.botao-enviar-gabarito10').click(function() {
      $('.collapse-cx-curta10').slideToggle('slow');
      $(this).text(function(i, old) {
        return old == 'Mostrar Gabarito' ? 'Esconder Gabarito' : 'Mostrar Gabarito';
      });
    });
  
  };
  
  function _Modelo3() {
    // $(".btn-modelo3").click(function() {
    //     $(".collapse-modelo3").slideToggle();
    //     $(this).text(function(i, old) {
    //         return old == 'Mostrar Gabarito' ? 'Esconder Gabarito' : 'Mostrar Gabarito';
    //     });
    // });
    $('.botao-enviar-gabarito1-modelo3').click(function() {
      $('.collapse-cx-longa1').slideToggle('slow');
      $(this).text(function(i, old) {
        return old == 'Mostrar Gabarito' ? 'Esconder Gabarito' : 'Mostrar Gabarito';
      });
    });
    $('.botao-enviar-gabarito2-modelo3').click(function() {
      $('.collapse-cx-longa2').slideToggle('slow');
      $(this).text(function(i, old) {
        return old == 'Mostrar Gabarito' ? 'Esconder Gabarito' : 'Mostrar Gabarito';
      });
    });
    $('.botao-enviar-gabarito3-modelo3').click(function() {
      $('.collapse-cx-longa3').slideToggle('slow');
      $(this).text(function(i, old) {
        return old == 'Mostrar Gabarito' ? 'Esconder Gabarito' : 'Mostrar Gabarito';
      });
    });
    $('.botao-enviar-gabarito4-modelo3').click(function() {
      $('.collapse-cx-longa4').slideToggle('slow');
      $(this).text(function(i, old) {
        return old == 'Mostrar Gabarito' ? 'Esconder Gabarito' : 'Mostrar Gabarito';
      });
    });
    $('.botao-enviar-gabarito5-modelo3').click(function() {
      $('.collapse-cx-longa5').slideToggle('slow');
      $(this).text(function(i, old) {
        return old == 'Mostrar Gabarito' ? 'Esconder Gabarito' : 'Mostrar Gabarito';
      });
    });
    $('.botao-enviar-gabarito6-modelo3').click(function() {
      $('.collapse-cx-longa6').slideToggle('slow');
      $(this).text(function(i, old) {
        return old == 'Mostrar Gabarito' ? 'Esconder Gabarito' : 'Mostrar Gabarito';
      });
    });
    $('.botao-enviar-gabarito7-modelo3').click(function() {
      $('.collapse-cx-longa7').slideToggle('slow');
      $(this).text(function(i, old) {
        return old == 'Mostrar Gabarito' ? 'Esconder Gabarito' : 'Mostrar Gabarito';
      });
    });
    $('.botao-enviar-gabarito8-modelo3').click(function() {
      $('.collapse-cx-longa8').slideToggle('slow');
      $(this).text(function(i, old) {
        return old == 'Mostrar Gabarito' ? 'Esconder Gabarito' : 'Mostrar Gabarito';
      });
    });
    $('.botao-enviar-gabarito9-modelo3').click(function() {
      $('.collapse-cx-longa9').slideToggle('slow');
      $(this).text(function(i, old) {
        return old == 'Mostrar Gabarito' ? 'Esconder Gabarito' : 'Mostrar Gabarito';
      });
    });
    $('.botao-enviar-gabarito10-modelo3').click(function() {
      $('.collapse-cx-longa10').slideToggle('slow');
      $(this).text(function(i, old) {
        return old == 'Mostrar Gabarito' ? 'Esconder Gabarito' : 'Mostrar Gabarito';
      });
    });
  }
  
  const _ExecuteMostrarGabaritos = function() {
    _Modelo2();
    _Modelo3();
  }
  
  // ////////////////////////////////////////////////////////////////////////////////////////
  // ////////////////// FIM FUNÇÃO BOTÃO MOSTRAR GABARITO /////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////
  
  
  
  
  
  // ////////////////////////////////////////////////////////////////////////////////////////
  // //////////////////  FUNÇÕES EXERCÍCIOS DIFERENCIADOS ///////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////
  
  
  function _Modelo1() {
    // Modelo 1
    var maxErros = 2;
    var chances = [];
  
    $('.btn-challenge').click(function() {
  
      var position, questionPos, stringToInt, verifica;
  
      if ($(this).hasClass('certa')) {
        $(this).css('color', 'green');
        $(this).css('border', 'solid 2px green');
        $(this).parent(".alternativas").find(".feedback div:first-child").text("Certo!");
        $(this).siblings().prop('disabled', true);
      } else {
        $(this).css('color', 'red');
        $(this).css('border', 'solid 2px red');
        $(this).parent(".alternativas").find(".feedback div:first-child").text("Foi quase!");
  
        position = this.id;
        questionPos = position[0];
        stringToInt = parseInt(questionPos);
        chances.push(stringToInt);
        verifica = listaCheck(stringToInt, chances);
        if (verifica == maxErros) {
          $(this).siblings().prop('disabled', true);
          $(this).siblings('.certa').css('color', 'green');
          $(this).siblings('.certa').css('border', 'solid 2px green');
        }
      }
    });
  
    const listaCheck = function checkArray(num, lista) {
      let contaNum = 0;
      for (var j = 0; j < lista.length; j++) {
        if (lista[j] == num) {
          contaNum++;
        }
      }
      return contaNum;
    }
  }
  
  
  function _Modelo4() {
    let draggables = $('.draggable-modelo4');
    let droppables = $('.dropabble-modelo4');
    let respostas = $('.resposta-certa');
    let imagem_certa = "url('https://assets.univesp.br/canvas/img/certo.png')";
    let imagem_errada = "url('https://assets.univesp.br/canvas/img/errado.png')";
  
    (function() {
      $('#btn-enviar-modelo4').on('click', function() {
        if ($('.dropada').length === $(droppables).length) {
          checkAll();
          $('#btn-gabarito-modelo4').on('click', function() {
            setGabarito();
          })
        } else {
          alerta();
        }
      })
      $('#btn-refazer-modelo4').on('click', function() {
        location.reload(false);
      })
    })();
  
    (function() {
      draggables.each(function() {
        $(this).draggable({
          revert: function(event) {
            $(this).data("uiDraggable").originalPosition = {
              top: 0,
              left: 0,
              color: 'black',
              backgroundColor: '#DEE5E8'
            };
            return !event;
          },
          revertDuration: 650,
        })
      })
    })();
  
    (function() {
      droppables.each(function() {
        $(this).droppable({
          tolerance: 'intersect',
          out: function(event, ui) {
            $(this).css('border', '3px dashed #61788A');
            if ($(this).hasClass('dropada')) {
              $(this).removeClass('dropada');
            }
          },
          drop: function(event, ui) {
            $(ui.draggable).css('background', '#61788a');
            $(ui.draggable).css('color', '#70dbed');
            $(ui.draggable).css('paddingLeft', 'auto');
            $(ui.draggable).css('paddingRight', 'auto');
            $(ui.draggable).position({
              of: $(this),
              my: 'left center',
              at: 'left center'
            })
            $(this).html($(ui.draggable).html());
            $(this).addClass('dropada');
            $(this).css('color', 'transparent');
            $(this).css('border', '2px solid transparent');
            $(this).css('user-select', 'none');
          }
        })
      })
    })();
  
    function checkAll() {
      for (var i = 0; i < droppables.length; i++) {
        if ($(droppables[i]).html() === $(respostas[i]).html()) {
          $(draggables[i]).css('border', '2px solid green');
          $(draggables[i]).css('background', '#f7f7f7');
          $(draggables[i]).css('color', '#354451');
          $(draggables[i]).css('backgroundImage', imagem_certa);
          $(draggables[i]).css('backgroundRepeat', 'no-repeat');
          $(droppables[i]).addClass('changingBorder');
          $(draggables[i]).draggable("destroy");
  
        } else {
          $(draggables[i]).css('border', '2px solid red');
          $(draggables[i]).css('background', '#f7f7f7');
          $(draggables[i]).css('color', '#354451');
          $(draggables[i]).css('backgroundImage', imagem_errada);
          $(draggables[i]).css('backgroundRepeat', 'no-repeat');
          $(droppables[i]).addClass('changingBorder');
          $(draggables[i]).draggable("destroy");
        }
      }
    }
  
    function setGabarito() {
      for (var i = 0; i < draggables.length; i++) {
        $(respostas).css('border', '2px solid #70dbed');
        $(respostas).css('backgroundImage', 'none');
        $(respostas).css('background', '#f7f7f7');
        $(respostas).css('color', '#14aadb');
        $(respostas).css('font-weight', 'bold');
        $(respostas).css('margin-left', '-116%');
        $(respostas).addClass('draggable-modelo4');
        $(draggables[i]).replaceWith(
          $(respostas[i])
        );
      }
    }
  
    function alerta() {
      $('#alerta-modelo4').show();
      $('#alerta-modelo4').css('textAlign', 'center');
      $('#alerta-modelo4').css('marginLeft', '150px');
      $('#alerta-modelo4').css('width', '350px');
      $('#botaoOk-modelo4').on('click', function() {
        $('#alerta-modelo4').hide();
      })
    }
  }
  
  function _Modelo5() {
    let imagem_certa = "url('https://assets.univesp.br/canvas/img/certo.png')";
    let imagem_errada = "url('https://assets.univesp.br/canvas/img/errado.png')";
    let sizeBoxes = document.getElementsByClassName('gridItem-modelo5').length;
    let boxes = document.getElementsByClassName('gridItem-modelo5');
    let totalCliques = 0;
    let totalSelecionadas;
    let cliques = [];
    let element;
    let verificadas = false;
  
    (function setSelecionadas() {
      if (sizeBoxes === 14) {
        totalSelecionadas = 7;
      }
      if (sizeBoxes === 12) {
        totalSelecionadas = 5;
      }
      if (sizeBoxes === 9) {
        totalSelecionadas = 4;
      }
      if (sizeBoxes === 6) {
        totalSelecionadas = 3;
      }
      pushCliques();
      checkTodas();
    })();
  
    function checkSelecionadas() {
      let alternativasSelecionadas = 0;
      for (var i = 0; i < boxes.length; i++) {
        if ($(boxes[i]).hasClass('selecionada')) {
          alternativasSelecionadas += 1;
        }
      }
      if (alternativasSelecionadas <= 0) {
        alerta();
      }
      if (alternativasSelecionadas > totalSelecionadas) {
        verificadas = true;
        alert('Por favor, selecione até '+ totalSelecionadas + ' alternativas.');
      }
      if (alternativasSelecionadas <= totalSelecionadas) {
        checkCertas();
      }
    }
  
    function restart() {
      location.reload(false);
    }
  
    function pushCliques() {
      for (var i = 0; i < sizeBoxes; i++) {
        cliques.push(0);
      }
    }
  
    function checkClick(checkNumber) {
      $(boxes[checkNumber]).on('click', function() {
        element = $(boxes[checkNumber]);
        cliqueOn(element);
        if (cliques[checkNumber] % 2 !== 0) {
          cliqueOff(element);
        }
        cliques[checkNumber]++;
      })
    }
  
    function checkTodas() {
      for (var i = 0; i < sizeBoxes; i++) {
        checkClick(i);
      }
    }
  
    function cliqueOn(elClicado) {
      $(elClicado).css('background', '#FFE370');
      $(elClicado).addClass('selecionada');
    }
  
    function cliqueOff(elClicado) {
      $(elClicado).css('background', '#DEE5E8');
      if ($(elClicado).hasClass('selecionada')) {
        $(elClicado).removeClass('selecionada');
      }
    }
  
    // verifica se o total de selecionadas é menor que totalSelecionadas.
  
    (function botaoEnviar() {
      $('#btn-enviar-model5').on('click', function() {
        checkSelecionadas();
        if (verificadas === false) {
          checkCertas();
        }
      })
    })();
  
    (function botaoRestart() {
      $('#btn-recomecar-model5  ').on('click', function() {
        restart();
      })
    })();
  
    function checkCertas() {
      for (var i = 1; i < sizeBoxes + 1; i++) {
        let boxChar = '#box' + i;
        if ($(boxChar).hasClass('certa') && $(boxChar).hasClass('selecionada')) {
          let elemento = $(boxChar);
          elemento.css('border', '2px solid #9ecc63');
          elemento.css('background', '#f4fafc');
          elemento.css('backgroundImage', imagem_certa);
          elemento.css('backgroundRepeat', 'no-repeat');
        } else {
          if ($(boxChar).hasClass('selecionada')) {
            $(boxChar).css('border', '2px solid red');
            $(boxChar).css('background', '#f4fafc');
            $(boxChar).css('backgroundImage', imagem_errada);
            $(boxChar).css('backgroundRepeat', 'no-repeat');
          } else {
            $(boxChar).css('border', '2px solid transparent');
          }
        }
      }
    }
  
    function alerta() {
      $('#alerta-modelo5').show();
      $('#alerta-modelo5').css('textAlign', 'center');
      $('#alerta-modelo5').css('marginLeft', '150px');
      $('#alerta-modelo5').css('width', '350px');
      $('#botaoOk-modelo5').on('click', function() {
        $('#alerta-modelo5').hide();
      })
    }
  
  }
  
  function _Modelo6() {
    let imagem_certa = "url('https://assets.univesp.br/canvas/img/check.svg')";
    let imagem_errada = "url('https://assets.univesp.br/canvas/img/errado_icone.svg')";
    let numQuestoes = document.getElementsByClassName('caixa-checkbox').length;
    let questoes = document.getElementsByClassName('caixa-checkbox');
    let cliques = [];
    let element;
  
    (function() {
      pushCliques();
      checkTodas();
      $('#btn-enviar-modelo6').on('click', function() {
        showAlerta();
        checkCertas();
        $('#btn-gabarito-modelo6').on('click', function() {
          gabarito();
        })
        $('#btn-refazer-modelo6').on('click', function() {
          restart();
        })
      })
    })();
  
    function pushCliques() {
      for (var i = 0; i < numQuestoes; i++) {
        cliques.push(0);
      }
    }
  
    function checkClick(checkNumber) {
      $(questoes[checkNumber]).on('click', function() {
        element = $(questoes[checkNumber]);
        cliqueOn(element);
        if (cliques[checkNumber] % 2 !== 0) {
          cliqueOff(element);
        }
        cliques[checkNumber]++;
      })
    }
  
    function checkTodas() {
      for (var i = 0; i < numQuestoes; i++) {
        checkClick(i);
      }
    }
  
    // #007BFF
  
    function cliqueOn(elClicado) {
      $(elClicado).css('background', '#354451');
      $(elClicado).css('backgroundImage', imagem_certa);
      $(elClicado).css('backgroundRepeat', 'no-repeat');
      $(elClicado).css('background-position', '-0.3px 2px');
    }
  
    function cliqueOff(elClicado) {
      $(elClicado).css('background', '#e0e0e0');
    }
  
    function showAlerta() {
      let questoesDesmarcadas = 0;
  
      for (var i = 0; i < cliques.length; i++) {
        if (cliques[i] % 2 === 0) {
          questoesDesmarcadas += 1;
        }
      }
  
      if (questoesDesmarcadas === numQuestoes) {
        alerta();
      }
    }
  
    function alerta() {
      $('#alerta-modelo6').show();
      $('#alerta-modelo6').css('textAlign', 'center');
      $('#alerta-modelo6').css('marginLeft', '150px');
      $('#alerta-modelo6').css('width', '350px');
      $('#botaoOk-modelo6').on('click', function() {
        $('#alerta-modelo6').hide();
      })
    }
  
    function restart() {
      location.reload(false);
    }
  
    function checkCertas() {
      for (var i = 0; i < numQuestoes; i++) {
        if (cliques[i] % 2 !== 0) {
          let checkboxChar = '#checkbox'+ (i + 1);
          let alternativaChar = '#alternativa'+ (i + 1);
          if ($(checkboxChar).hasClass('certa')) {
            $(checkboxChar).css('background', '#9ecc63');
            $(checkboxChar).css('backgroundImage', imagem_certa);
            $(checkboxChar).css('backgroundRepeat', 'no-repeat');
            $(checkboxChar).css('background-position', '-0.3px 2px');
            $(alternativaChar).css('color', '#9ecc63');
          } else {
            $(checkboxChar).css('background', '#ed3a47');
            $(checkboxChar).css('backgroundImage', imagem_errada);
            $(checkboxChar).css('backgroundRepeat', 'no-repeat');
            $(checkboxChar).css('background-position', '-0.3px 2px');
            $(alternativaChar).css('color', 'red');
          }
        }
      }
    }
  
    function gabarito() {
      for (var i = 0; i < numQuestoes; i++) {
        let checkboxChar = '#checkbox'+ (i + 1);
        let alternativaChar = '#alternativa'+ (i + 1);
        if ($(checkboxChar).hasClass('certa')) {
          $(checkboxChar).css('background', '#9ecc63');
          $(checkboxChar).css('backgroundImage', imagem_certa);
          $(checkboxChar).css('backgroundRepeat', 'no-repeat');
          $(checkboxChar).css('background-position', '-0.3px 2px');
          $(alternativaChar).css('color', '#9ecc63');
        } else {
          $(checkboxChar).css('background', '#ed3a47');
          $(checkboxChar).css('backgroundImage', imagem_errada);
          $(checkboxChar).css('backgroundRepeat', 'no-repeat');
          $(checkboxChar).css('background-position', '-0.3px 2px');
          $(alternativaChar).css('color', 'red');
        }
      }
    }
  }
  
  function _Modelo6Espanhol() {
    let imagem_certa = "url('https://assets.univesp.br/canvas/img/check.svg')";
    let imagem_errada = "url('https://assets.univesp.br/canvas/img/errado_icone.svg')";
    let numQuestoes = document.getElementsByClassName('caixa-checkbox').length;
    let questoes = document.getElementsByClassName('caixa-checkbox');
    let cliques = [];
    let element;
  
    (function() {
      pushCliques();
      checkTodas();
      $('#btn-enviar-modelo6').on('click', function() {
        showAlerta();
        checkCertas();
        $('#btn-gabarito-modelo6').on('click', function() {
          gabarito();
        })
        $('#btn-refazer-modelo6').on('click', function() {
          restart();
        })
      })
    })();
  
    function pushCliques() {
      for (var i = 0; i < numQuestoes; i++) {
        cliques.push(0);
      }
    }
  
    function checkClick(checkNumber) {
      $(questoes[checkNumber]).on('click', function() {
        element = $(questoes[checkNumber]);
        cliqueOn(element);
        if (cliques[checkNumber] % 2 !== 0) {
          cliqueOff(element);
        }
        cliques[checkNumber]++;
      })
    }
  
    function checkTodas() {
      for (var i = 0; i < numQuestoes; i++) {
        checkClick(i);
      }
    }
  
    // #007BFF
  
    function cliqueOn(elClicado) {
      $(elClicado).css('background', '#354451');
      $(elClicado).css('backgroundImage', imagem_certa);
      $(elClicado).css('backgroundRepeat', 'no-repeat');
      $(elClicado).css('background-position', '-0.3px 2px');
    }
  
    function cliqueOff(elClicado) {
      $(elClicado).css('background', '#e0e0e0');
    }
  
    function showAlerta() {
      let questoesDesmarcadas = 0;
  
      for (var i = 0; i < cliques.length; i++) {
        if (cliques[i] % 2 === 0) {
          questoesDesmarcadas += 1;
        }
      }
  
      if (questoesDesmarcadas === numQuestoes) {
        alerta();
      }
    }
  
    function alerta() {
      $('#alerta-modelo6').show();
      $('#alerta-modelo6').css('textAlign', 'center');
      $('#alerta-modelo6').css('marginLeft', '150px');
      $('#alerta-modelo6').css('width', '350px');
      $('#botaoOk-modelo6').on('click', function() {
        $('#alerta-modelo6').hide();
      })
    }
  
    function restart() {
      location.reload(false);
    }
  
    function checkCertas() {
      for (var i = 0; i < numQuestoes; i++) {
        if (cliques[i] % 2 !== 0) {
          let checkboxChar = '#checkbox'+ (i + 1);
          let alternativaChar = '#alternativa'+ (i + 1);
          if ($(checkboxChar).hasClass('certaModelo6')) {
            $(checkboxChar).css('background', '#9ecc63');
            $(checkboxChar).css('backgroundImage', imagem_certa);
            $(checkboxChar).css('backgroundRepeat', 'no-repeat');
            $(checkboxChar).css('background-position', '-0.3px 2px');
            $(alternativaChar).css('color', '#9ecc63');
          } else {
            $(checkboxChar).css('background', '#ed3a47');
            $(checkboxChar).css('backgroundImage', imagem_errada);
            $(checkboxChar).css('backgroundRepeat', 'no-repeat');
            $(checkboxChar).css('background-position', '-0.3px 2px');
            $(alternativaChar).css('color', 'red');
          }
        }
      }
    }
  
    function gabarito() {
      for (var i = 0; i < numQuestoes; i++) {
        let checkboxChar = '#checkbox'+ (i + 1);
        let alternativaChar = '#alternativa'+ (i + 1);
        if ($(checkboxChar).hasClass('certaModelo6')) {
          $(checkboxChar).css('background', '#9ecc63');
          $(checkboxChar).css('backgroundImage', imagem_certa);
          $(checkboxChar).css('backgroundRepeat', 'no-repeat');
          $(checkboxChar).css('background-position', '-0.3px 2px');
          $(alternativaChar).css('color', '#9ecc63');
        } else {
          $(checkboxChar).css('background', '#ed3a47');
          $(checkboxChar).css('backgroundImage', imagem_errada);
          $(checkboxChar).css('backgroundRepeat', 'no-repeat');
          $(checkboxChar).css('background-position', '-0.3px 2px');
          $(alternativaChar).css('color', 'red');
        }
      }
    }
  }
  
  function _Modelo7() {
    let numQuestoes = document.getElementsByClassName('caixa-checkbox-modelo7').length;
    let numSecoes = document.getElementsByClassName('gridContainer1-modelo7').length;
    let questoes = document.getElementsByClassName('caixa-checkbox-modelo7');
    let cliques = [];
    let element;
  
    (function() {
      pushCliques();
      checkTodas();
      $('#btn-enviar-modelo7').on('click', function() {
        if ($('.selecionada').length < numSecoes) {
          alerta();
        } else {
          checkCertas();
        }
      })
      $('#btn-refazer-modelo7').on("click", function() {
        restart();
      })
    })();
  
    function pushCliques() {
      for (var i = 0; i < numQuestoes; i++) {
        cliques.push(0);
      }
    }
  
    function checkClick(checkNumber) {
      $(questoes[checkNumber]).on('click', function() {
        element = $(questoes[checkNumber]);
        cliqueOn(element);
        cliqueOff(element.siblings());
        takeOffGrey();
        cliques[checkNumber]++;
      })
    }
  
    function checkTodas() {
      for (var i = 0; i < numQuestoes; i++) {
        checkClick(i);
      }
    }
  
    function cliqueOn(elClicado) {
      $(elClicado).css('background', 'white');
      $(elClicado).css('boxShadow', 'inset 0px 0px 0px 7px #007bff');
      $(elClicado).addClass('selecionada');
    }
  
    function cliqueOff(elClicado) {
      $(elClicado).css('background', '#e0e0e0');
      $(elClicado).css('boxShadow', 'inset 0px 0px 0px 7px #e0e0e0');
      if ($(elClicado).hasClass('selecionada')) {
        $(elClicado).removeClass('selecionada');
      }
    }
  
    function checkCertas() {
      for (var i=0; i < questoes.length; i++) {
        if ($(questoes[i]).hasClass('certa') && $(questoes[i]).hasClass('selecionada')) {
          $(questoes[i]).css('background', 'white');
          $(questoes[i]).css('boxShadow', 'inset 0px 0px 0px 7px #9ecc63');
          $(questoes[i]).next().css('color', '#9ecc63');
          $(questoes[i]).next().html($(questoes[i]).next().html() + "<span style='font-size: 17px; color: #009e49;'><strong> ✓</strong></span>");
        } else {
          if ($(questoes[i]).hasClass('selecionada')) {
            let questaoCerta = $('.certa');
            $(questaoCerta).css('background', 'white');
            $(questaoCerta).css('boxShadow', 'inset 0px 0px 0px 7px #9ecc63');
            $(questaoCerta).next().css('color', '#9ecc63');
  
            $(questoes[i]).css('background', 'white');
            $(questoes[i]).css('boxShadow', 'inset 0px 0px 0px 7px #ed3a47');
            $(questoes[i]).next().css('color', '#ed3a47');
            $(questoes[i]).next().html($(questoes[i]).next().html() + "<strong> X</strong>");
          }
        }
      }
    }
  
    function takeOffGrey() {
      $('.alternativa-checkbox-modelo7').css('background', 'transparent');
      $('.alternativa-checkbox-modelo7').css('boxShadow', 'inset 0px 0px 0px 7px transparent');
    }
  
    function alerta() {
      $('#alerta-modelo7').show();
      $('#alerta-modelo7').css('textAlign', 'center');
      $('#alerta-modelo7').css('marginLeft', '150px');
      $('#alerta-modelo7').css('width', '350px');
      $('#botaoOk-modelo7').on('click', function() {
        $('#alerta-modelo7').hide();
      })
    }
  
    function restart() {
      location.reload(false);
    }
  }
  
  function _Modelo7Espanhol() {
    let numQuestoes = document.getElementsByClassName('caixa-checkbox-modelo7').length;
    let numSecoes = document.getElementsByClassName('gridContainer1-modelo7').length;
    let questoes = document.getElementsByClassName('caixa-checkbox-modelo7');
    let cliques = [];
    let element;
  
    (function() {
      pushCliques();
      checkTodas();
      $('#btn-enviar-modelo7').on('click', function() {
        if ($('.selecionada').length < numSecoes) {
          alerta();
        } else {
          checkCertas();
        }
      })
      $('#btn-refazer-modelo7').on("click", function() {
        restart();
      })
    })();
  
    function pushCliques() {
      for (var i = 0; i < numQuestoes; i++) {
        cliques.push(0);
      }
    }
  
    function checkClick(checkNumber) {
      $(questoes[checkNumber]).on('click', function() {
        element = $(questoes[checkNumber]);
        cliqueOn(element);
        cliqueOff(element.siblings());
        takeOffGrey();
        cliques[checkNumber]++;
      })
    }
  
    function checkTodas() {
      for (var i = 0; i < numQuestoes; i++) {
        checkClick(i);
      }
    }
  
    function cliqueOn(elClicado) {
      $(elClicado).css('background', 'white');
      $(elClicado).css('boxShadow', 'inset 0px 0px 0px 7px #007bff');
      $(elClicado).addClass('selecionada');
    }
  
    function cliqueOff(elClicado) {
      $(elClicado).css('background', '#e0e0e0');
      $(elClicado).css('boxShadow', 'inset 0px 0px 0px 7px #e0e0e0');
      if ($(elClicado).hasClass('selecionada')) {
        $(elClicado).removeClass('selecionada');
      }
    }
  
    function checkCertas() {
      for (var i=0; i < questoes.length; i++) {
        if ($(questoes[i]).hasClass('certaModelo7') && $(questoes[i]).hasClass('selecionada')) {
          $(questoes[i]).css('background', 'white');
          $(questoes[i]).css('boxShadow', 'inset 0px 0px 0px 7px #9ecc63');
          $(questoes[i]).next().css('color', '#9ecc63');
          $(questoes[i]).next().html($(questoes[i]).next().html() + "<span style='font-size: 17px; color: #009e49;'><strong> ✓</strong></span>");
        } else {
          if ($(questoes[i]).hasClass('selecionada')) {
            let questaoCerta = $('.certaModelo7');
            $(questaoCerta).css('background', 'white');
            $(questaoCerta).css('boxShadow', 'inset 0px 0px 0px 7px #9ecc63');
            $(questaoCerta).next().css('color', '#9ecc63');
  
            $(questoes[i]).css('background', 'white');
            $(questoes[i]).css('boxShadow', 'inset 0px 0px 0px 7px #ed3a47');
            $(questoes[i]).next().css('color', '#ed3a47');
            $(questoes[i]).next().html($(questoes[i]).next().html() + "<strong> X</strong>");
          }
        }
      }
    }
  
    function takeOffGrey() {
      $('.alternativa-checkbox-modelo7').css('background', 'transparent');
      $('.alternativa-checkbox-modelo7').css('boxShadow', 'inset 0px 0px 0px 7px transparent');
    }
  
    function alerta() {
      $('#alerta-modelo7').show();
      $('#alerta-modelo7').css('textAlign', 'center');
      $('#alerta-modelo7').css('marginLeft', '150px');
      $('#alerta-modelo7').css('width', '350px');
      $('#botaoOk-modelo7').on('click', function() {
        $('#alerta-modelo7').hide();
      })
    }
  
    function restart() {
      location.reload(false);
    }
  }
  
  function _ImprimirButton() {
    $('#imprimir').click(function() {
      window.print()
    });
  }
  
  function _SaibaMais() {
    let cliquesSaiba = 0;
    $('#botao-saber-mais').on('click', function() {
      cliquesSaiba++
      cliquesSaiba % 2 === 0 ? $('#collapse-cx-curta-saber').hide() : $('#collapse-cx-curta-saber').show()
      $(this).text(function(i, old) {
        return old == 'Clique aqui e saiba mais!' ? 'Esconder' : 'Clique aqui e saiba mais!';
      });
    });
  }
  
  function _transcricaoAudio() {
    // para cada container de transcrição...
    $(".transcricao-audio-container").each(function(index, element) {
  
      // carrega dentro do collapse o conteúdo do txt UTF-8 linkado para download
      var transcricaoURL = $(this).find(".transcricao-audio-collapse a").attr('href')
      $(this).find(".transcricao-audio-conteudo").load(transcricaoURL);
  
      // habilita a função de collapse
      $(this).find(".transcricao-audio-botao").click(function() {
        $(this).siblings(".transcricao-audio-collapse").slideToggle('slow');
        $(this).text(function(i, old) {
          return old == 'Ver transcrição' ? 'Fechar transcrição' : 'Ver transcrição';
        });
      });
    });
  }
  
  function _transcricaoAudioTexto() {
    // para cada container de transcrição...
    $(".transcricao-audio-container-texto").each(function(index, element) {
  
      // carrega dentro do collapse o conteúdo do txt UTF-8 linkado para download
      var transcricaoURL = $(this).find(".transcricao-audio-collapse-texto a").attr('href')
      $(this).find(".transcricao-audio-conteudo-texto").load(transcricaoURL);
  
      // habilita a função de collapse
      $(this).find(".transcricao-audio-botao-texto").click(function() {
        $(this).siblings(".transcricao-audio-collapse-texto").slideToggle('slow');
        $(this).text(function(i, old) {
          return old == 'Acessar o texto' ? 'Fechar o texto' : 'Acessar o texto';
        });
      });
    });
  }
  
  function _ImprimirButton() {
    $('#imprimir').click(function() {
      window.print()
    });
  }
  
  function _SaibaMais() {
    let cliquesSaiba = 0;
    $('#botao-saber-mais').on('click', function() {
      cliquesSaiba++
      cliquesSaiba % 2 === 0 ? $('#collapse-cx-curta-saber').hide() : $('#collapse-cx-curta-saber').show()
      $(this).text(function(i, old) {
        return old == 'Clique aqui e saiba mais!' ? 'Esconder' : 'Clique aqui e saiba mais!';
      });
    });
  }
  
  const _ExecuteDiferenciados = function() {
    _Modelo1();
    _Modelo4();
    _Modelo5();
    _Modelo6();
  //   _Modelo6Espanhol()
    _Modelo7();
  //   _Modelo7Espanhol();
    _transcricaoAudio()
    _transcricaoAudioTexto();
    _ImprimirButton();
    _SaibaMais();
  }
  
  // ////////////////////////////////////////////////////////////////////////////////////////
  // ////////////////// FIM FUNÇÃO EXERCÍCIOS DIFERENCIADOS /////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////
  
  
  
  
  
  // ////////////////////////////////////////////////////////////////////////////////////////
  // //////////////////// FUNÇÃO TOGGLE ESTÁGIO //////////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////
  
  function docEstagioCanvas() {
    let docEstagio = document.getElementById('reg-estagio');
  
    if (docEstagio) {
      $('#fragmento-2').toggle(false);
      $('#fragmento-3').toggle(false);
      $('#fragmento-4').toggle(false);
      $('#fragmento-5').toggle(false);
      $('#reg-estagio').click( function() {
        $('#fragmento-1').toggle(true);
        $('#fragmento-2').toggle(false);
        $('#fragmento-3').toggle(false);
        $('#fragmento-4').toggle(false);
        $('#fragmento-5').toggle(false);
      });
      $('#plano-atividades').click( function() {
        $('#fragmento-1').toggle(false);
        $('#fragmento-2').toggle(true);
        $('#fragmento-3').toggle(false);
        $('#fragmento-4').toggle(false);
        $('#fragmento-5').toggle(false);
      });
      $('#apolice-seguro').click( function() {
        $('#fragmento-1').toggle(false);
        $('#fragmento-2').toggle(false);
        $('#fragmento-3').toggle(true);
        $('#fragmento-4').toggle(false);
        $('#fragmento-5').toggle(false);
      });
      $('#ficha-presenca').click( function() {
        $('#fragmento-1').toggle(false);
        $('#fragmento-2').toggle(false);
        $('#fragmento-3').toggle(false);
        $('#fragmento-4').toggle(true);
        $('#fragmento-5').toggle(false);
      });
      $('#modelo-relatorio').click( function() {
        $('#fragmento-1').toggle(false);
        $('#fragmento-2').toggle(false);
        $('#fragmento-3').toggle(false);
        $('#fragmento-4').toggle(false);
        $('#fragmento-5').toggle(true);
      });
    }
  };
  
  // ////////////////////////////////////////////////////////////////////////////////////////
  // //////////////////// FUNÇÃO TOGGLE ESTÁGIO //////////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////
  
  
  
  
  
  // ////////////////////////////////////////////////////////////////////////////////////////
  // ///////////// FUNÇÃO PEGA DATA ONDE O SITE ESTÁ HOSPEDADO ////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////
  
  function srvTime04Bi() {
    try {
      //FF, Opera, Safari, Chrome
      xmlHttp = new XMLHttpRequest();
    } catch (err1) {
      //IE
      try {
        xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
      } catch (err2) {
        try {
          xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
        } catch (eerr3) {
          //AJAX not supported, use CPU time.
          alert("AJAX not supported");
        }
      }
    }
    xmlHttp.open('HEAD', window.location.href.toString(), false);
    xmlHttp.setRequestHeader("Content-Type", "text/html");
    xmlHttp.send('');
    return xmlHttp.getResponseHeader("Date");
  }
  
  // ////////////////////////////////////////////////////////////////////////////////////////
  // ////////// FIM FUNÇÃO PEGA DATA ONDE O SITE ESTÁ HOSPEDADO /////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////
  
  
  
  
  
  // ////////////////////////////////////////////////////////////////////////////////////////
  // ////////////////FUNÇÃO DESBLOQUEIO DOS GABARITOS AUTOMÁTICO ///////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////
  
  function desbloqueiaGabarito() {
  
    if (document.getElementsByClassName('desbloqueio-gabarito').length > 0){
      var st = srvTime04Bi();
      var dateGabarito = new Date(st);
      var dia = dateGabarito.getDate();
      var mes = dateGabarito.getMonth() + 1;
      var ano = dateGabarito.getFullYear();
  
      // Desblqueia Gabaritos das disciplinas de antes de 2020:
  
        // Gabarito Semana 3
      if (dia >= 6 && mes >= 4 && ano >= 2020) {
        $('#libera-gabarito1').hide();
        $('#gabarito-1').show();
      }else if (dia < 6 && mes > 4 && ano >= 2020) {
        $('#libera-gabarito1').hide();
        $('#gabarito-1').show();
      } else if (dia <= 31 && mes <= 12 && ano > 2020) {
        $('#libera-gabarito1').hide();
        $('#gabarito-1').show();
      }else {
        $('#libera-gabarito1').show();
        $('#gabarito-1').remove();
      }
  
        // Gabarito Semana 4
      if (dia >= 13 && mes >= 4 && ano >= 2020) {
        $('#libera-gabarito2').hide();
        $('#gabarito-2').show();
      }else if (dia < 13 && mes > 4 && ano >= 2020) {
        $('#libera-gabarito2').hide();
        $('#gabarito-2').show();
      } else if (dia <= 31 && mes <= 12 && ano > 2020) {
        $('#libera-gabarito2').hide();
        $('#gabarito-2').show();
      }else {
        $('#libera-gabarito2').show();
        $('#gabarito-2').remove();
      }
  
        // Gabarito Semana 5
      if (dia >= 20 && mes >= 4 && ano >= 2020) {
        $('#libera-gabarito3').hide();
        $('#gabarito-3').show();
      }else if (dia < 20 && mes > 4 && ano >= 2020) {
        $('#libera-gabarito3').hide();
        $('#gabarito-3').show();
      } else if (dia <= 31 && mes <= 12 && ano > 2020) {
        $('#libera-gabarito3').hide();
        $('#gabarito-3').show();
      }else {
        $('#libera-gabarito3').show();
        $('#gabarito-3').remove();
      }
  
        // Gabarito Semana 6
      if (dia >= 27 && mes >= 4 && ano >= 2020) {
        $('#libera-gabarito4').hide();
        $('#gabarito-4').show();
      }else if (dia < 27 && mes > 4 && ano >= 2020) {
        $('#libera-gabarito4').hide();
        $('#gabarito-4').show();
      } else if (dia <= 31 && mes <= 12 && ano > 2020) {
        $('#libera-gabarito4').hide();
        $('#gabarito-4').show();
      }else {
        $('#libera-gabarito4').show();
        $('#gabarito-4').remove();
      }
  
      // Desblqueia Gabaritos das disciplinas de 2020:
  
        // Gabarito Semana 3
      if (dia >= 1 && mes >= 4 && ano >= 2020) {
        $('#libera-gabaritoCB1').hide();
        $('#gabaritoCB-1').show();
      }else if (dia < 1 && mes > 4 && ano >= 2020) {
        $('#libera-gabaritoCB1').hide();
        $('#gabaritoCB-1').show();
      } else if (dia <= 31 && mes <= 12 && ano > 2020) {
        $('#libera-gabaritoCB1').hide();
        $('#gabaritoCB-1').show();
      }else {
        $('#libera-gabaritoCB1').show();
        $('#gabaritoCB-1').remove();
      }
  
        // Gabarito Semana 4
      if (dia >= 8 && mes >= 4 && ano >= 2020) {
        $('#libera-gabaritoCB2').hide();
        $('#gabaritoCB-2').show();
      }else if (dia < 8 && mes > 4 && ano >= 2020) {
        $('#libera-gabaritoCB2').hide();
        $('#gabaritoCB-2').show();
      } else if (dia <= 31 && mes <= 12 && ano > 2020) {
        $('#libera-gabaritoCB2').hide();
        $('#gabaritoCB-2').show();
      }else {
        $('#libera-gabaritoCB2').show();
        $('#gabaritoCB-2').remove();
      }
  
        // Gabarito Semana 5
      if (dia >= 15 && mes >= 4 && ano >= 2020) {
        $('#libera-gabaritoCB3').hide();
        $('#gabaritoCB-3').show();
      }else if (dia < 15 && mes > 4 && ano >= 2020) {
        $('#libera-gabaritoCB3').hide();
        $('#gabaritoCB-3').show();
      } else if (dia <= 31 && mes <= 12 && ano > 2020) {
        $('#libera-gabaritoCB3').hide();
        $('#gabaritoCB-3').show();
      }else {
        $('#libera-gabaritoCB3').show();
        $('#gabaritoCB-3').remove();
      }
  
        // Gabarito Semana 6
      if (dia >= 22 && mes >= 4 && ano >= 2020) {
        $('#libera-gabaritoCB4').hide();
        $('#gabaritoCB-4').show();
      }else if (dia < 22 && mes > 4 && ano >= 2020) {
        $('#libera-gabaritoCB4').hide();
        $('#gabaritoCB-4').show();
      } else if (dia <= 31 && mes <= 12 && ano > 2020) {
        $('#libera-gabaritoCB4').hide();
        $('#gabaritoCB-4').show();
      }else {
        $('#libera-gabaritoCB4').show();
        $('#gabaritoCB-4').remove();
      }
  
      jaDesbloqueouGabarito = true;
  
    }
  
  };
  
  // ////////////////////////////////////////////////////////////////////////////////////////
  // ///////////// FIM FUNÇÃO DESBLOQUEIO DOS GABARITOS AUTOMÁTICO ////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////
  
  
  
  
  
  // ////////////////////////////////////////////////////////////////////////////////////////
  // ////////////// FUNÇÃO DESBLOQUEIO DAS REFERÊNCIAS AUTOMÁTICO //////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////
  
  function desbloqueiaReferencia() {
  
    if (document.getElementsByClassName('referencia-disciplina').length > 0){
      var st = srvTime04Bi();
      var dateReferencia = new Date(st);
      var diaRef = dateReferencia.getDate();
      var mesRef = dateReferencia.getMonth() + 1;
      var anoRef = dateReferencia.getFullYear();
  
      // Referencia Semana 1
      if (diaRef >= 2 && mesRef >= 3 && anoRef >= 2020) {
        $('#referencia-semana1').show();
      }else if (diaRef < 2 && mesRef > 3 && anoRef >= 2020) {
        $('#referencia-semana1').show();
      } else if (diaRef <= 31 && mesRef <= 12 && anoRef > 2020) {
        $('#referencia-semana1').show();
      }else {
        $('#referencia-semana1').remove();
      }
  
      // Referencia Semana 2
      if (diaRef >= 9 && mesRef >= 3 && anoRef >= 2020) {
        $('#referencia-semana2').show();
      }else if (diaRef < 9 && mesRef > 3 && anoRef >= 2020) {
        $('#referencia-semana2').show();
      } else if (diaRef <= 31 && mesRef <= 12 && anoRef > 2020) {
        $('#referencia-semana2').show();
      }else {
        $('#referencia-semana2').remove();
      }
  
      // Referencia Semana 3
      if (diaRef >= 16 && mesRef >= 3 && anoRef >= 2020) {
        $('#referencia-semana3').show();
      }else if (diaRef < 16 && mesRef > 3 && anoRef >= 2020) {
        $('#referencia-semana3').show();
      } else if (diaRef <= 31 && mesRef <= 12 && anoRef > 2020) {
        $('#referencia-semana3').show();
      }else {
        $('#referencia-semana3').remove();
      }
  
      // Referencia Semana 4
      if (diaRef >= 23 && mesRef >= 3 && anoRef >= 2020) {
        $('#referencia-semana4').show();
      }else if (diaRef < 23 && mesRef > 3 && anoRef >= 2020) {
        $('#referencia-semana4').show();
      } else if (diaRef <= 31 && mesRef <= 12 && anoRef > 2020) {
        $('#referencia-semana4').show();
      }else {
        $('#referencia-semana4').remove();
      }
  
      // Referencia Semana 5
      if (diaRef >= 30 && mesRef >= 3 && anoRef >= 2020) {
        $('#referencia-semana5').show();
      }else if (diaRef < 30 && mesRef > 3 && anoRef >= 2020) {
        $('#referencia-semana5').show();
      } else if (diaRef <= 31 && mesRef <= 12 && anoRef > 2020) {
        $('#referencia-semana5').show();
      }else {
        $('#referencia-semana5').remove();
      }
  
      // Referencia Semana 6
      if (diaRef >= 6 && mesRef >= 4 && anoRef >= 2020) {
        $('#referencia-semana6').show();
      }else if (diaRef < 6 && mesRef > 4 && anoRef >= 2020) {
        $('#referencia-semana6').show();
      } else if (diaRef <= 31 && mesRef <= 12 && anoRef > 2020) {
        $('#referencia-semana6').show();
      }else {
        $('#referencia-semana6').remove();
      }
  
      // Referencia Semana 7
      if (diaRef >= 13 && mesRef >= 4 && anoRef >= 2020) {
        $('#referencia-semana7').show();
      }else if (diaRef < 13 && mesRef > 4 && anoRef >= 2020) {
        $('#referencia-semana7').show();
      } else if (diaRef <= 31 && mesRef <= 12 && anoRef > 2020) {
        $('#referencia-semana7').show();
      }else {
        $('#referencia-semana7').remove();
      }
  
      // Referencia Semana 8
      if (diaRef >= 20 && mesRef >= 4 && anoRef >= 2020) {
        $('#referencia-semana8').show();
      }else if (diaRef < 20 && mesRef > 4 && anoRef >= 2020) {
        $('#referencia-semana8').show();
      } else if (diaRef <= 31 && mesRef <= 12 && anoRef > 2020) {
        $('#referencia-semana8').show();
      }else {
        $('#referencia-semana8').remove();
      }
  
      // Datas Quinzenais
  
      // Referencia Quinzena 1
      if (diaRef >= 2 && mesRef >= 3 && anoRef >= 2020) {
        $('#referencia-quinzena1').show();
      }else if (diaRef < 2 && mesRef > 3 && anoRef >= 2020) {
        $('#referencia-quinzena1').show();
      } else if (diaRef <= 31 && mesRef <= 12 && anoRef > 2020) {
        $('#referencia-quinzena1').show();
      }else {
        $('#referencia-quinzena1').remove();
      }
  
      // Referencia Quinzena 2
      if (diaRef >= 16 && mesRef >= 3 && anoRef >= 2020) {
        $('#referencia-quinzena2').show();
      }else if (diaRef < 16 && mesRef > 3 && anoRef >= 2020) {
        $('#referencia-quinzena2').show();
      } else if (diaRef <= 31 && mesRef <= 12 && anoRef > 2020) {
        $('#referencia-quinzena2').show();
      }else {
        $('#referencia-quinzena2').remove();
      }
  
      // Referencia Quinzena 3
      if (diaRef >= 30 && mesRef >= 3 && anoRef >= 2020) {
        $('#referencia-quinzena3').show();
      }else if (diaRef < 30 && mesRef > 3 && anoRef >= 2020) {
        $('#referencia-quinzena3').show();
      } else if (diaRef <= 31 && mesRef <= 12 && anoRef > 2020) {
        $('#referencia-quinzena3').show();
      }else {
        $('#referencia-quinzena3').remove();
      }
  
      // Referencia Quinzena 4
      if (diaRef >= 13 && mesRef >= 4 && anoRef >= 2020) {
        $('#referencia-quinzena4').show();
      }else if (diaRef < 13 && mesRef > 4 && anoRef >= 2020) {
        $('#referencia-quinzena4').show();
      } else if (diaRef <= 31 && mesRef <= 12 && anoRef > 2020) {
        $('#referencia-quinzena4').show();
      }else {
        $('#referencia-quinzena4').remove();
      }
  
      // Referencia Quinzena 5
      if (diaRef >= 4 && mesRef >= 5 && anoRef >= 2020) {
        $('#referencia-quinzena5').show();
      }else if (diaRef < 4 && mesRef > 5 && anoRef >= 2020) {
        $('#referencia-quinzena5').show();
      } else if (diaRef <= 31 && mesRef <= 12 && anoRef > 2020) {
        $('#referencia-quinzena5').show();
      }else {
        $('#referencia-quinzena5').remove();
      }
  
      // Referencia Quinzena 6
      if (diaRef >= 18 && mesRef >= 5 && anoRef >= 2020) {
        $('#referencia-quinzena6').show();
      }else if (diaRef < 18 && mesRef > 5 && anoRef >= 2020) {
        $('#referencia-quinzena6').show();
      } else if (diaRef <= 31 && mesRef <= 12 && anoRef > 2020) {
        $('#referencia-quinzena6').show();
      }else {
        $('#referencia-quinzena6').remove();
      }
  
      // Referencia Quinzena 7
      if (diaRef >= 1 && mesRef >= 6 && anoRef >= 2020) {
        $('#referencia-quinzena7').show();
      }else if (diaRef < 1 && mesRef > 6 && anoRef >= 2020) {
        $('#referencia-quinzena7').show();
      } else if (diaRef <= 31 && mesRef <= 12 && anoRef > 2020) {
        $('#referencia-quinzena7').show();
      }else {
        $('#referencia-quinzena7').remove();
      }
  
      // Referencia Quinzena 8
      if (diaRef >= 15 && mesRef >= 6 && anoRef >= 2020) {
        $('#referencia-quinzena8').show();
      }else if (diaRef < 15 && mesRef > 6 && anoRef >= 2020) {
        $('#referencia-quinzena8').show();
      } else if (diaRef <= 31 && mesRef <= 12 && anoRef > 2020) {
        $('#referencia-quinzena8').show();
      }else {
        $('#referencia-quinzena8').remove();
      }
      jaDesbloqueouReferencia = true;
    }
  };
  
  // ////////////////////////////////////////////////////////////////////////////////////////
  // ////////////// FIM FUNÇÃO DESBLOQUEIO DAS REFERÊNCIAS AUTOMÁTICO ///////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////
  
  
  function addCalendario(){
  
      $('a#global_nav_calendar_link').attr("href", "https://apps.univesp.br/manual-do-aluno/calendario-academico").attr('target','_blank');
  
  }
  
  
  
  
  
  
  // ///////////////////// CHAMADAS DAS FUNÇÕES ////////////////////////////////////////
  
  $(document).ready(function(){
    desbloqueiaGabarito();
    desbloqueiaReferencia();
    docEstagioCanvas();
    _ExecuteMostrarGabaritos();
    _ExecuteDiferenciados();
    escondeMostraConteudo();
    addCalendario();
    // showNextItem(slider, itemActive, itemCount);
    // showPrevItem(slider, itemActive, itemCount);
  
    //Espera 500ms para disparar o Servertime.
    setTimeout(function() {
      desbloqueioDesemana();
      desbloqueiaGabarito();
      desbloqueiaReferencia();
      if(document.getElementsByClassName('asciimath').length > 0){
        includeJS('https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/latest.js?config=AM_CHTML', function(){console.log('')});
      }
      docEstagioCanvas();
    }, 500);
  
    //Espera 1500ms para disparar o Servertime.
    setTimeout(function() {
      if(!jaDesbloqueou){
        desbloqueioDesemana();
      }
      if(!jaDesbloqueouGabarito){
        desbloqueiaGabarito();
      }
      if(!jaDesbloqueouReferencia){
        desbloqueiaReferencia();
      }
    }, 1500);
  
    //Espera 2500ms para disparar o Servertime.
    setTimeout(function() {
      if(!jaDesbloqueou){
        desbloqueioDesemana();
      }
      if(!jaDesbloqueouGabarito){
        desbloqueiaGabarito();
      }
      if(!jaDesbloqueouReferencia){
        desbloqueiaReferencia();
      }
    }, 2500);
  })