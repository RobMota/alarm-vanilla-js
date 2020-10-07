let min = document.querySelector(".min");
let seg = document.querySelector(".seg");
let tempo = document.querySelector(".tempo");
let musica = document.getElementById("musica");
let btn = document.querySelector(".btn");
tempo.innerHTML = ` 00 : 00`;

function ate60(seletor) {
  for (let i = 0; i <= 60; i++) {
    let options = document.createElement("OPTION");
    let textOptions = document.createTextNode(i);

    options.setAttribute("value", i);
    options.appendChild(textOptions);
    seletor.appendChild(options);
  }
}

let contagemAtivada = false;
let t;

function iniciarCont() {
  let segundos = +parseInt(seg.value);
  let minutos = +parseInt(min.value);
  console.log("MINUTOS: " + minutos);
  console.log("SEUNDOS: " + segundos);

  // contagemAtivada esta parada
  //entao inicia
  if (contagemAtivada == false) {
    console.log("INCIANDO CONTAGEM");
    contagemAtivada = true;
    //escrito parar
    btn.innerHTML = "Parar";

    t = setInterval(function () {
      let minStr = minutos <= 9 ? "0" + minutos : minutos;
      let segStr = segundos <= 9 ? "0" + segundos : segundos;

      console.log(`${minStr} : ${segStr}`); //mostra no console o tempo
      tempo.innerHTML = `${minStr} : ${segStr}`; //mostra no innerHTML o tempo

      if (minutos != 0 && segundos == 0) {
        console.log("Entrou na condicao 1");
        segundos = 60;
        minutos -= 1;
      }

      if (minutos == 0 && segundos == 0) {
        console.log("Tocando Alarme");
        clearInterval(t);
        btn.innerHTML = "Alarme";
        musica.play();
      }

      segundos -= 1;
    }, 1000);
  } else if (contagemAtivada == true) {
    //para a contagem
    //para o setInterval com clearInterval (parar variavel t)
    console.log("Parando a contagem");
    contagemAtivada = false;
    btn.innerHTML = "Começar";
    musica.pause();
    tempo.innerHTML = ` 00 : 00`;
    clearInterval(t);
  }
}

ate60(seg);
ate60(min);
