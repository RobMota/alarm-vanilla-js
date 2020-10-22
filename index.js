let min = document.querySelector(".min");
let seg = document.querySelector(".seg");
let hora = document.querySelector(".hora");
let tempo = document.querySelector(".tempo");
let musica = document.getElementById("musica");
let btn = document.querySelector(".btn");

tempo.innerHTML = ` 00 : 00`;

//adiciona options no seletor de acordo com a quantidade escolhida
function adicionarOptionsAoSeletor(seletor, quantidade) {
  for (let i = 0; i <= quantidade; i++) {
    let textElement = document.createTextNode(i)
    min.appendChild(textElement)
  }
}

let contagemAtivada = false;
let t;

function iniciarTimer() {
  let segundos = parseInt(seg.value);
  let minutos = parseInt(min.value);

  // contagemAtivada esta parada
  // entao inicia
  if (contagemAtivada == false) {
    console.log("INCIANDO CONTAGEM");
    
    //seta flag para indicar que contagem começou
    contagemAtivada = true;
    
    // escreve PARAR no botao
    btn.innerHTML = "Parar";

    // desabilitado controles de seleção do tempo enquanto contagem estiver rolando
    min.disabled = true;
    seg.disabled = true;

    t = setInterval(function () {
      let minStr = minutos <= 9 ? "0" + minutos : minutos;
      let segStr = segundos <= 9 ? "0" + segundos : segundos;

      console.log(`${minStr} : ${segStr}`); //mostra no console o tempo
      tempo.innerHTML = `${minStr} : ${segStr}`; //mostra no innerHTML o tempo

      //se segunndos zerou, diminuimos a valor de minuto e recarregamos os segundos
      if (minutos != 0 && segundos == 0) {
        segundos = 60;
        minutos -= 1;
      }

      //se ta tudo zerado, acabou o tempo
      if (minutos == 0 && segundos == 0) {
        console.log("Tocando som do alarme");
        clearInterval(t);
        btn.style.backgroundColor = "orange";
        btn.innerHTML = "Parar Alarme";
        musica.play();
      }

      segundos -= 1;
    }, 1000);

    startCircleDraw();

  } else if (contagemAtivada == true) {
    //parar a contagem
    //parar o setInterval com clearInterval (parar variavel t)
    console.log("Parando som do alarme");

    //habilita controles de selecao do tempo
    min.disabled = false;
    seg.disabled = false;

    //limpa flag para indicar que a contagem parou
    contagemAtivada = false;
    btn.innerHTML = "Começar";
    btn.style.backgroundColor = "#f0f0f0";
    musica.pause();
    tempo.innerHTML = ` 00 : 00`;
    clearInterval(t);
  }
}

function desenharArco(angInicial, angFinal, cor, limpar){
  angInicial = (angInicial/180) * Math.PI;  
  angFinal = (angFinal/180) * Math.PI;
  
  //console.log(angInicial);
  //console.log(angFinal);

  let circ = document.getElementById("circulo-container");
  //console.log(circ)
  let contexto = circ.getContext("2d");
  if(limpar) {
    contexto.clearRect(0, 0, circ.width, circ.height); //limpa
  }

  //desenha circulo inteiro que serve como fundo
  contexto.strokeStyle = "gray";
  contexto.lineWidth = 7;
  contexto.beginPath();
  //arc(posicaoXdoCentroDoCirculo, posicaoYdoCentroDoCirculo, raio, anguloInicial, anguloFinal)
  contexto.arc(150, 150, 140, 0, 2*Math.PI);
  contexto.stroke(); 
  
  //desenha por cima um circulo parcial com outra cor
  contexto.strokeStyle = cor;
  contexto.lineWidth = 7;
  contexto.beginPath();
  //arc(posicaoXdoCentroDoCirculo, posicaoYdoCentroDoCirculo, raio, anguloInicial, anguloFinal)
  contexto.arc(150, 150, 140, angInicial, angFinal);
  contexto.stroke(); 
}

function limparArco() {
  let circ = document.getElementById("circulo-container");
  //console.log(circ)
  let contexto = circ.getContext("2d");
  contexto.clearRect(0, 0, circ.width, circ.height); //limpa
}

adicionarOptionsAoSeletor(hora, 5);
adicionarOptionsAoSeletor(min, 5);
adicionarOptionsAoSeletor(seg, 5);


function startCircleDraw() {
  let ang = 270;
  desenharArco(0, 360, "rgb(73, 87, 214)", true)
  let interval = setInterval( () => {
    ang -= 25; //mudar depois para (ang = TotalDeSegundos / 360))
    desenharArco(270, ang, "rgb(73, 87, 214)", true)
    if(ang >= (270 + 360)){
      limparArco(); //apaga o desenho
      clearInterval(interval); //para o interval
    }
  },500)
}

